
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Settings,
  ChevronRight,
  LogOut,
  BarChart
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
import { Progress } from "@/components/ui/progress";

interface User {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

// Mock data for the student dashboard
const upcomingClasses = [
  { id: 1, coach: "David Smith", date: "2025-04-05", time: "15:00", type: "Individual", topic: "Endgame strategies" },
  { id: 2, coach: "Lisa Johnson", date: "2025-04-07", time: "17:00", type: "Group", topic: "Opening principles" },
];

const completedClasses = [
  { id: 3, coach: "David Smith", date: "2025-04-01", time: "15:00", type: "Individual", topic: "Tactical patterns" },
  { id: 4, coach: "Lisa Johnson", date: "2025-04-02", time: "17:00", type: "Group", topic: "Checkmate patterns" },
];

const assignments = [
  { id: 1, title: "Knight endgames practice", deadline: "2025-04-08", completed: false },
  { id: 2, title: "Analyze your last tournament game", deadline: "2025-04-10", completed: false },
  { id: 3, title: "Queen vs. Rook endgame puzzles", deadline: "2025-04-12", completed: false },
];

const progressData = [
  { category: "Openings", score: 65 },
  { category: "Tactics", score: 72 },
  { category: "Endgames", score: 58 },
  { category: "Strategy", score: 47 },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Check if user is logged in as a student
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      toast.error("Please login to access the dashboard");
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (!userData.isLoggedIn || userData.role !== 'student') {
        toast.error("Access denied. Please login as a student.");
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
    { icon: Calendar, label: "Classes", active: true },
    { icon: BookOpen, label: "Assignments" },
    { icon: BarChart, label: "Progress" },
    { icon: MessageSquare, label: "Messages" },
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
              <h1 className="text-xl font-semibold">Student Dashboard</h1>
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
                  <CardTitle className="text-lg text-white">Next Class</CardTitle>
                  <CardDescription>Your upcoming session</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingClasses.length > 0 ? (
                    <div>
                      <div className="text-lg font-medium text-white">{upcomingClasses[0].topic}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(upcomingClasses[0].date).toLocaleDateString()} • {upcomingClasses[0].time}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">with {upcomingClasses[0].coach}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400">No upcoming classes</div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Pending Assignments</CardTitle>
                  <CardDescription>Tasks to complete</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">{assignments.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Overall Progress</CardTitle>
                  <CardDescription>Your chess development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-chess-blue">60%</div>
                    <Progress value={60} className="h-2 flex-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-chess-navy border-chess-blue/20">
                  <CardHeader>
                    <CardTitle className="text-white">Classes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="bg-chess-deepNavy grid w-full grid-cols-2">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upcoming" className="mt-4">
                        <div className="space-y-4">
                          {upcomingClasses.map(session => (
                            <div key={session.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-white">{session.topic}</h3>
                                  <p className="text-sm text-gray-400">Coach: {session.coach}</p>
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
                          {completedClasses.map(session => (
                            <div key={session.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-white">{session.topic}</h3>
                                  <p className="text-sm text-gray-400">Coach: {session.coach}</p>
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
                    <CardTitle className="text-white">Assignments</CardTitle>
                    <CardDescription>Tasks from your coaches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map(assignment => (
                        <div key={assignment.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{assignment.title}</h3>
                              <div className="mt-2 text-xs text-gray-400">
                                Due: {new Date(assignment.deadline).toLocaleDateString()}
                              </div>
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

                <Card className="bg-chess-navy border-chess-blue/20 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">Skill Progress</CardTitle>
                    <CardDescription>Your chess abilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progressData.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{item.category}</span>
                            <span className="text-gray-400">{item.score}%</span>
                          </div>
                          <Progress value={item.score} className="h-2" />
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

export default StudentDashboard;
