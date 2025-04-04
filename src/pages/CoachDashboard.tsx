
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Book, 
  Settings,
  ChevronRight,
  LogOut
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

interface User {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

// Mock data for the coach dashboard
const upcomingSessions = [
  { id: 1, studentName: "Alex Morgan", date: "2025-04-05", time: "15:00", type: "Individual", topic: "Endgame strategies" },
  { id: 2, studentName: "Group Class", date: "2025-04-05", time: "17:00", type: "Group", topic: "Opening principles" },
  { id: 3, studentName: "Jamie Taylor", date: "2025-04-06", time: "10:00", type: "Individual", topic: "Game analysis" },
];

const completedSessions = [
  { id: 4, studentName: "Taylor Smith", date: "2025-04-01", time: "15:00", type: "Individual", topic: "Tactical patterns" },
  { id: 5, studentName: "Group Class", date: "2025-04-02", time: "17:00", type: "Group", topic: "Checkmate patterns" },
  { id: 6, studentName: "Ryan Johnson", date: "2025-04-03", time: "09:00", type: "Individual", topic: "Opening repertoire" },
];

const messages = [
  { id: 1, from: "Alex Morgan", time: "Yesterday", preview: "Thanks for the great lesson! I've practiced the endgame..." },
  { id: 2, from: "Jamie Taylor", time: "2 days ago", preview: "I won't be able to attend the next session due to..." },
  { id: 3, from: "System Notification", time: "1 week ago", preview: "Your schedule for next month has been updated..." },
];

const students = [
  { id: 1, name: "Alex Morgan", level: "Intermediate", progress: "Improving", nextSession: "Apr 5, 15:00" },
  { id: 2, name: "Jamie Taylor", level: "Beginner", progress: "Steady", nextSession: "Apr 6, 10:00" },
  { id: 3, name: "Taylor Smith", level: "Advanced", progress: "Excellent", nextSession: "Apr 8, 16:00" },
  { id: 4, name: "Ryan Johnson", level: "Intermediate", progress: "Needs focus", nextSession: "Apr 10, 09:00" },
];

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Check if user is logged in as a coach
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      toast.error("Please login to access the dashboard");
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (!userData.isLoggedIn || userData.role !== 'coach') {
        toast.error("Access denied. Please login as a coach.");
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

  if (!user) {
    return <div className="min-h-screen bg-chess-deepNavy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-chess-blue border-t-transparent rounded-full"></div>
    </div>;
  }

  // Menu items for the sidebar
  const menuItems = [
    { icon: Calendar, label: "Sessions", active: true },
    { icon: Users, label: "Students" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Book, label: "Demo" },
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
              <h1 className="text-xl font-semibold">Coach Dashboard</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Upcoming Sessions</CardTitle>
                  <CardDescription>You have {upcomingSessions.length} upcoming sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{upcomingSessions.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Active Students</CardTitle>
                  <CardDescription>Students you're currently coaching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{students.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Unread Messages</CardTitle>
                  <CardDescription>Messages requiring your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{messages.length}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-chess-navy border-chess-blue/20">
                  <CardHeader>
                    <CardTitle className="text-white">Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="bg-chess-deepNavy grid w-full grid-cols-2">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upcoming" className="mt-4">
                        <div className="space-y-4">
                          {upcomingSessions.map(session => (
                            <div key={session.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-white">{session.studentName}</h3>
                                  <p className="text-sm text-gray-400">{session.topic}</p>
                                  <div className="mt-2 text-xs text-gray-400">
                                    {session.type} • {new Date(session.date).toLocaleDateString()} • {session.time}
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                  <ChevronRight className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="completed" className="mt-4">
                        <div className="space-y-4">
                          {completedSessions.map(session => (
                            <div key={session.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-white">{session.studentName}</h3>
                                  <p className="text-sm text-gray-400">{session.topic}</p>
                                  <div className="mt-2 text-xs text-gray-400">
                                    {session.type} • {new Date(session.date).toLocaleDateString()} • {session.time}
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                  <ChevronRight className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-chess-navy border-chess-blue/20">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Messages</CardTitle>
                    <CardDescription>Latest communications from students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div key={message.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{message.from}</h3>
                              <p className="text-sm text-gray-400 line-clamp-2">{message.preview}</p>
                              <div className="mt-2 text-xs text-gray-400">{message.time}</div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CoachDashboard;
