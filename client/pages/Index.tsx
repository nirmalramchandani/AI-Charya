import { Link } from "react-router-dom";
import {
  GraduationCap,
  Upload,
  FileText,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      name: "Curriculum Upload",
      description:
        "Upload and process curriculum PDFs with smart topic mapping",
      icon: Upload,
      href: "/curriculum",
      color: "bg-material-blue",
    },
    {
      name: "Lecture Generator",
      description: "Generate dynamic lecture plans from curriculum content",
      icon: FileText,
      href: "/lectures",
      color: "bg-material-green",
    },
    {
      name: "Student Context",
      description: "Build comprehensive student profiles and learning paths",
      icon: Users,
      href: "/students",
      color: "bg-material-orange",
    },
    {
      name: "Analytics & Reports",
      description: "Track progress and generate detailed educational reports",
      icon: BarChart3,
      href: "/reports",
      color: "bg-material-yellow",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-material-blue-50 to-material-green-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-2xl shadow-material-md">
                <GraduationCap className="h-16 w-16 text-material-blue" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-material-gray-900 mb-6">
              Modern Educational
              <span className="text-material-blue block">Platform</span>
            </h1>
            <p className="text-xl text-material-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline curriculum management, generate dynamic lectures, and
              track student progress with our comprehensive educational
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/curriculum"
                className="material-button-primary inline-flex items-center text-lg px-8 py-4"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="material-button-secondary inline-flex items-center text-lg px-8 py-4"
              >
                Teacher Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-material-gray-900 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-lg text-material-gray-600 max-w-2xl mx-auto">
              Everything you need to manage curriculum, create engaging content,
              and track student progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.href}
                className="material-card-elevated p-6 group cursor-pointer hover:scale-105 transform transition-all duration-200"
              >
                <div className={`p-3 rounded-xl ${feature.color} w-fit mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-material-gray-900 mb-2 group-hover:text-material-blue transition-colors">
                  {feature.name}
                </h3>
                <p className="text-material-gray-600 text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-material-blue font-medium text-sm">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-material-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-material-gray-300">
                Curriculum Files Processed
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-material-gray-300">
                Educational Institutions
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-material-gray-300">
                Teacher Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
