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
  Send,
  Users
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
  
  // Add new state variables for messaging feature
  const [conversations, setConversations] = useState([
    { id: 1, name: "David Smith", role: "Coach", unread: 2, lastMessage: "How is your progress with the knight endgame exercises?", time: "10:30 AM" },
    { id: 2, name: "Batch A - Group Chat", role: "Group", unread: 0, lastMessage: "Lisa: I found this great resource for studying openings.", time: "Yesterday" },
    { id: 3, name: "Batch B - Group Chat", role: "Group", unread: 0, lastMessage: "Michael: Good luck to everyone in the weekend tournament!", time: "2 days ago" }
  ]);
  
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "David Smith", text: "Hello Alex! How is your progress with the knight endgame exercises?", time: "10:30 AM", isMine: false },
      { id: 2, sender: "You", text: "I'm still working through them. The third position is challenging!", time: "10:32 AM", isMine: true },
      { id: 3, sender: "David Smith", text: "Focus on controlling the central squares. Try to visualize where your knight can be most active.", time: "10:35 AM", isMine: false }
    ],
    2: [
      { id: 1, sender: "Lisa", text: "I found this great resource for studying openings.", time: "Yesterday", isMine: false },
      { id: 2, sender: "Rahul", text: "Thanks for sharing! I've been struggling with the Sicilian.", time: "Yesterday", isMine: false },
      { id: 3, sender: "You", text: "The Sicilian is complex. We can discuss it in the next session.", time: "Yesterday", isMine: true },
      { id: 4, sender: "David Smith", text: "Great idea! I'll prepare some example positions.", time: "Yesterday", isMine: false }
    ],
    3: [
      { id: 1, sender: "Michael", text: "Good luck to everyone in the weekend tournament!", time: "2 days ago", isMine: false },
      { id: 2, sender: "Priya", text: "Thank you! I'm a bit nervous but excited.", time: "2 days ago", isMine: false },
      { id: 3, sender: "You", text: "You'll do great! Remember what we practiced.", time: "2 days ago", isMine: true }
    ]
  });

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
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    
    const newMessage = {
      id: messages[activeConversation]?.length + 1 || 1,
      sender: "You",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    
    setMessages(prev => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMessage]
    }));
    
    // Update the conversation list with the last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation 
          ? {...conv, lastMessage: `You: ${messageText}`, time: "Just now", unread: 0}
          : conv
      )
    );
    
    setMessageText("");
    toast.success("Message sent");
  };
  
  // Start a new conversation
  const handleStartNewConversation = () => {
    setNewMessageData(prev => ({
      ...prev,
      recipient: '',
      subject: '',
      message: ''
    }));
    setShowMessageDialog(true);
  };
  
  // Handle creating a new conversation
  const handleCreateConversation = () => {
    if (!newMessageData.recipient || !newMessageData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newConvId = Math.max(...Object.keys(messages).map(Number)) + 1;
    
    // Add new conversation
    setConversations(prev => [
      {
        id: newConvId,
        name: newMessageData.recipient,
        role: "Coach",
        unread: 0,
        lastMessage: `You: ${newMessageData.message}`,
        time: "Just now"
      },
      ...prev
    ]);
    
    // Add initial message
    setMessages(prev => ({
      ...prev,
      [newConvId]: [
        {
          id: 1,
          sender: "You",
          text: newMessageData.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMine: true
        }
      ]
    }));
    
    setActiveConversation(newConvId);
    setShowMessageDialog(false);
    toast.success("Conversation started");
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
              <CardDescription>Communications with coaches and peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[600px] border rounded-md border-chess-blue/20">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-chess-blue/20 overflow-y-auto">
                  <div className="p-3 border-b border-chess-blue/20">
                    <Button 
                      className="w-full bg-chess-blue hover:bg-chess-blue/90"
                      onClick={handleStartNewConversation}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      New Message
                    </Button>
                  </div>
                  
                  <div className="divide-y divide-chess-blue/20">
                    {conversations.map(conv => (
                      <div 
                        key={conv.id}
                        className={`p-3 cursor-pointer hover:bg-chess-deepNavy ${activeConversation === conv.id ? 'bg-chess-deepNavy' : ''}`}
                        onClick={() => {
                          setActiveConversation(conv.id);
                          // Mark as read
                          setConversations(prev => 
                            prev.map(c => 
                              c.id === conv.id ? {...c, unread: 0} : c
                            )
                          );
                        }}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="mr-3">
                              {conv.role === "Group" ? (
                                <div className="w-10 h-10 rounded-full bg-chess-blue/30 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-chess-blue" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-chess-blue/30 flex items-center justify-center">
                                  <MessageCircle className="h-5 w-5 text-chess-blue" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium flex items-center">
                                {conv.name}
                                {conv.unread > 0 && (
                                  <span className="ml-2 bg-chess-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {conv.unread}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">{conv.role}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">{conv.time}</div>
                        </div>
                        <div className="mt-1 text-sm text-gray-300 truncate">{conv.lastMessage}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message Content */}
                <div className="w-2/3 flex flex-col">
                  {activeConversation ? (
                    <>
                      <div className="p-4 border-b border-chess-blue/20">
                        <h3 className="text-white font-medium">
                          {conversations.find(c => c.id === activeConversation)?.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {conversations.find(c => c.id === activeConversation)?.role}
                        </p>
                      </div>
                      
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                          {messages[activeConversation]?.map(message => (
                            <div key={message.id} className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-3 rounded-lg ${
                                message.isMine 
                                  ? 'bg-chess-blue text-white' 
                                  : 'bg-chess-deepNavy text-white'
                              }`}>
                                {!message.isMine && (
                                  <p className="text-xs font-medium mb-1">{message.sender}</p>
                                )}
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs opacity-70 mt-1 text-right">{message.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-chess-blue/20">
                        <div className="flex">
                          <Textarea
                            value={messageText}
                            onChange={e => setMessageText(e.target.value)}
                            placeholder="Type your message..."
                            className="bg-chess-deepNavy border-chess-blue/20 flex-1 resize-none"
                            onKeyDown={e => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button 
                            className="ml-2 bg-chess-blue hover:bg-chess-blue/90"
                            onClick={handleSendMessage}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center p-4">
                      <div className="text-center">
                        <MessageCircle className="h-
