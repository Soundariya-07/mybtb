
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Programs from "./pages/Programs";
import Benefits from "./pages/Benefits";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import BookDemo from "./pages/BookDemo";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
