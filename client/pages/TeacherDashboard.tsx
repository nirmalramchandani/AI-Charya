import { useState } from "react";
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  BarChart3,
  Edit,
  Download,
  CheckCircle,
  RotateCcw,
  Trash2,
  Filter,
  Sparkles,
  Upload,
  ExternalLink,
  Menu,
  X,
  GraduationCap,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SyllabusItem {
  id: string;
  title: string;
  subject: string;
  class: string;
  uploadDate: string;
  pdfUrl: string;
}

interface JointLesson {
  id: string;
  topic: string;
  classes: string[];
  timeline: string;
  completed: boolean;
  planUrl: string;
}

interface LecturePlate {
  id: string;
  topic: string;
  story: string;
  image: string;
  guidelines: string[];
  createdAt: string;
}

interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  language: string;
  level: string;
}

const navigationItems = [
  { id: "syllabus", name: "My Syllabus", icon: BookOpen },
  { id: "joint-lessons", name: "Joint Lessons", icon: Calendar },
  { id: "lecture-plates", name: "Lecture Plates", icon: FileText },
  { id: "student-profiles", name: "Student Profiles", icon: Users },
  { id: "reports", name: "Reports", icon: BarChart3 },
];

const dummySyllabus: SyllabusItem[] = [
  {
    id: "1",
    title: "Class 3 Science Curriculum",
    subject: "Science",
    class: "3",
    uploadDate: "2024-01-15",
    pdfUrl: "https://example.com/class3-science.pdf",
  },
  {
    id: "2",
    title: "Class 4 Mathematics",
    subject: "Mathematics",
    class: "4",
    uploadDate: "2024-01-10",
    pdfUrl: "https://example.com/class4-math.pdf",
  },
  {
    id: "3",
    title: "Class 5 EVS Syllabus",
    subject: "Environmental Studies",
    class: "5",
    uploadDate: "2024-01-08",
    pdfUrl: "https://example.com/class5-evs.pdf",
  },
];

const dummyJointLessons: JointLesson[] = [
  {
    id: "1",
    topic: "Water Cycle",
    classes: ["Class 3", "Class 4"],
    timeline: "3 weeks",
    completed: false,
    planUrl: "https://example.com/water-cycle-plan.pdf",
  },
  {
    id: "2",
    topic: "Plant Life",
    classes: ["Class 2", "Class 3"],
    timeline: "2 weeks",
    completed: true,
    planUrl: "https://example.com/plant-life-plan.pdf",
  },
  {
    id: "3",
    topic: "Basic Addition",
    classes: ["Class 1", "Class 2"],
    timeline: "4 weeks",
    completed: false,
    planUrl: "https://example.com/addition-plan.pdf",
  },
];

const dummyLecturePlates: LecturePlate[] = [
  {
    id: "1",
    topic: "Water Cycle",
    story: "Once in Maharashtra, there lived a young farmer named Arjun...",
    image: "https://placehold.co/300x200/4285F4/FFFFFF?text=Water+Cycle",
    guidelines: ["Use chalk to draw", "Ask students to mimic cycle"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    topic: "Plant Life",
    story: "In a small village in Gujarat, little Meera discovered...",
    image: "https://placehold.co/300x200/34A853/FFFFFF?text=Plant+Parts",
    guidelines: ["Bring a small plant", "Garden visit activity"],
    createdAt: "2024-01-12",
  },
];

const dummyStudents: Student[] = [
  {
    id: "1",
    name: "Ravi",
    age: 9,
    class: "3",
    language: "Marathi",
    level: "Average",
  },
  {
    id: "2",
    name: "Priya",
    age: 8,
    class: "3",
    language: "Hindi",
    level: "Advanced",
  },
  {
    id: "3",
    name: "Arjun",
    age: 10,
    class: "4",
    language: "Tamil",
    level: "Beginner",
  },
  {
    id: "4",
    name: "Kavya",
    age: 9,
    class: "4",
    language: "Kannada",
    level: "Advanced",
  },
];

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("syllabus");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("All");

  const classes = ["All", "1", "2", "3", "4", "5"];

  const filteredStudents =
    selectedClass === "All"
      ? dummyStudents
      : dummyStudents.filter((student) => student.class === selectedClass);

  const renderSyllabusContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Syllabus</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </button>
      </div>

      <div className="grid gap-4">
        {dummySyllabus.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>Class {item.class}</span>
                  <span>•</span>
                  <span>{item.subject}</span>
                  <span>•</span>
                  <span>Uploaded {item.uploadDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View PDF
                </a>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 flex items-center">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJointLessonsContent = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Joint Lessons</h2>

      <div className="grid gap-4">
        {dummyJointLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-900 mr-3">
                  {lesson.topic}
                </h3>
                {lesson.completed && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Completed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`px-3 py-1 rounded text-sm flex items-center ${
                    lesson.completed
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {lesson.completed ? "Completed" : "Mark Complete"}
                </button>
                <a
                  href={lesson.planUrl}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 flex items-center"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export Plan
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Classes: {lesson.classes.join(", ")}</span>
              <span>•</span>
              <span>Timeline: {lesson.timeline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLecturePlatesContent = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Lecture Plates</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dummyLecturePlates.map((plate) => (
          <div
            key={plate.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <img
              src={plate.image}
              alt={plate.topic}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />

            <h3 className="font-medium text-gray-900 mb-2">{plate.topic}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {plate.story.substring(0, 100)}...
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{plate.createdAt}</span>
              <div className="flex gap-2">
                <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-200 flex items-center">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
                <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-200 flex items-center">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Regenerate
                </button>
                <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs flex items-center">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentProfilesContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Student Profiles
        </h2>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls === "All" ? "All Classes" : `Class ${cls}`}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{student.name}</h3>
                <div className="text-sm text-gray-600">
                  Age {student.age} • Class {student.class}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  student.level === "Advanced"
                    ? "bg-green-100 text-green-800"
                    : student.level === "Average"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-orange-100 text-orange-800"
                }`}
              >
                {student.level}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              Language: {student.language}
            </div>

            <button className="bg-blue-600 text-white w-full py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Content
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportsContent = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Reports & Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-4">
            Performance Overview
          </h3>
          <div className="space-y-3">
            {["Math", "Science", "English", "EVS"].map((subject, index) => {
              const scores = [75, 68, 82, 71];
              return (
                <div key={subject} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {subject}
                    </span>
                    <span className="text-sm text-gray-600">
                      {scores[index]}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${scores[index]}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">
                5 assignments graded today
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">
                3 new lecture plates created
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">
                2 joint lessons planned
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "syllabus":
        return renderSyllabusContent();
      case "joint-lessons":
        return renderJointLessonsContent();
      case "lecture-plates":
        return renderLecturePlatesContent();
      case "student-profiles":
        return renderStudentProfilesContent();
      case "reports":
        return renderReportsContent();
      default:
        return renderSyllabusContent();
    }
  };

  return (
    <div className="min-h-screen flex flex-row">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="ml-3 text-lg font-semibold text-gray-900">
              Teacher Dashboard
            </h1>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-gray-50 w-1/5 min-h-screen overflow-y-auto border-r border-gray-200 fixed lg:static z-50 transform transition-transform",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center lg:hidden mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <h2 className="text-sm font-semibold text-gray-900">
                EduPlatform
              </h2>
              <p className="text-xs text-gray-600">Teacher Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:w-4/5 pt-16 lg:pt-0">
        <div className="p-6">
          <div className="mb-6 hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your curriculum, students, and teaching materials
            </p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
