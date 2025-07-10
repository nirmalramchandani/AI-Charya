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
      <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        {/* Yellow Patch - Top Left */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-br-full opacity-90"
          style={{
            background: "linear-gradient(135deg, #FBBC05 0%, #F9AB00 100%)",
            transform: "translate(-40%, -40%)",
          }}
        />

        {/* Blue Patch - Bottom Right */}
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-tl-full opacity-90"
          style={{
            background: "linear-gradient(135deg, #4285F4 0%, #1A73E8 100%)",
            transform: "translate(40%, 40%)",
          }}
        />

        {/* Additional Blue Patch - Top Right */}
        <div
          className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-80"
          style={{
            background: "linear-gradient(135deg, #4285F4 0%, #1A73E8 100%)",
          }}
        />

        {/* Additional Yellow Patch - Bottom Left */}
        <div
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-80"
          style={{
            background: "linear-gradient(135deg, #FBBC05 0%, #F9AB00 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-white rounded-3xl shadow-material-lg border-4 border-opacity-20 border-material-blue">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F51a4707e6cb3452bb5e8ffef0fab69d7%2F4e7bfb36cd894a0d96cca31a023e813b?format=webp&width=800"
                  alt="AI-Charya Logo"
                  className="h-32 w-32"
                />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-material-gray-900 mb-6">
              Welcome to
              <span
                className="block"
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
            </h1>
            <p className="text-xl text-material-gray-700 mb-8 max-w-3xl mx-auto font-medium">
              Revolutionize education with AI-powered curriculum management,
              intelligent lecture generation, and comprehensive student progress
              tracking. Build the next generation of intelligent educational
              agents.
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
