
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Book, 
  Settings,
  ChevronRight,
  LogOut,
  CheckCircle,
  Clock,
  XCircle
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

const demoRequests = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", date: "2025-04-10", time: "14:00", status: "Pending" },
  { id: 2, name: "Mark Davis", email: "mark@example.com", date: "2025-04-12", time: "15:30", status: "Pending" },
];

const studentAssignments = [
  { 
    id: 1, 
    studentName: "Alex Morgan", 
    title: "Knight endgames practice", 
    dateAssigned: "2025-04-01", 
    deadline: "2025-04-08", 
    status: "In Progress" 
  },
  { 
    id: 2, 
    studentName: "Jamie Taylor", 
    title: "Analyze your last tournament game", 
    dateAssigned: "2025-04-02", 
    deadline: "2025-04-10", 
    status: "Not Started" 
  },
  { 
    id: 3, 
    studentName: "Taylor Smith", 
    title: "Queen vs. Rook endgame puzzles", 
    dateAssigned: "2025-04-03", 
    deadline: "2025-04-12", 
    status: "Completed" 
  },
];

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [activeSection, setActiveSection] = useState("sessions");
  const [showSessionDetailDialog, setShowSessionDetailDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showStudentDetailDialog, setShowStudentDetailDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showNewAssignmentDialog, setShowNewAssignmentDialog] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    studentId: '',
    title: '',
    description: '',
    deadline: ''
  });
  const [showDemoResponseDialog, setShowDemoResponseDialog] = useState(false);
  const [selectedDemoRequest, setSelectedDemoRequest] = useState<any>(null);

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
      console.log("Coach dashboard - user data:", userData);
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

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleViewSession = (session: any) => {
    setSelectedSession(session);
    setShowSessionDetailDialog(true);
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setShowStudentDetailDialog(true);
  };

  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowAssignmentDialog(true);
  };

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
  };

  const handleOpenNewAssignmentDialog = () => {
    setNewAssignmentData({
      studentId: '',
      title: '',
      description: '',
      deadline: ''
    });
    setShowNewAssignmentDialog(true);
  };

  const handleCreateAssignment = () => {
    if (!newAssignmentData.studentId || !newAssignmentData.title || !newAssignmentData.deadline) {
      toast.error("Please fill in all required fields");
      return;
    }

    const student = students.find(s => s.id.toString() === newAssignmentData.studentId);
    if (!student) {
      toast.error("Selected student not found");
      return;
    }

    toast.success(`Assignment "${newAssignmentData.title}" created for ${student.name}`);
    setShowNewAssignmentDialog(false);
  };

  const handleRespondToDemoRequest = (demo: any) => {
    setSelectedDemoRequest(demo);
    setShowDemoResponseDialog(true);
  };

  const handleAcceptDemo = () => {
    toast.success(`Demo for ${selectedDemoRequest.name} accepted`);
    setShowDemoResponseDialog(false);
  };

  const handleRescheduleDemo = () => {
    toast.success(`Requested rescheduling for ${selectedDemoRequest.name}`);
    setShowDemoResponseDialog(false);
  };

  if (!user) {
    return <div className="min-h-screen bg-chess-deepNavy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-chess-blue border-t-transparent rounded-full"></div>
    </div>;
  }

  // Menu items for the sidebar
  const menuItems = [
    { icon: Calendar, label: "Sessions", section: "sessions", active: activeSection === "sessions" },
    { icon: Users, label: "Students", section: "students", active: activeSection === "students" },
    { icon: MessageSquare, label: "Messages", section: "messages", active: activeSection === "messages" },
    { icon: Book, label: "Demo", section: "demo", active: activeSection === "demo" },
    { icon: Settings, label: "Settings", section: "settings", active: activeSection === "settings" },
  ];

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "sessions":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Sessions</CardTitle>
                <Button 
                  className="bg-chess-blue hover:bg-chess-blue/90"
                  onClick={handleOpenNewAssignmentDialog}
                >
                  Create Assignment
                </Button>
              </div>
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleViewSession(session)}
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleViewSession(session)}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <Dialog open={showSessionDetailDialog} onOpenChange={setShowSessionDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Session Details</DialogTitle>
                  </DialogHeader>
                  {selectedSession && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedSession.topic}</h3>
                          <p className="text-sm text-gray-400">with {selectedSession.studentName}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Date</p>
                            <p className="text-white">{new Date(selectedSession.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Time</p>
                            <p className="text-white">{selectedSession.time}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Session Type</p>
                            <p className="text-white">{selectedSession.type}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Session Notes</p>
                          <Textarea 
                            placeholder="Add your notes for this session here..."
                            className="bg-chess-deepNavy border-chess-blue/20 h-24"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => setShowSessionDetailDialog(false)}
                    >
                      Save Notes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={showNewAssignmentDialog} onOpenChange={setShowNewAssignmentDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Create an assignment for one of your students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="student" className="text-right">
                        Student
                      </Label>
                      <Select 
                        value={newAssignmentData.studentId}
                        onValueChange={(value) => setNewAssignmentData({...newAssignmentData, studentId: value})}
                      >
                        <SelectTrigger className="col-span-3 bg-chess-deepNavy border-chess-blue/20">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent className="bg-chess-navy border-chess-blue/20">
                          {students.map(student => (
                            <SelectItem key={student.id} value={student.id.toString()}>
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newAssignmentData.title}
                        onChange={(e) => setNewAssignmentData({...newAssignmentData, title: e.target.value})}
                        className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                        placeholder="Assignment title"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newAssignmentData.description}
                        onChange={(e) => setNewAssignmentData({...newAssignmentData, description: e.target.value})}
                        className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                        placeholder="Detailed instructions for this assignment"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deadline" className="text-right">
                        Deadline
                      </Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newAssignmentData.deadline}
                        onChange={(e) => setNewAssignmentData({...newAssignmentData, deadline: e.target.value})}
                        className="col-span-3 bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowNewAssignmentDialog(false)}
                      className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={handleCreateAssignment}
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Students</CardTitle>
                  <CardDescription>Your current students</CardDescription>
                </div>
                <Tabs defaultValue="students">
                  <TabsList className="bg-chess-deepNavy">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TabsContent value="students" className="mt-0">
                  {students.map(student => (
                    <div key={student.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{student.name}</h3>
                          <p className="text-sm text-gray-400">Level: {student.level}</p>
                          <div className="mt-2 text-xs text-gray-400">
                            Progress: {student.progress} • Next session: {student.nextSession}
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
                </TabsContent>
                
                <TabsContent value="assignments" className="mt-0">
                  {studentAssignments.map(assignment => (
                    <div key={assignment.id} className="bg-chess-deepNavy p-4 rounded-lg hover:bg-chess-deepNavy/80 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{assignment.title}</h3>
                          <p className="text-sm text-gray-400">Student: {assignment.studentName}</p>
                          <div className="mt-2 text-xs text-gray-400">
                            Due: {new Date(assignment.deadline).toLocaleDateString()} • 
                            Status: <span className={
                              assignment.status === 'Completed' ? 'text-green-400' : 
                              assignment.status === 'In Progress' ? 'text-amber-400' : 
                              'text-red-400'
                            }>{assignment.status}</span>
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
                </TabsContent>
              </div>
              
              <Dialog open={showStudentDetailDialog} onOpenChange={setShowStudentDetailDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Student Profile</DialogTitle>
                  </DialogHeader>
                  {selectedStudent && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedStudent.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Level</p>
                            <p className="text-white">{selectedStudent.level}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Progress</p>
                            <p className="text-white">{selectedStudent.progress}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Next Session</p>
                            <p className="text-white">{selectedStudent.nextSession}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Student Notes</p>
                          <Textarea 
                            placeholder="Add your notes about this student here..."
                            className="bg-chess-deepNavy border-chess-blue/20 h-24"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleOpenNewAssignmentDialog()}
                      className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
                    >
                      Create Assignment
                    </Button>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => setShowStudentDetailDialog(false)}
                    >
                      Save Notes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={showAssignmentDialog} onOpenChange={setShowAssignmentDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Assignment Details</DialogTitle>
                  </DialogHeader>
                  {selectedAssignment && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{selectedAssignment.title}</h3>
                          <p className="text-sm text-gray-400">Assigned to: {selectedAssignment.studentName}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Assigned Date</p>
                            <p className="text-white">{new Date(selectedAssignment.dateAssigned).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Deadline</p>
                            <p className="text-white">{new Date(selectedAssignment.deadline).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Status</p>
                            <p className={
                              selectedAssignment.status === 'Completed' ? 'text-green-400' : 
                              selectedAssignment.status === 'In Progress' ? 'text-amber-400' : 
                              'text-red-400'
                            }>{selectedAssignment.status}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Assignment Description</p>
                          <div className="bg-chess-deepNavy border border-chess-blue/20 rounded-md p-3">
                            <p className="text-white">Complete the provided exercises on Knight endgames from the textbook pages 45-50. Submit your solutions with annotations explaining your thought process.</p>
                          </div>
                        </div>
                        
                        {selectedAssignment.status === 'Completed' && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Student Submission</p>
                            <div className="bg-chess-deepNavy border border-chess-blue/20 rounded-md p-3">
                              <p className="text-white">Completed assignment with solutions attached. All exercises were challenging but I found the Knight vs Bishop endgame especially interesting.</p>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Feedback</p>
                          <Textarea 
                            placeholder="Provide feedback on this assignment..."
                            className="bg-chess-deepNavy border-chess-blue/20 h-24"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => {
                        toast.success("Feedback saved");
                        setShowAssignmentDialog(false);
                      }}
                    >
                      Send Feedback
                    </Button>
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleViewMessage(message)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Message</DialogTitle>
                  </DialogHeader>
                  {selectedMessage && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <h3 className="text-white font-medium">{selectedMessage.from}</h3>
                          <span className="text-gray-400 text-sm">{selectedMessage.time}</span>
                        </div>
                        
                        <div className="bg-chess-deepNavy border border-chess-blue/20 rounded-md p-3">
                          {selectedMessage.id === 1 ? (
                            <p className="text-white">Thanks for the great lesson! I've practiced the endgame positions you showed me and I'm starting to understand the concepts better. I have a question about one specific position - when the king is on e4 and the knight is on c5, what's the best way to proceed? Looking forward to our next session!</p>
                          ) : selectedMessage.id === 2 ? (
                            <p className="text-white">I won't be able to attend the next session due to a doctor's appointment. Is it possible to reschedule for later that day or move to the following day? Sorry for the inconvenience.</p>
                          ) : (
                            <p className="text-white">Your schedule for next month has been updated. You have a new student starting on May 3rd. Please check your calendar for the complete details and let administration know if there are any issues.</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Reply</p>
                          <Textarea 
                            placeholder="Type your reply here..."
                            className="bg-chess-deepNavy border-chess-blue/20 h-24"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={() => {
                        toast.success("Reply sent");
                        setShowMessageDialog(false);
                      }}
                    >
                      Send Reply
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      case "demo":
        return (
          <Card className="bg-chess-navy border-chess-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Demo Requests</CardTitle>
              <CardDescription>Manage your demo sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {demoRequests.length > 0 ? (
                <div className="space-y-4">
                  {demoRequests.map(demo => (
                    <Card key={demo.id} className="bg-chess-deepNavy border-chess-blue/20">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-white text-lg">{demo.name}</CardTitle>
                          <span className="px-2 py-1 rounded-full text-xs bg-amber-900/20 text-amber-400">
                            {demo.status}
                          </span>
                        </div>
                        <CardDescription>{demo.email}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Date</p>
                            <p className="text-white">{new Date(demo.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Time</p>
                            <p className="text-white">{demo.time}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button 
                          className="w-full bg-chess-blue hover:bg-chess-blue/90"
                          onClick={() => handleRespondToDemoRequest(demo)}
                        >
                          Respond
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium text-white mb-2">No upcoming demo requests</h3>
                  <p className="text-gray-400 mb-4">You don't have any pending demo requests at the moment.</p>
                </div>
              )}
              
              <Dialog open={showDemoResponseDialog} onOpenChange={setShowDemoResponseDialog}>
                <DialogContent className="bg-chess-navy border-chess-blue/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Respond to Demo Request</DialogTitle>
                  </DialogHeader>
                  {selectedDemoRequest && (
                    <div className="py-4">
                      <div className="space-y-4">
                        <div className="p-3 bg-chess-deepNavy rounded-lg">
                          <p><strong>Student:</strong> {selectedDemoRequest.name}</p>
                          <p><strong>Email:</strong> {selectedDemoRequest.email}</p>
                          <p><strong>Date:</strong> {new Date(selectedDemoRequest.date).toLocaleDateString()}</p>
                          <p><strong>Time:</strong> {selectedDemoRequest.time}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Add a message (optional)</p>
                          <Textarea 
                            placeholder="Include any additional information for the student..."
                            className="bg-chess-deepNavy border-chess-blue/20 h-24"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={handleRescheduleDemo}
                      className="border-amber-500/20 text-amber-400 hover:bg-amber-500/10"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Request Reschedule
                    </Button>
                    <Button 
                      className="bg-chess-blue hover:bg-chess-blue/90"
                      onClick={handleAcceptDemo}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept
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
