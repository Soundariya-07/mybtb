
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  BarChart4, 
  Settings,
  LogOut,
  UserPlus,
  UserCog,
  Search,
  Calendar,
  Clock,
  SquarePen
} from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface User {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

// Mock data for the admin dashboard
const students = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "student", status: "Active", joinDate: "2025-01-15" },
  { id: 2, name: "Jamie Taylor", email: "jamie@example.com", role: "student", status: "Active", joinDate: "2025-02-03" },
  { id: 3, name: "Taylor Smith", email: "taylor@example.com", role: "student", status: "Inactive", joinDate: "2025-02-20" },
  { id: 4, name: "Ryan Johnson", email: "ryan@example.com", role: "student", status: "Active", joinDate: "2025-03-10" },
];

const coaches = [
  { id: 1, name: "David Smith", email: "david@example.com", role: "coach", status: "Active", joinDate: "2024-11-05", specialization: "Openings" },
  { id: 2, name: "Lisa Johnson", email: "lisa@example.com", role: "coach", status: "Active", joinDate: "2024-12-12", specialization: "Endgames" },
];

const classes = [
  { id: 1, name: "Beginner Group Class", coach: "David Smith", students: 5, schedule: "Mon, Wed 5:00 PM", status: "Active" },
  { id: 2, name: "Advanced Tactics", coach: "Lisa Johnson", students: 3, schedule: "Tue, Thu 6:00 PM", status: "Active" },
  { id: 3, name: "Endgame Mastery", coach: "David Smith", students: 4, schedule: "Fri 5:00 PM", status: "Pending" },
];

const revenueData = [
  { month: "January", amount: 3450 },
  { month: "February", amount: 4200 },
  { month: "March", amount: 3800 },
  { month: "April", amount: 4500 },
];

