import { useState } from "react";
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  Brain,
  Edit,
  Download,
  CheckCircle,
  RotateCcw,
  Trash2,
  Filter,
  Sparkles,
  Upload,
  ExternalLink,
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

interface VisualAid {
  id: string;
  prompt: string;
  image: string;
  createdAt: string;
}

const tabs = [
  { id: "syllabus", name: "My Syllabus", icon: BookOpen },
  { id: "joint-lessons", name: "Joint Lessons", icon: Calendar },
  { id: "lecture-plates", name: "My Lecture Plates", icon: FileText },
  { id: "student-profiles", name: "Student Profiles", icon: Users },
  { id: "visual-aids", name: "Visual Aids", icon: Brain },
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

const dummyVisualAids: VisualAid[] = [
  {
    id: "1",
    prompt: "Draw water cycle using river and clouds",
    image:
      "https://placehold.co/400x300/4285F4/FFFFFF?text=Water+Cycle+Diagram",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    prompt: "Show plant parts with roots and leaves",
    image: "https://placehold.co/400x300/34A853/FFFFFF?text=Plant+Diagram",
    createdAt: "2024-01-12",
  },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("syllabus");
  const [selectedClass, setSelectedClass] = useState("All");
  const [visualPrompt, setVisualPrompt] = useState("");
  const [generatingVisual, setGeneratingVisual] = useState(false);

  const classes = ["All", "1", "2", "3", "4", "5"];

  const filteredStudents =
    selectedClass === "All"
      ? dummyStudents
      : dummyStudents.filter((student) => student.class === selectedClass);

  const generateVisualAid = () => {
    if (!visualPrompt.trim()) return;

    setGeneratingVisual(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratingVisual(false);
      setVisualPrompt("");
      // In real app, would add to visual aids list
    }, 2000);
  };

  const renderSyllabusTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-material-gray-900">
          📚 My Syllabus
        </h3>
        <button className="material-button-primary">
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </button>
      </div>

      <div className="space-y-4">
        {dummySyllabus.map((item) => (
          <div key={item.id} className="material-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-material-gray-900">
                  {item.title}
                </h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-material-gray-600">
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
                  className="material-button-secondary text-sm px-3 py-1"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View PDF
                </a>
                <button className="material-button-secondary text-sm px-3 py-1">
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

  const renderJointLessonsTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-material-gray-900">
        📅 Joint Lessons
      </h3>

      <div className="space-y-4">
        {dummyJointLessons.map((lesson) => (
          <div key={lesson.id} className="material-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h4 className="font-medium text-material-gray-900 mr-3">
                  {lesson.topic}
                </h4>
                {lesson.completed && (
                  <span className="bg-material-green text-white px-2 py-1 rounded-full text-xs">
                    Completed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`material-button-${lesson.completed ? "secondary" : "primary"} text-sm px-3 py-1`}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {lesson.completed ? "Completed" : "Mark Complete"}
                </button>
                <a
                  href={lesson.planUrl}
                  className="material-button-secondary text-sm px-3 py-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export Plan
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-material-gray-600">
              <span>Classes: {lesson.classes.join(", ")}</span>
              <span>•</span>
              <span>Timeline: {lesson.timeline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLecturePlatesTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-material-gray-900">
        📋 My Lecture Plates
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dummyLecturePlates.map((plate) => (
          <div key={plate.id} className="material-card p-4">
            <img
              src={plate.image}
              alt={plate.topic}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />

            <h4 className="font-medium text-material-gray-900 mb-2">
              {plate.topic}
            </h4>
            <p className="text-sm text-material-gray-600 mb-3 line-clamp-2">
              {plate.story.substring(0, 100)}...
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-material-gray-500">
                {plate.createdAt}
              </span>
              <div className="flex gap-2">
                <button className="material-button-secondary text-xs px-2 py-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
                <button className="material-button-secondary text-xs px-2 py-1">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Regenerate
                </button>
                <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentProfilesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-material-gray-900">
          👥 Student Profiles
        </h3>
        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="material-input w-auto"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls === "All" ? "All Classes" : `Class ${cls}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="material-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-material-gray-900">
                  {student.name}
                </h4>
                <div className="text-sm text-material-gray-600">
                  Age {student.age} • Class {student.class}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  student.level === "Advanced"
                    ? "bg-material-green text-white"
                    : student.level === "Average"
                      ? "bg-material-yellow text-material-gray-900"
                      : "bg-material-orange text-white"
                }`}
              >
                {student.level}
              </span>
            </div>

            <div className="text-sm text-material-gray-600 mb-3">
              Language: {student.language}
            </div>

            <button className="material-button-primary w-full text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Personalized Content
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVisualAidsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-material-gray-900">
        🧠 Visual Aids
      </h3>

      {/* Input Section */}
      <div className="material-card p-6">
        <h4 className="font-medium text-material-gray-900 mb-4">
          Generate New Visual Aid
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-material-gray-700 mb-2">
              Diagram Prompt
            </label>
            <input
              type="text"
              value={visualPrompt}
              onChange={(e) => setVisualPrompt(e.target.value)}
              placeholder="e.g., Draw water cycle using river and clouds"
              className="material-input"
            />
          </div>
          <button
            onClick={generateVisualAid}
            disabled={!visualPrompt.trim() || generatingVisual}
            className="material-button-primary"
          >
            {generatingVisual ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              <div className="flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Generate Visual Aid
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Generated Visual Aids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyVisualAids.map((aid) => (
          <div key={aid.id} className="material-card p-4">
            <div className="mb-3">
              <img
                src={aid.image}
                alt={aid.prompt}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <h4 className="font-medium text-material-gray-900 mb-2">
              "{aid.prompt}"
            </h4>

            <div className="flex items-center justify-between">
              <span className="text-xs text-material-gray-500">
                {aid.createdAt}
              </span>
              <div className="flex gap-2">
                <button className="material-button-secondary text-xs px-2 py-1">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </button>
                <button className="material-button-secondary text-xs px-2 py-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit Prompt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "syllabus":
        return renderSyllabusTab();
      case "joint-lessons":
        return renderJointLessonsTab();
      case "lecture-plates":
        return renderLecturePlatesTab();
      case "student-profiles":
        return renderStudentProfilesTab();
      case "visual-aids":
        return renderVisualAidsTab();
      default:
        return renderSyllabusTab();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="flex h-full">
        {/* Vertical Tabs Sidebar */}
        <div className="w-64 bg-white border-r border-material-gray-200 p-4 hidden lg:block">
          <h2 className="text-xl font-semibold text-material-gray-900 mb-6">
            Teacher Dashboard
          </h2>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors",
                  activeTab === tab.id
                    ? "bg-material-blue text-white shadow-material"
                    : "text-material-gray-700 hover:bg-material-gray-100",
                )}
              >
                <tab.icon
                  className={cn(
                    "h-5 w-5 mr-3",
                    activeTab === tab.id
                      ? "text-white"
                      : "text-material-gray-500",
                  )}
                />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Tab Selector */}
        <div className="lg:hidden w-full">
          <div className="bg-white border-b border-material-gray-200 p-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="material-input w-full"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
