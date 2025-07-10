import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CurriculumUpload from "./pages/CurriculumUpload";
import LecturePlateGenerator from "./pages/LecturePlateGenerator";
import StudentContextBuilder from "./pages/StudentContextBuilder";
import TeacherDashboard from "./pages/TeacherDashboard";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import Checker from "./pages/Checker";
import NotFound from "./pages/NotFound";

// Placeholder components for remaining routes
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8">
    <div className="material-card max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-semibold text-material-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-material-gray-600">
        This page is coming soon. The {title.toLowerCase()} functionality will
        be implemented here.
      </p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/curriculum" element={<CurriculumUpload />} />
            <Route path="/lectures" element={<LecturePlateGenerator />} />
            <Route path="/students" element={<StudentContextBuilder />} />
            <Route path="/dashboard" element={<TeacherDashboard />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route
              path="/class-material"
              element={<PlaceholderPage title="Class-Wise Study Material" />}
            />
            <Route path="/checker" element={<Checker />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Properly manage React root to avoid multiple createRoot calls
const container = document.getElementById("root")!;
let root: any;

if (!container._reactRoot) {
  root = createRoot(container);
  container._reactRoot = root;
} else {
  root = container._reactRoot;
}

root.render(<App />);
