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

  return (
    <div className="min-h-screen bg-material-gray-50">
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-material-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
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
          <nav className="flex-1 px-6 py-6">
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
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 bg-white shadow-material border-b border-material-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden material-button-secondary p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </button>

            {/* Page title */}
            <div className="flex-1 lg:pl-0">
              <h1 className="text-lg font-semibold text-material-gray-900">
                {navigation.find((item) => item.href === location.pathname)
                  ?.name || "Educational Platform"}
              </h1>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-material-blue flex items-center justify-center">
                    <span className="text-sm font-medium text-white">U</span>
                  </div>
                  <span className="text-sm font-medium text-material-gray-700">
                    User
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
