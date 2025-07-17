import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  Upload,
  FileText,
  Users,
  UserCheck,
  BarChart3,
  CheckSquare,
  Send,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: GraduationCap },
  { name: "Knowledge Base", href: "/knowledge-base", icon: Upload },
  { name: "Smart Match", href: "/smart-match", icon: FileText },
  { name: "Student Profile", href: "/student-profile", icon: Users },
  { name: "Teacher Dashboard", href: "/dashboard", icon: UserCheck },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Checker", href: "/checker", icon: CheckSquare },
];

// Animation variants
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const overlayVariants = {
  open: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const assistantVariants = {
  open: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  closed: {
    scale: 0,
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you with questions about curriculum, lectures, student analysis, and more!",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { type: "user", content: newMessage },
        {
          type: "assistant",
          content:
            "I'm here to help! I can assist with educational content, provide insights about your platform usage, or answer questions about any feature.",
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-material-lg lg:translate-x-0"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-material-gray-200">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F51a4707e6cb3452bb5e8ffef0fab69d7%2F4e7bfb36cd894a0d96cca31a023e813b?format=webp&width=800"
              alt="AI-Charya Logo"
              className="h-16 w-16"
            />
            <span
              className="ml-3 text-xl font-semibold"
              style={{
                background:
                  "linear-gradient(45deg, #4285f4 0%, #fbbc05 50%, #34a853 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI-Charya
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.li
                    key={item.name}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    variants={navItemVariants}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-sm",
                        isActive
                          ? "bg-material-blue text-white shadow-material"
                          : "text-material-gray-700 hover:bg-material-gray-100 hover:text-material-gray-900",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-5 w-5 shrink-0",
                            isActive
                              ? "text-white"
                              : "text-material-gray-500 group-hover:text-material-gray-900",
                          )}
                        />
                      </motion.div>
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer - User Info */}
          <div className="shrink-0 border-t border-material-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-material-blue flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-material-gray-900">
                  Teacher
                </p>
                <p className="text-xs text-material-gray-500">
                  teacher@edu.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white shadow-material border-b border-material-gray-200">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className="material-button-secondary p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </button>

            {/* Mobile page title */}
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-material-gray-900">
                {navigation.find((item) => item.href === location.pathname)
                  ?.name || "Educational Platform"}
              </h1>
            </div>

            {/* Mobile user menu */}
            <div className="h-8 w-8 rounded-full bg-material-blue flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-material-gray-50">
          <div className="h-full">{children}</div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

            {/* Global Floating AI Assistant Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="w-16 h-16 rounded-full shadow-lg text-white flex items-center justify-center p-1 bg-white border-2 border-material-blue hover:bg-material-gray-50"
          animate={{ rotate: isAssistantOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="https://cdn.builder.io/api/v1/image/assets%2F51a4707e6cb3452bb5e8ffef0fab69d7%2F4e7bfb36cd894a0d96cca31a023e813b?format=webp&width=800"
            alt="AI Assistant"
            className="w-12 h-12 rounded-full"
            animate={{ rotate: isAssistantOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

            {/* Global Floating AI Assistant Chat */}
      <AnimatePresence>
        {isAssistantOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={assistantVariants}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-xl border border-material-gray-200"
          >
        <div className="flex items-center justify-between p-4 border-b border-material-gray-200 bg-gradient-to-r from-material-blue-50 to-material-green-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F51a4707e6cb3452bb5e8ffef0fab69d7%2F4e7bfb36cd894a0d96cca31a023e813b?format=webp&width=800"
              alt="AI Assistant"
              className="w-6 h-6 rounded-full"
            />
            <span
              className="font-medium"
              style={{
                background:
                  "linear-gradient(45deg, #4285f4 0%, #fbbc05 50%, #34a853 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI-Charya Assistant
            </span>
          </div>
          <Button
            onClick={() => setIsAssistantOpen(false)}
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 hover:bg-material-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex transition-all duration-300 ease-in-out",
                  message.type === "user" ? "justify-end" : "justify-start",
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg shadow-sm",
                    message.type === "user"
                      ? "bg-material-blue text-white"
                      : "bg-gradient-to-r from-material-blue-50 to-material-green-50 text-material-gray-900 border border-material-gray-200",
                  )}
                >
                  <div className="flex items-start gap-2">
                    {message.type === "assistant" && (
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F51a4707e6cb3452bb5e8ffef0fab69d7%2F4e7bfb36cd894a0d96cca31a023e813b?format=webp&width=800"
                        alt="AI"
                        className="w-4 h-4 rounded-full mt-0.5"
                      />
                    )}
                    {message.type === "user" && (
                      <User className="h-4 w-4 mt-0.5" />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-material-gray-200 p-4 bg-material-gray-50 rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-material-gray-300 focus:border-material-blue focus:ring-material-blue"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-material-blue hover:bg-material-blue-600 text-white shadow-sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}