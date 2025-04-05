
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Settings,
  ChevronRight,
  LogOut,
  Users,
  CheckCircle,
  XCircle,
  Send,
  User,
  FileText,
  Clock,
  Check
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
import { Badge } from "@/components/ui/badge";

interface User {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

// Mock data for the coach dashboard
const myClasses = [
  { id: 1, name: "Sicilian Defense Masterclass", batch: "Batch A USA", students: 12, schedule: "Mon, Wed 5:00 PM", status: "Active" },
  { id: 2, name: "Advanced Endgame Techniques", batch: "Batch B USA", students: 8, schedule: "Tue, Thu 6:00 PM", status: "Active" },
  { id: 3, name: "Opening Principles for Beginners", batch: "Batch A UAE", students: 15, schedule: "Sat 10:00 AM", status: "Active" },
];

const myStudents = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", progress: 75, level: "Intermediate", batch: "Batch A USA" },
  { id: 2, name: "Jamie Taylor", email: "jamie@example.com", progress: 62, level: "Beginner", batch: "Batch B USA" },
  { id: 3, name: "Chris Johnson", email: "chris@example.com", progress: 88, level: "Advanced", batch: "Batch A USA" },
  { id: 4, name: "Rahul Sharma", email: "rahul@gmail.com", progress: 70, level: "Intermediate", batch: "Batch A UAE" },
  { id: 5, name: "Priya Patel", email: "priya@gmail.com", progress: 55, level: "Beginner", batch: "Batch A UAE" },
];

const pendingAssignments = [
  { id: 1, title: "Knight endgames practice", student: "Alex Morgan", deadline: "2025-04-08", submitted: true, graded: false },
  { id: 2, name: "Analyze your last tournament game", student: "Jamie Taylor", deadline: "2025-04-10", submitted: true, graded: false },
  { id: 3, name: "Queen vs. Rook endgame puzzles", student: "Rahul Sharma", deadline: "2025-04-12", submitted: false, graded: false },
];

