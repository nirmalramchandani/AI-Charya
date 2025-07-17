import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const backgroundPatchVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.9,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        {/* Yellow Patch - Top Left */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={backgroundPatchVariants}
          className="absolute top-0 left-0 w-96 h-96 rounded-br-full"
          style={{
            background: "linear-gradient(135deg, #FBBC05 0%, #F9AB00 100%)",
            transform: "translate(-40%, -40%)",
          }}
        />

        {/* Blue Patch - Bottom Right */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={backgroundPatchVariants}
          className="absolute bottom-0 right-0 w-80 h-80 rounded-tl-full"
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <motion.div
                variants={logoVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-6 bg-white rounded-3xl shadow-material-lg border-4 border-opacity-20 border-material-blue"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F51a4707e6cb3452bb5e8ffef0fab69d7%2F4e7bfb36cd894a0d96cca31a023e813b?format=webp&width=800"
                  alt="AI-Charya Logo"
                  className="h-32 w-32"
                />
              </motion.div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-material-gray-900 mb-6"
            >
              Welcome to
              <motion.span
                className="block"
                style={{
                  background:
                    "linear-gradient(45deg, #4285f4 0%, #fbbc05 50%, #34a853 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                AI-Charya
              </motion.span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-material-gray-700 mb-4 max-w-3xl mx-auto font-medium"
            >
              Revolutionize education with AI-powered curriculum management,
              intelligent lecture generation, and comprehensive student progress
              tracking. Build the next generation of intelligent educational
              agents.
            </motion.p>
            <p className="text-lg text-material-gray-600 mb-8 max-w-2xl mx-auto">
              Developed With Google Cloud Vertex AI and Firebase
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
        </motion.div>
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
