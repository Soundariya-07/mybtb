import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, UserPlus, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { toast } from "sonner";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface User {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState("users");

  // User state
  const [users, setUsers] = useState([
    { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "student", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jamie Taylor", email: "jamie@example.com", role: "student", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Chris Johnson", email: "chris@example.com", role: "student", status: "Inactive", joinDate: "2024-03-10" },
    { id: 4, name: "David Smith", email: "david@example.com", role: "coach", status: "Active", joinDate: "2023-11-01" },
    { id: 5, name: "Lisa Johnson", email: "lisa@example.com", role: "coach", status: "Active", joinDate: "2023-12-05" },
    { id: 6, name: "Admin User", email: "admin@example.com", role: "admin", status: "Active", joinDate: "2023-10-01" },
  ]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    status: 'Active'
  });
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  // Class state
  interface Class {
    id: number;
    name: string;
    coach: string;
    students: number;
    schedule: string;
    status: string;
    batch: string;
    enrolledStudents: {
      id: number;
      name: string;
      email: string;
      role: string;
      status: string;
      joinDate: string;
    }[];
  }
  const [classes, setClasses] = useState<Class[]>([
    { id: 1, name: "Chess Fundamentals", coach: "David Smith", students: 25, schedule: "Mon/Wed 6:00 PM", status: "Active", batch: "Batch A", enrolledStudents: [] },
    { id: 2, name: "Advanced Tactics", coach: "Lisa Johnson", students: 15, schedule: "Tue/Thu 7:00 PM", status: "Active", batch: "Batch B", enrolledStudents: [] },
    { id: 3, name: "Endgame Strategies", coach: "David Smith", students: 18, schedule: "Fri 5:00 PM", status: "Inactive", batch: "Batch C", enrolledStudents: [] },
  ]);
  const [newClassData, setNewClassData] = useState({
    name: '',
    coach: '',
    schedule: '',
    batch: ''
  });
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  const [selectedStudentsForClass, setSelectedStudentsForClass] = useState([]);

  useEffect(() => {
    // Check if user is logged in as an admin
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      toast.error("Please login to access the dashboard");
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (!userData.isLoggedIn || userData.role !== 'admin') {
        toast.error("Access denied. Please login as an admin.");
        navigate('/login');
        return;
      }
      setUser(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/');
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  // User handlers
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const newUserWithId = { ...newUser, id: users.length + 1, joinDate: new Date().toLocaleDateString() };
      setUsers([...users, newUserWithId]);
      setNewUser({ name: '', email: '', role: 'student', status: 'Active' });
      setShowAddUserDialog(false);
      toast.success("User added successfully!");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  // Class handlers
  const handleAddClass = () => {
    if (newClassData.name && newClassData.coach && newClassData.batch) {
      const newClass = {
        id: classes.length + 1,
        name: newClassData.name,
        coach: newClassData.coach,
        students: selectedStudentsForClass.length,
        schedule: newClassData.schedule || "Not scheduled",
        status: "Active",
        batch: newClassData.batch,
        enrolledStudents: selectedStudentsForClass
      };
      
      setClasses([...classes, newClass]);
      setNewClassData({
        name: '',
        coach: '',
        schedule: '',
        batch: ''
      });
      setShowAddClassDialog(false);
      setSelectedStudentsForClass([]);
      toast.success("Class added successfully!");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Users</h2>
              <Button onClick={() => setShowAddUserDialog(true)} className="bg-chess-blue hover:bg-chess-blue/90 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>

            <Table className="bg-chess-navy border-chess-blue/20">
              <TableCaption>A list of all registered users.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
              <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="User's name"
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="User's email"
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger className="bg-chess-deepNavy border-chess-blue/20">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-chess-deepNavy border-chess-blue/20 text-white">
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="coach">Coach</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                        <SelectTrigger className="bg-chess-deepNavy border-chess-blue/20">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent className="bg-chess-deepNavy border-chess-blue/20 text-white">
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddUserDialog(false)} className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10">
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser} className="bg-chess-blue hover:bg-chess-blue/90">
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      case "classes":
        return (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Classes</h2>
              <Button onClick={() => setShowAddClassDialog(true)} className="bg-chess-blue hover:bg-chess-blue/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
            </div>

            <Table className="bg-chess-navy border-chess-blue/20">
              <TableCaption>A list of all available classes.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Coach</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.coach}</TableCell>
                    <TableCell>{cls.students}</TableCell>
                    <TableCell>{cls.schedule}</TableCell>
                    <TableCell>{cls.status}</TableCell>
                    <TableCell>{cls.batch}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog open={showAddClassDialog} onOpenChange={setShowAddClassDialog}>
              <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>Create a new class and assign students.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newClassData.name}
                        onChange={(e) => setNewClassData({ ...newClassData, name: e.target.value })}
                        placeholder="Class name"
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coach">Coach</Label>
                      <Input
                        id="coach"
                        value={newClassData.coach}
                        onChange={(e) => setNewClassData({ ...newClassData, coach: e.target.value })}
                        placeholder="Coach's name"
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        value={newClassData.schedule}
                        onChange={(e) => setNewClassData({ ...newClassData, schedule: e.target.value })}
                        placeholder="e.g., Mon/Wed 6:00 PM"
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch</Label>
                      <Input
                        id="batch"
                        value={newClassData.batch}
                        onChange={(e) => setNewClassData({ ...newClassData, batch: e.target.value })}
                        placeholder="Batch name"
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Enroll Students</Label>
                      <div className="flex flex-wrap gap-2">
                        {users
                          .filter((user) => user.role === 'student')
                          .map((student) => (
                            <Button
                              key={student.id}
                              variant={selectedStudentsForClass.find((s) => s.id === student.id) ? 'default' : 'outline'}
                              onClick={() => {
                                if (selectedStudentsForClass.find((s) => s.id === student.id)) {
                                  setSelectedStudentsForClass(selectedStudentsForClass.filter((s) => s.id !== student.id));
                                } else {
                                  setSelectedStudentsForClass([...selectedStudentsForClass, student]);
                                }
                              }}
                            >
                              {student.name}
                            </Button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddClassDialog(false)} className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10">
                    Cancel
                  </Button>
                  <Button onClick={handleAddClass} className="bg-chess-blue hover:bg-chess-blue/90">
                    Add Class
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      default:
        return null;
    }
  };

  // Menu items for the sidebar
  const menuItems = [
    { icon: Users, label: "Manage Users", section: "users" },
    { icon: Calendar, label: "Manage Classes", section: "classes" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-chess-deepNavy text-white">
        <Sidebar className="bg-chess-navy border-r border-chess-blue/20">
          <SidebarHeader className="py-4 px-6 border-b border-chess-blue/20">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                <span className="text-chess-blue">Beyond</span>TheBoard
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={activeSection === item.section}
                    onClick={() => handleNavigate(item.section)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white" onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out w-5 h-5 mr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-chess-navy h-16 shadow-md flex items-center px-4 sm:px-6 border-b border-chess-blue/20">
            <SidebarTrigger />
            <div className="flex-1 flex justify-between items-center">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Welcome,</span>
                <span className="font-medium">{user?.name}</span>
                <Button variant="outline" size="sm" className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