const demoRequests = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", date: "2025-04-10", time: "14:00", status: "Pending", coach: null },
  { id: 2, name: "Mark Davis", email: "mark@example.com", date: "2025-04-12", time: "15:30", status: "Assigned", coach: "David Smith" },
  { id: 3, name: "Emma Wilson", email: "emma@example.com", date: "2025-04-15", time: "17:00", status: "Pending", coach: null },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("students");
  const [activeSection, setActiveSection] = useState("users");
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'student',
    status: 'Active'
  });
  const [localStudents, setLocalStudents] = useState(students);
  const [localCoaches, setLocalCoaches] = useState(coaches);
  const [localClasses, setLocalClasses] = useState(classes);
  const [localDemoRequests, setLocalDemoRequests] = useState(demoRequests);
  const [showClassDialog, setShowClassDialog] = useState(false);
  const [newClassData, setNewClassData] = useState({
    name: '',
    coach: '',
    schedule: '',
    status: 'Pending'
  });
  const [showAssignCoachDialog, setShowAssignCoachDialog] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<any>(null);

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
        toast.error("Access denied. Please login as an administrator.");
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

  const filteredStudents = localStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCoaches = localCoaches.filter(coach => 
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coach.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClasses = localClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cls.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleAddUser = () => {
    if (!newUserData.name || !newUserData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000), 
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      status: newUserData.status,
      joinDate: new Date().toISOString().split('T')[0],
      specialization: newUserData.role === 'coach' ? "General" : undefined
    };

    if (newUserData.role === 'student') {
      setLocalStudents([...localStudents, newUser]);
    } else if (newUserData.role === 'coach') {
      setLocalCoaches([...localCoaches, newUser]);
    }

    toast.success(`${newUserData.role === 'student' ? 'Student' : 'Coach'} added successfully`);
    setShowAddUserDialog(false);
    
    // Reset form
    setNewUserData({
      name: '',
      email: '',
      role: 'student',
      status: 'Active'
    });
  };

  const handleAddClass = () => {
    if (!newClassData.name || !newClassData.coach || !newClassData.schedule) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newClass = {
      id: Math.floor(Math.random() * 1000),
      name: newClassData.name,
      coach: newClassData.coach,
      students: 0,
      schedule: newClassData.schedule,
      status: newClassData.status
    };

    setLocalClasses([...localClasses, newClass]);
    toast.success("Class added successfully");
    setShowClassDialog(false);

    // Reset form
    setNewClassData({
      name: '',
      coach: '',
      schedule: '',
      status: 'Pending'
    });
  };

  const handleAssignCoach = () => {
    if (!selectedDemo || !selectedDemo.coachId) {
      toast.error("Please select a coach");
      return;
    }

    const updatedDemos = localDemoRequests.map(demo => 
      demo.id === selectedDemo.id 
        ? { 
            ...demo, 
            status: 'Assigned', 
            coach: localCoaches.find(c => c.id === parseInt(selectedDemo.coachId))?.name || 'Unknown'
          }
        : demo
    );

    setLocalDemoRequests(updatedDemos);
    toast.success("Coach assigned successfully");
    setShowAssignCoachDialog(false);
    setSelectedDemo(null);
  };

  const openAssignCoachDialog = (demo: any) => {
    setSelectedDemo(demo);
    setShowAssignCoachDialog(true);
  };

  const handleManageUser = (userId: number, role: string) => {
    toast.success(`Managing ${role} with ID ${userId}`);
  };

  if (!user) {
    return <div className="min-h-screen bg-chess-deepNavy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-chess-blue border-t-transparent rounded-full"></div>
    </div>;
  }

  // Menu items for the sidebar
  const menuItems = [
    { icon: Users, label: "User Management", section: "users", active: activeSection === "users" },
    { icon: BookOpen, label: "Class Management", section: "classes", active: activeSection === "classes" },
    { icon: Calendar, label: "Demo Bookings", section: "demos", active: activeSection === "demos" },
    { icon: BarChart4, label: "Reports", section: "reports", active: activeSection === "reports" },
    { icon: Settings, label: "Settings", section: "settings", active: activeSection === "settings" },
  ];

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">User Management</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-64 pl-8 bg-chess-deepNavy border-chess-blue/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-chess-blue hover:bg-chess-blue/90">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Fill in the details to add a new user to the platform.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={newUserData.name}
                            onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                            className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                            className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select 
                            value={newUserData.role}
                            onValueChange={(value) => setNewUserData({...newUserData, role: value})}
                          >
                            <SelectTrigger className="col-span-3 bg-chess-deepNavy border-chess-blue/20">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="bg-chess-navy border-chess-blue/20">
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="coach">Coach</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <Select 
                            value={newUserData.status}
                            onValueChange={(value) => setNewUserData({...newUserData, status: value})}
                          >
                            <SelectTrigger className="col-span-3 bg-chess-deepNavy border-chess-blue/20">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-chess-navy border-chess-blue/20">
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-chess-deepNavy grid w-full md:w-auto md:inline-flex grid-cols-3">
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="coaches">Coaches</TabsTrigger>
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="students" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-chess-deepNavy/60">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => (
                        <TableRow key={student.id} className="hover:bg-chess-deepNavy/60">
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              student.status === 'Active' 
                                ? 'bg-green-900/20 text-green-400' 
                                : 'bg-amber-900/20 text-amber-400'
                            }`}>
                              {student.status}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(student.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleManageUser(student.id, 'student')}
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="coaches" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-chess-deepNavy/60">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCoaches.map(coach => (
                        <TableRow key={coach.id} className="hover:bg-chess-deepNavy/60">
                          <TableCell className="font-medium">{coach.name}</TableCell>
                          <TableCell>{coach.email}</TableCell>
                          <TableCell>{coach.specialization}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900/20 text-green-400">
                              {coach.status}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(coach.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleManageUser(coach.id, 'coach')}
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="classes" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-chess-deepNavy/60">
                        <TableHead>Class Name</TableHead>
                        <TableHead>Coach</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClasses.map(cls => (
                        <TableRow key={cls.id} className="hover:bg-chess-deepNavy/60">
                          <TableCell className="font-medium">{cls.name}</TableCell>
                          <TableCell>{cls.coach}</TableCell>
                          <TableCell>{cls.students}</TableCell>
                          <TableCell>{cls.schedule}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              cls.status === 'Active' 
                                ? 'bg-green-900/20 text-green-400' 
                                : 'bg-amber-900/20 text-amber-400'
                            }`}>
                              {cls.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => toast.success(`Managing class "${cls.name}"`)}
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      
      case "classes":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Class Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Dialog open={showClassDialog} onOpenChange={setShowClassDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-chess-blue hover:bg-chess-blue/90">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Add Class
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Create New Class</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Fill in the details to create a new chess class.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="className" className="text-right">
                            Class Name
                          </Label>
                          <Input
                            id="className"
                            value={newClassData.name}
                            onChange={(e) => setNewClassData({...newClassData, name: e.target.value})}
                            className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="coach" className="text-right">
                            Coach
                          </Label>
                          <Select 
                            value={newClassData.coach}
                            onValueChange={(value) => setNewClassData({...newClassData, coach: value})}
                          >
                            <SelectTrigger className="col-span-3 bg-chess-deepNavy border-chess-blue/20">
                              <SelectValue placeholder="Select coach" />
                            </SelectTrigger>
                            <SelectContent className="bg-chess-navy border-chess-blue/20">
                              {localCoaches.map(coach => (
                                <SelectItem key={coach.id} value={coach.name}>{coach.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="schedule" className="text-right">
                            Schedule
                          </Label>
                          <Input
                            id="schedule"
                            placeholder="e.g., Mon, Wed 5:00 PM"
                            value={newClassData.schedule}
                            onChange={(e) => setNewClassData({...newClassData, schedule: e.target.value})}
                            className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <Select 
                            value={newClassData.status}
                            onValueChange={(value) => setNewClassData({...newClassData, status: value})}
                          >
                            <SelectTrigger className="col-span-3 bg-chess-deepNavy border-chess-blue/20">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-chess-navy border-chess-blue/20">
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowClassDialog(false)} className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10">
                          Cancel
                        </Button>
                        <Button onClick={handleAddClass} className="bg-chess-blue hover:bg-chess-blue/90">
                          Create Class
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {localClasses.map(cls => (
                  <Card key={cls.id} className="bg-chess-deepNavy border-chess-blue/20">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">{cls.name}</CardTitle>
                      <CardDescription>Coach: {cls.coach}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Schedule</p>
                          <p className="text-white">{cls.schedule}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Students Enrolled</p>
                          <p className="text-white">{cls.students}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            cls.status === 'Active' 
                              ? 'bg-green-900/20 text-green-400' 
                              : 'bg-amber-900/20 text-amber-400'
                          }`}>
                            {cls.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                        onClick={() => toast.success(`Viewing students in ${cls.name}`)}
                      >
                        View Students
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-chess-blue hover:bg-chess-blue/90"
                        onClick={() => toast.success(`Managing class ${cls.name}`)}
                      >
                        Manage Class
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "demos":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Demo Booking Requests</CardTitle>
              <CardDescription>Assign coaches to demo sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {localDemoRequests.map(demo => (
                  <Card key={demo.id} className="bg-chess-deepNavy border-chess-blue/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg">{demo.name}</CardTitle>
                          <CardDescription>{demo.email}</CardDescription>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          demo.status === 'Assigned' 
                            ? 'bg-green-900/20 text-green-400' 
                            : 'bg-amber-900/20 text-amber-400'
                        }`}>
                          {demo.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="text-white">{new Date(demo.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Time</p>
                          <p className="text-white">{demo.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Assigned Coach</p>
                          <p className="text-white">{demo.coach || 'Not assigned'}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      {demo.status === 'Pending' && (
                        <Button 
                          className="bg-chess-blue hover:bg-chess-blue/90"
                          onClick={() => openAssignCoachDialog(demo)}
                        >
                          Assign Coach
                        </Button>
                      )}
                      {demo.status === 'Assigned' && (
                        <Button 
                          variant="outline" 
                          className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                          onClick={() => toast.success(`Viewing details for ${demo.name}'s demo`)}
                        >
                          View Details
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}

                <Dialog open={showAssignCoachDialog} onOpenChange={setShowAssignCoachDialog}>
                  <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Assign Coach to Demo</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Select a coach to conduct this demo session.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      {selectedDemo && (
                        <div className="mb-4 p-3 bg-chess-deepNavy rounded-lg">
                          <p><strong>Student:</strong> {selectedDemo.name}</p>
                          <p><strong>Date:</strong> {new Date(selectedDemo.date).toLocaleDateString()}</p>
                          <p><strong>Time:</strong> {selectedDemo.time}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="coach">Select Coach</Label>
                        <Select 
                          onValueChange={(value) => setSelectedDemo({...selectedDemo, coachId: value})}
                        >
                          <SelectTrigger className="bg-chess-deepNavy border-chess-blue/20">
                            <SelectValue placeholder="Choose a coach" />
                          </SelectTrigger>
                          <SelectContent className="bg-chess-navy border-chess-blue/20">
                            {localCoaches.map(coach => (
                              <SelectItem key={coach.id} value={coach.id.toString()}>{coach.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAssignCoachDialog(false)} className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10">
                        Cancel
                      </Button>
                      <Button onClick={handleAssignCoach} className="bg-chess-blue hover:bg-chess-blue/90">
                        Assign Coach
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        );

      case "reports":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Analytics & Reports</CardTitle>
              <CardDescription>View insights about your chess school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Monthly Revenue</h3>
                <div className="grid grid-cols-4 gap-4">
                  {revenueData.map(month => (
                    <Card key={month.month} className="bg-chess-deepNavy border-chess-blue/20">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-400">{month.month}</p>
                        <p className="text-2xl font-bold text-chess-blue">${month.amount}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">User Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-chess-deepNavy border-chess-blue/20">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold text-chess-blue">{localStudents.length}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-chess-deepNavy border-chess-blue/20">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-400">Total Coaches</p>
                      <p className="text-2xl font-bold text-chess-blue">{localCoaches.length}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-chess-deepNavy border-chess-blue/20">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-400">Active Classes</p>
                      <p className="text-2xl font-bold text-chess-blue">{localClasses.filter(c => c.status === 'Active').length}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Monthly Report</h3>
                <Button className="bg-chess-blue hover:bg-chess-blue/90" onClick={() => toast.success("Generating monthly report")}>
                  <SquarePen className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "settings":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">System Settings</CardTitle>
              <CardDescription>Manage application preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Account Information</h3>
                  <p className="text-gray-400 mb-4">Update your administrator account details</p>
                  <Button className="bg-chess-blue hover:bg-chess-blue/90" onClick={() => toast.success("Account settings dialog would open here")}>Edit Profile</Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Security Settings</h3>
                  <p className="text-gray-400 mb-4">Manage password and security preferences</p>
                  <Button className="bg-chess-blue hover:bg-chess-blue/90" onClick={() => toast.success("Security settings dialog would open here")}>Security Settings</Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Notification Preferences</h3>
                  <p className="text-gray-400 mb-4">Control how you receive alerts and notifications</p>
                  <Button className="bg-chess-blue hover:bg-chess-blue/90" onClick={() => toast.success("Notification settings dialog would open here")}>Notification Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

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
                    isActive={item.active}
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
              <LogOut className="w-5 h-5 mr-2" />
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
                <span className="font-medium">{user.name}</span>
                <Button variant="outline" size="sm" className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Total Students</CardTitle>
                  <CardDescription>Active and inactive students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{localStudents.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Total Coaches</CardTitle>
                  <CardDescription>Active teaching staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{localCoaches.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Classes</CardTitle>
                  <CardDescription>Active and pending classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{localClasses.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Monthly Revenue</CardTitle>
                  <CardDescription>Current month earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">${revenueData[3].amount}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