const upcomingDemos = [
  { id: 1, name: "Arjun Singh", email: "arjun@gmail.com", time: "2025-04-06 15:00", status: "Scheduled" },
  { id: 2, name: "Neha Gupta", email: "neha@example.com", time: "2025-04-07 11:00", status: "Pending" },
];

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState("classes");
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Class state
  const [classes, setClasses] = useState(myClasses);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassDetailDialog, setShowClassDetailDialog] = useState(false);
  const [showAddAssignmentDialog, setShowAddAssignmentDialog] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    title: '',
    description: '',
    deadline: '',
    batch: ''
  });
  
  // Student state
  const [students, setStudents] = useState(myStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetailDialog, setShowStudentDetailDialog] = useState(false);
  
  // Assignment state
  const [assignments, setAssignments] = useState(pendingAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAssignmentDetailDialog, setShowAssignmentDetailDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  
  // Demo state
  const [demos, setDemos] = useState(upcomingDemos);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [showDemoDetailDialog, setShowDemoDetailDialog] = useState(false);
  
  // Messaging state
  const [conversations, setConversations] = useState([
    { id: 1, name: "Alex Morgan", role: "Student", unread: 2, lastMessage: "I have a question about the knight endgame position.", time: "10:30 AM" },
    { id: 2, name: "Batch A USA - Group Chat", role: "Group", unread: 0, lastMessage: "You: We'll focus on tactical patterns in tomorrow's class.", time: "Yesterday" },
    { id: 3, name: "Batch B USA - Group Chat", role: "Group", unread: 0, lastMessage: "Jamie: Will we cover the Sicilian Defense next week?", time: "2 days ago" },
  ]);
  
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "Alex Morgan", text: "Hi Coach! I have a question about the knight endgame position you shared yesterday.", time: "10:30 AM", isMine: false },
      { id: 2, sender: "You", text: "Of course, Alex. What specifically is troubling you?", time: "10:32 AM", isMine: true },
      { id: 3, sender: "Alex Morgan", text: "I'm not sure how to proceed after Ke3. Should I go for the kingside or queenside pawns?", time: "10:35 AM", isMine: false }
    ],
    2: [
      { id: 1, sender: "You", text: "We'll focus on tactical patterns in tomorrow's class. Please review the positions I shared via email.", time: "Yesterday", isMine: true },
      { id: 2, sender: "Alex Morgan", text: "Looking forward to it!", time: "Yesterday", isMine: false },
      { id: 3, sender: "Chris Johnson", text: "Should we also review our tournament games?", time: "Yesterday", isMine: false },
      { id: 4, sender: "You", text: "Yes, bring your scoresheets if you have them.", time: "Yesterday", isMine: true }
    ],
    3: [
      { id: 1, sender: "Jamie Taylor", text: "Will we cover the Sicilian Defense next week?", time: "2 days ago", isMine: false },
      { id: 2, sender: "You", text: "Yes, we'll start with the Najdorf variation.", time: "2 days ago", isMine: true },
      { id: 3, sender: "Jamie Taylor", text: "Great! I'll prepare by studying some key positions.", time: "2 days ago", isMine: false }
    ]
  });
  
  const [newMessageData, setNewMessageData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  const [showMessageDialog, setShowMessageDialog] = useState(false);

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

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  // Class handlers
  const handleViewClass = (classItem) => {
    setSelectedClass(classItem);
    setShowClassDetailDialog(true);
  };
  
  const handleAddAssignment = () => {
    if (!newAssignmentData.title || !newAssignmentData.description || !newAssignmentData.deadline || !newAssignmentData.batch) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success(`Assignment "${newAssignmentData.title}" added for ${newAssignmentData.batch}`);
    setShowAddAssignmentDialog(false);
    
    // Reset form
    setNewAssignmentData({
      title: '',
      description: '',
      deadline: '',
      batch: ''
    });
  };
  
  // Student handlers
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentDetailDialog(true);
  };
  
  // Assignment handlers
  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setFeedbackText("");
    setShowAssignmentDetailDialog(true);
  };
  
  const handleGradeAssignment = () => {
    if (!feedbackText) {
      toast.error("Please provide feedback");
      return;
    }
    
    // Update assignment as graded
    setAssignments(prev => 
      prev.map(a => 
        a.id === selectedAssignment.id ? {...a, graded: true} : a
      )
    );
    
    toast.success("Feedback submitted successfully");
    setShowAssignmentDetailDialog(false);
  };
  
  // Demo handlers
  const handleViewDemo = (demo) => {
    setSelectedDemo(demo);
    setShowDemoDetailDialog(true);
  };
  
  const handleDemoAction = (action) => {
    // Update demo status based on action
    setDemos(prev => 
      prev.map(d => 
        d.id === selectedDemo.id ? {...d, status: action === 'accept' ? 'Confirmed' : 'Rescheduled'} : d
      )
    );
    
    toast.success(`Demo ${action === 'accept' ? 'accepted' : 'rescheduled'} successfully`);
    setShowDemoDetailDialog(false);
  };
  
  // Messaging handlers
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
  
  const handleStartNewConversation = () => {
    setNewMessageData({
      recipient: '',
      subject: '',
      message: ''
    });
    setShowMessageDialog(true);
  };
  
  const handleCreateConversation = () => {
    if (!newMessageData.recipient || !newMessageData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newConvId = Math.max(...conversations.map(c => c.id)) + 1;
    
    // Add new conversation
    setConversations(prev => [
      {
        id: newConvId,
        name: newMessageData.recipient,
        role: newMessageData.recipient.includes("Batch") ? "Group" : "Student",
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
    { icon: Users, label: "Students", section: "students", active: activeSection === "students" },
    { icon: BookOpen, label: "Assignments", section: "assignments", active: activeSection === "assignments" },
    { icon: MessageSquare, label: "Messages", section: "messages", active: activeSection === "messages" },
    { icon: Clock, label: "Demo Requests", section: "demos", active: activeSection === "demos" },
    { icon: Settings, label: "Settings", section: "settings", active: activeSection === "settings" },
  ];

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "classes":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white">My Classes</CardTitle>
                <CardDescription>Classes you're teaching</CardDescription>
              </div>
              <Button 
                className="bg-chess-blue hover:bg-chess-blue/90"
                onClick={() => toast.success("Class creation would be implemented here")}
              >
                Create New Class
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map(classItem => (
                  <div key={classItem.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{classItem.name}</h3>
                        <p className="text-sm text-gray-400">{classItem.batch} • {classItem.students} students</p>
                        <div className="mt-2 text-xs text-gray-400">
                          Schedule: {classItem.schedule}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleViewClass(classItem)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Dialog open={showClassDetailDialog} onOpenChange={setShowClassDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Class Details</DialogTitle>
                  </DialogHeader>
                  {selectedClass && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedClass.name}</h3>
                          <Badge variant="outline" className="mt-2">{selectedClass.batch}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Students</p>
                            <p className="text-white">{selectedClass.students}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Schedule</p>
                            <p className="text-white">{selectedClass.schedule}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Status</p>
                            <p className="text-white">{selectedClass.status}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-white font-medium">Class Actions</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              variant="outline" 
                              className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                              onClick={() => {
                                setShowClassDetailDialog(false);
                                toast.success(`Viewing student roster for ${selectedClass.name}`);
                              }}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              View Students
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                              onClick={() => {
                                setShowClassDetailDialog(false);
                                setShowAddAssignmentDialog(true);
                                setNewAssignmentData(prev => ({...prev, batch: selectedClass.batch}));
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Add Assignment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => setShowClassDetailDialog(false)}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={showAddAssignmentDialog} onOpenChange={setShowAddAssignmentDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Add a new assignment for your students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Assignment Title</Label>
                        <Input
                          id="title"
                          value={newAssignmentData.title}
                          onChange={(e) => setNewAssignmentData({...newAssignmentData, title: e.target.value})}
                          placeholder="e.g., Endgame Practice"
                          className="bg-chess-deepNavy border-chess-blue/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newAssignmentData.description}
                          onChange={(e) => setNewAssignmentData({...newAssignmentData, description: e.target.value})}
                          placeholder="Detailed instructions for the assignment..."
                          className="bg-chess-deepNavy border-chess-blue/20 h-24"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newAssignmentData.deadline}
                          onChange={(e) => setNewAssignmentData({...newAssignmentData, deadline: e.target.value})}
                          className="bg-chess-deepNavy border-chess-blue/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Assign to</Label>
                        <Input
                          id="batch"
                          value={newAssignmentData.batch}
                          onChange={(e) => setNewAssignmentData({...newAssignmentData, batch: e.target.value})}
                          placeholder="e.g., Batch A USA"
                          className="bg-chess-deepNavy border-chess-blue/20"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddAssignmentDialog(false)}
                      className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={handleAddAssignment}
                    >
                      Create Assignment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
        
      case "students":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">My Students</CardTitle>
              <CardDescription>Students you're coaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map(student => (
                  <div key={student.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{student.name}</h3>
                        <p className="text-sm text-gray-400">{student.email}</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs text-gray-400 mr-2">Progress:</span>
                          <Progress value={student.progress} className="h-2 w-24" />
                          <span className="text-xs text-gray-400 ml-2">{student.progress}%</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleViewStudent(student)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Dialog open={showStudentDetailDialog} onOpenChange={setShowStudentDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Student Profile</DialogTitle>
                  </DialogHeader>
                  {selectedStudent && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-chess-blue/30 flex items-center justify-center">
                            <User className="h-8 w-8 text-chess-blue" />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-white">{selectedStudent.name}</h3>
                            <p className="text-sm text-gray-400">{selectedStudent.email}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Level</p>
                            <p className="text-white">{selectedStudent.level}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Batch</p>
                            <p className="text-white">{selectedStudent.batch}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Progress</p>
                            <div className="flex items-center">
                              <Progress value={selectedStudent.progress} className="h-2 w-24 mr-2" />
                              <span>{selectedStudent.progress}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-white font-medium">Student Actions</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              variant="outline" 
                              className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                              onClick={() => {
                                setShowStudentDetailDialog(false);
                                // Find or create conversation with this student
                                const existingConv = conversations.find(c => c.name === selectedStudent.name);
                                if (existingConv) {
                                  setActiveConversation(existingConv.id);
                                  setActiveSection("messages");
                                } else {
                                  setNewMessageData({
                                    recipient: selectedStudent.name,
                                    subject: '',
                                    message: ''
                                  });
                                  setShowMessageDialog(true);
                                  setActiveSection("messages");
                                }
                              }}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message Student
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                              onClick={() => {
                                setShowStudentDetailDialog(false);
                                toast.success(`Viewing progress report for ${selectedStudent.name}`);
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Progress Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => setShowStudentDetailDialog(false)}
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
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white">Assignments</CardTitle>
                <CardDescription>Manage student assignments</CardDescription>
              </div>
              <Button 
                className="bg-chess-blue hover:bg-chess-blue/90"
                onClick={() => {
                  setNewAssignmentData({
                    title: '',
                    description: '',
                    deadline: '',
                    batch: ''
                  });
                  setShowAddAssignmentDialog(true);
                }}
              >
                Create Assignment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Pending Review</h3>
                {assignments.filter(a => a.submitted && !a.graded).length === 0 ? (
                  <p className="text-gray-400">No assignments pending review</p>
                ) : (
                  assignments.filter(a => a.submitted && !a.graded).map(assignment => (
                    <div key={assignment.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{assignment.title}</h3>
                          <p className="text-sm text-gray-400">Student: {assignment.student}</p>
                          <div className="mt-2 text-xs text-gray-400">
                            Due: {new Date(assignment.deadline).toLocaleDateString()}
                            <span className="ml-2 inline-flex items-center rounded-full bg-green-900/20 px-2 py-1 text-xs text-green-400">
                              <Check className="mr-1 h-3 w-3" />
                              Submitted
                            </span>
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
                  ))
                )}
                
                <h3 className="text-lg font-medium text-white mt-8">Awaiting Submission</h3>
                {assignments.filter(a => !a.submitted).length === 0 ? (
                  <p className="text-gray-400">All assignments have been submitted</p>
                ) : (
                  assignments.filter(a => !a.submitted).map(assignment => (
                    <div key={assignment.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{assignment.title}</h3>
                          <p className="text-sm text-gray-400">Student: {assignment.student}</p>
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
                  ))
                )}
              </div>
              
              <Dialog open={showAssignmentDetailDialog} onOpenChange={setShowAssignmentDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Assignment Details</DialogTitle>
                  </DialogHeader>
                  {selectedAssignment && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedAssignment.title}</h3>
                          <p className="text-sm text-gray-400">Student: {selectedAssignment.student}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Due Date</p>
                          <p className="text-white">{new Date(selectedAssignment.deadline).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <div className="flex items-center">
                            {selectedAssignment.submitted ? (
                              <span className="inline-flex items-center rounded-full bg-green-900/20 px-2 py-1 text-xs text-green-400">
                                <Check className="mr-1 h-3 w-3" />
                                Submitted
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-amber-900/20 px-2 py-1 text-xs text-amber-400">
                                <Clock className="mr-1 h-3 w-3" />
                                Awaiting Submission
                              </span>
                            )}
                            
                            {selectedAssignment.graded && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-blue-900/20 px-2 py-1 text-xs text-blue-400">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Graded
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {selectedAssignment.submitted && !selectedAssignment.graded && (
                          <div className="space-y-2">
                            <Label htmlFor="feedback">Your Feedback</Label>
                            <Textarea
                              id="feedback"
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              placeholder="Provide feedback on this submission..."
                              className="bg-chess-deepNavy border-chess-blue/20 h-32"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAssignmentDetailDialog(false)}
                      className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                    >
                      Close
                    </Button>
                    
                    {selectedAssignment && selectedAssignment.submitted && !selectedAssignment.graded && (
                      <Button 
                        className="bg-chess-blue hover:bg-chess-blue/90"
                        onClick={handleGradeAssignment}
                      >
                        Submit Feedback
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
        
      case "messages":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
              <CardDescription>Communications with students and classes</CardDescription>
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
                      <MessageSquare className="mr-2 h-4 w-4" />
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
                                  <User className="h-5 w-5 text-chess-blue" />
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
                        <MessageSquare className="h-12 w-12 text-chess-blue/50 mx-auto mb-4" />
                        <h3 className="text-white text-lg font-medium mb-2">No conversation selected</h3>
                        <p className="text-gray-400">Select a conversation from the list or start a new one</p>
                        <Button 
                          className="mt-4 bg-chess-blue hover:bg-chess-blue/90"
                          onClick={handleStartNewConversation}
                        >
                          Start a Conversation
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Send a message to a student or class
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
                          placeholder="Student name or class name"
                          className="bg-chess-deepNavy border-chess-blue/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject (optional)</Label>
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
                      onClick={handleCreateConversation}
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
        
      case "demos":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Demo Requests</CardTitle>
              <CardDescription>Free demo sessions with prospective students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demos.map(demo => (
                  <div key={demo.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{demo.name}</h3>
                        <p className="text-sm text-gray-400">{demo.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <p className="text-xs text-gray-400">
                            {new Date(demo.time).toLocaleDateString()} • {new Date(demo.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <Badge variant="outline" className={
                            demo.status === "Confirmed" ? "border-green-500 text-green-400" :
                            demo.status === "Rescheduled" ? "border-amber-500 text-amber-400" :
                            "border-blue-500 text-blue-400"
                          }>
                            {demo.status}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleViewDemo(demo)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Dialog open={showDemoDetailDialog} onOpenChange={setShowDemoDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Demo Session Details</DialogTitle>
                  </DialogHeader>
                  {selectedDemo && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedDemo.name}</h3>
                          <p className="text-sm text-gray-400">{selectedDemo.email}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Date</p>
                            <p className="text-white">{new Date(selectedDemo.time).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Time</p>
                            <p className="text-white">{new Date(selectedDemo.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Status</p>
                            <p className="text-white">{selectedDemo.status}</p>
                          </div>
                        </div>
                        
                        {selectedDemo.status === "Pending" && (
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Actions</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <Button 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleDemoAction('accept')}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept
                              </Button>
                              <Button 
                                className="bg-amber-600 hover:bg-amber-700 text-white"
                                onClick={() => handleDemoAction('reschedule')}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-3 rounded bg-chess-deepNavy border border-chess-blue/20">
                          <p className="text-sm text-gray-400 mb-1">Notes</p>
                          <p className="text-white">
                            {selectedDemo.id === 1 
                              ? "Student is interested in improving their middlegame. Has some tournament experience and wants to reach 1800 rating."
                              : "Complete beginner looking to start chess journey. Has played casually with friends but never studied formally."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => setShowDemoDetailDialog(false)}
                    >
                      Close
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
              <CardDescription>Manage your coach account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Profile Information</h3>
                  <p className="text-gray-400 mb-4">Update your profile details and expertise</p>
                  <Button 
                    className="bg-chess-blue hover:bg-chess-blue/90"
                    onClick={() => toast.success("Profile edit dialog would open here")}
                  >
                    Edit Profile
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Availability Settings</h3>
                  <p className="text-gray-400 mb-4">Set your teaching hours and availability</p>
                  <Button 
                    className="bg-chess-blue hover:bg-chess-blue/90"
                    onClick={() => toast.success("Availability settings dialog would open here")}
                  >
                    Set Availability
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
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Teaching Materials</h3>
                  <p className="text-gray-400 mb-4">Manage your teaching resources and materials</p>
                  <Button 
                    className="bg-chess-blue hover:bg-chess-blue/90"
                    onClick={() => toast.success("Teaching materials dialog would open here")}
                  >
                    Manage Materials
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
                  <CardTitle className="text-lg text-white">My Classes</CardTitle>
                  <CardDescription>Your active classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">
                    {classes.length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">My Students</CardTitle>
                  <CardDescription>Students you're coaching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">
                    {students.length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-chess-navy border-chess-blue/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Pending Tasks</CardTitle>
                  <CardDescription>Assignments to review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chess-blue">
                    {assignments.filter(a => a.submitted && !a.graded).length}
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

export default CoachDashboard;
