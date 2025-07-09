import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  GraduationCap,
  Upload,
  FileText,
  Users,
  UserCheck,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: GraduationCap },
  { name: "Curriculum Upload", href: "/curriculum", icon: Upload },
  { name: "Lecture Generator", href: "/lectures", icon: FileText },
  { name: "Student Context", href: "/students", icon: Users },
  { name: "Teacher Dashboard", href: "/dashboard", icon: UserCheck },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-material-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-material-gray-200">
            <GraduationCap className="h-8 w-8 text-material-blue" />
            <span className="ml-3 text-xl font-semibold text-material-gray-900">
              EduPlatform
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-material-blue text-white shadow-material"
                          : "text-material-gray-700 hover:bg-material-gray-100 hover:text-material-gray-900",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 shrink-0",
                          isActive
                            ? "text-white"
                            : "text-material-gray-500 group-hover:text-material-gray-900",
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
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
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
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

        {/* Desktop page title */}
        <div className="hidden lg:block bg-white border-b border-material-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-material-gray-900">
            {navigation.find((item) => item.href === location.pathname)?.name ||
              "Educational Platform"}
          </h1>
          <p className="text-sm text-material-gray-600 mt-1">
            Welcome to your educational platform dashboard
          </p>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-material-gray-50">
          <div className="h-full">{children}</div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
