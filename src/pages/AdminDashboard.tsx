
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
  Search
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCoaches = coaches.filter(coach => 
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coach.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cls.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div className="min-h-screen bg-chess-deepNavy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-chess-blue border-t-transparent rounded-full"></div>
    </div>;
  }

  // Menu items for the sidebar
  const menuItems = [
    { icon: Users, label: "User Management", active: true },
    { icon: BookOpen, label: "Class Management" },
    { icon: BarChart4, label: "Reports" },
    { icon: Settings, label: "Settings" },
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
                  <SidebarMenuButton isActive={item.active}>
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
                  <div className="text-3xl font-bold text-chess-blue">{students.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Total Coaches</CardTitle>
                  <CardDescription>Active teaching staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{coaches.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Classes</CardTitle>
                  <CardDescription>Active and pending classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{classes.length}</div>
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

            <Card className="bg-chess-navy border-chess-blue/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Management Console</CardTitle>
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
                    <Button className="bg-chess-blue hover:bg-chess-blue/90">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-chess-deepNavy grid w-full md:w-auto md:inline-flex grid-cols-3">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="coaches">Coaches</TabsTrigger>
                    <TabsTrigger value="classes">Classes</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="students" className="mt-0">
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
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="coaches" className="mt-0">
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
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="classes" className="mt-0">
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
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
