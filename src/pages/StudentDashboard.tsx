
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Settings,
  ChevronRight,
  LogOut,
  BarChart,
  CheckCircle,
  XCircle,
  Send
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
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  { id: 1, title: "Knight endgames practice", deadline: "2025-04-08", completed: false, description: "Complete the provided exercises on Knight endgames from the textbook pages 45-50. Submit your solutions with annotations explaining your thought process." },
  { id: 2, title: "Analyze your last tournament game", deadline: "2025-04-10", completed: false, description: "Analyze your most recent tournament game using the principles we've discussed in class. Focus particularly on the opening choices, middlegame plans, and any critical moments where the evaluation significantly changed." },
  { id: 3, title: "Queen vs. Rook endgame puzzles", deadline: "2025-04-12", completed: false, description: "Solve the attached set of Queen vs. Rook endgame puzzles. For each one, explain the key ideas and optimal strategies for both sides." },
];

const progressData = [
  { category: "Openings", score: 65 },
  { category: "Tactics", score: 72 },
  { category: "Endgames", score: 58 },
  { category: "Strategy", score: 47 },
];

// Example chess position data for visualization
const chessPositions = {
  knightEndgame: `
    <div class="chess-position p-4 bg-gray-800 rounded-lg">
      <div class="grid grid-cols-8 gap-0">
        ${Array(64).fill(0).map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isBlack = (row + col) % 2 === 1;
          const bgColor = isBlack ? 'bg-gray-700' : 'bg-gray-500';
          
          // Add some chess pieces for visualization
          let piece = '';
          if (i === 36) piece = '♔'; // White king at e4
          if (i === 10) piece = '♚'; // Black king at c7
          if (i === 26) piece = '♘'; // White knight at c5
          
          return `<div class="${bgColor} w-8 h-8 flex items-center justify-center text-2xl">${piece}</div>`;
        }).join('')}
      </div>
      <div class="mt-2 text-xs grid grid-cols-8">
        ${['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => 
          `<div class="text-center">${letter}</div>`
        ).join('')}
      </div>
    </div>
  `
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [activeSection, setActiveSection] = useState("classes");
  const [showClassDetailDialog, setShowClassDetailDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [newMessageData, setNewMessageData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  const [localAssignments, setLocalAssignments] = useState(assignments);

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

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleViewClass = (classItem: any) => {
    setSelectedClass(classItem);
    setShowClassDetailDialog(true);
  };

  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowAssignmentDialog(true);
  };

  const handleStartConversation = () => {
    setShowMessageDialog(true);
  };

  const handleSendMessage = () => {
    if (!newMessageData.recipient || !newMessageData.subject || !newMessageData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success(`Message sent to ${newMessageData.recipient}`);
    setShowMessageDialog(false);
    
    // Reset form
    setNewMessageData({
      recipient: '',
      subject: '',
      message: ''
    });
  };

  const handleSubmitAssignment = () => {
    // Update the local assignments state to mark this assignment as completed
    const updatedAssignments = localAssignments.map(a => 
      a.id === selectedAssignment.id ? {...a, completed: true} : a
    );
    
    setLocalAssignments(updatedAssignments);
    toast.success("Assignment submitted successfully");
    setShowAssignmentDialog(false);
  };

  if (!user) {
    return <div className="min-h-screen bg-chess-deepNavy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-chess-blue border-t-transparent rounded-full"></div>
    </div>;
  }

  // Menu items for the sidebar
  const menuItems = [
    { icon: Calendar, label: "Classes", section: "classes", active: activeSection === "classes" },
    { icon: BookOpen, label: "Assignments", section: "assignments", active: activeSection === "assignments" },
    { icon: BarChart, label: "Progress", section: "progress", active: activeSection === "progress" },
    { icon: MessageSquare, label: "Messages", section: "messages", active: activeSection === "messages" },
    { icon: Settings, label: "Settings", section: "settings", active: activeSection === "settings" },
  ];

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "classes":
        return (
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleViewClass(session)}
                          >
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleViewClass(session)}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <Dialog open={showClassDetailDialog} onOpenChange={setShowClassDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Class Details</DialogTitle>
                  </DialogHeader>
                  {selectedClass && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedClass.topic}</h3>
                          <p className="text-sm text-gray-400">with {selectedClass.coach}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Date</p>
                            <p className="text-white">{new Date(selectedClass.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Time</p>
                            <p className="text-white">{selectedClass.time}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Session Type</p>
                            <p className="text-white">{selectedClass.type}</p>
                          </div>
                        </div>
                        
                        {/* Sample chess position or material for this class */}
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Class Focus</p>
                          <div className="bg-chess-deepNavy border border-chess-blue/20 rounded-md p-3">
                            {selectedClass.id === 1 ? (
                              <>
                                <p className="text-white mb-4">In this session, we'll explore key endgame strategies focusing on Knight endgames. We'll analyze positions like this one:</p>
                                <div dangerouslySetInnerHTML={{ __html: chessPositions.knightEndgame }} />
                              </>
                            ) : selectedClass.id === 2 ? (
                              <p className="text-white">This group class will cover fundamental opening principles, focusing on central control, piece development, and king safety. We'll examine both classical and modern approaches to these concepts.</p>
                            ) : (
                              <p className="text-white">We'll review your recent games and focus on tactical opportunities you may have missed. Bring your scoresheet or digital record of your games.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowMessageDialog(true);
                        setNewMessageData(prev => ({
                          ...prev, 
                          recipient: selectedClass.coach,
                          subject: `Question about ${selectedClass.topic} class`
                        }));
                        setShowClassDetailDialog(false);
                      }}
                      className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                    >
                      Message Coach
                    </Button>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => setShowClassDetailDialog(false)}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      case "assignments":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Assignments</CardTitle>
              <CardDescription>Tasks from your coaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {localAssignments.map(assignment => (
                  <div key={assignment.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-white">{assignment.title}</h3>
                          {assignment.completed && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-green-900/20 px-2 py-1 text-xs text-green-400">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Submitted
                            </span>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          Due: {new Date(assignment.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleViewAssignment(assignment)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Dialog open={showAssignmentDialog} onOpenChange={setShowAssignmentDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Assignment Details</DialogTitle>
                  </DialogHeader>
                  {selectedAssignment && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-white">{selectedAssignment.title}</h3>
                          {selectedAssignment.completed && (
                            <span className="inline-flex items-center rounded-full bg-green-900/20 px-2 py-1 text-xs text-green-400">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Submitted
                            </span>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Due Date</p>
                          <p className="text-white">{new Date(selectedAssignment.deadline).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Instructions</p>
                          <div className="bg-chess-deepNavy border border-chess-blue/20 rounded-md p-3">
                            <p className="text-white">{selectedAssignment.description}</p>
                          </div>
                        </div>
                        
                        {!selectedAssignment.completed && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Your Solution</p>
                            <Textarea 
                              placeholder="Enter your solution or notes here..."
                              className="bg-chess-deepNavy border-chess-blue/20 h-24"
                            />
                            <div className="mt-2">
                              <Label htmlFor="file-upload" className="text-sm text-gray-400 block mb-2">
                                Attach files (optional)
                              </Label>
                              <Input 
                                id="file-upload" 
                                type="file" 
                                className="bg-chess-deepNavy border-chess-blue/20"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    {!selectedAssignment?.completed ? (
                      <Button 
                        className="bg-chess-blue hover:bg-chess-blue/90"
                        onClick={handleSubmitAssignment}
                      >
                        Submit Assignment
                      </Button>
                    ) : (
                      <Button 
                        className="bg-chess-blue hover:bg-chess-blue/90"
                        onClick={() => setShowAssignmentDialog(false)}
                      >
                        Close
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      case "progress":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Skill Progress</CardTitle>
              <CardDescription>Your chess abilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                
                <Card className="bg-chess-deepNavy border-chess-blue/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Recent Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="text-green-400">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-white">Tactical pattern recognition +15%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="text-green-400">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-white">Endgame technique +8%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="text-green-400">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-white">Opening repertoire knowledge +12%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-chess-deepNavy border-chess-blue/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Focus Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="text-amber-400">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-white">Strategic planning in middle game</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="text-amber-400">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-white">Pawn structure understanding</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => toast.success("Detailed progress report would be shown here")}
                    >
                      View Detailed Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        );
      case "messages":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
              <CardDescription>Communications with your coaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <h3 className="text-lg font-medium text-white mb-2">No new messages</h3>
                <p className="text-gray-400 mb-4">You don't have any unread messages at the moment.</p>
                <Button 
                  className="bg-chess-blue hover:bg-chess-blue/90"
                  onClick={handleStartConversation}
                >
                  Start a Conversation
                </Button>
              </div>
              
              <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Send a message to your coach
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">To</Label>
                        <Input
                          id="recipient"
                          value={newMessageData.recipient}
                          onChange={(e) => setNewMessageData({...newMessageData, recipient: e.target.value})}
                          placeholder="Recipient"
                          className="bg-chess-deepNavy border-chess-blue/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={newMessageData.subject}
                          onChange={(e) => setNewMessageData({...newMessageData, subject: e.target.value})}
                          placeholder="Subject"
                          className="bg-chess-deepNavy border-chess-blue/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={newMessageData.message}
                          onChange={(e) => setNewMessageData({...newMessageData, message: e.target.value})}
                          placeholder="Type your message here..."
                          className="bg-chess-deepNavy border-chess-blue/20 h-24"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowMessageDialog(false)}
                      className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={handleSendMessage}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Profile Information</h3>
                  <p className="text-gray-400 mb-4">Update your profile details</p>
                  <Button 
                    className="bg-chess-blue hover:bg-chess-blue/90"
                    onClick={() => toast.success("Profile edit dialog would open here")}
                  >
                    Edit Profile
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Password</h3>
                  <p className="text-gray-400 mb-4">Change your password</p>
                  <Button 
                    className="bg-chess-blue hover:bg-chess-blue/90"
                    onClick={() => toast.success("Password change dialog would open here")}
                  >
                    Change Password
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Notification Preferences</h3>
                  <p className="text-gray-400 mb-4">Manage how you receive notifications</p>
                  <Button 
                    className="bg-chess-blue hover:bg-chess-blue/90"
                    onClick={() => toast.success("Notification settings dialog would open here")}
                  >
                    Notification Settings
                  </Button>
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
                  <div className="text-3xl font-bold text-chess-blue">
                    {localAssignments.filter(a => !a.completed).length}
                  </div>
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

            <div className="grid grid-cols-1 gap-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;
