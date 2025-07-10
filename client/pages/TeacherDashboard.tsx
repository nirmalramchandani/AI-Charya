import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  BarChart3,
  Edit,
  Eye,
  ArrowRight,
  Clock,
  Users as StudentsIcon,
} from "lucide-react";

interface SyllabusCard {
  id: string;
  class: string;
  subject: string;
  chapterCount: number;
  uploadDate: string;
  status: "Active" | "Draft" | "Archived";
}

interface JointLesson {
  id: string;
  topic: string;
  classes: string[];
  suggestedTimeline: string;
  priority: "High" | "Medium" | "Low";
}

const dummySyllabusData: SyllabusCard[] = [
  {
    id: "1",
    class: "Class 3",
    subject: "Science",
    chapterCount: 12,
    uploadDate: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    class: "Class 4",
    subject: "Mathematics",
    chapterCount: 15,
    uploadDate: "2024-01-10",
    status: "Active",
  },
  {
    id: "3",
    class: "Class 5",
    subject: "Environmental Studies",
    chapterCount: 8,
    uploadDate: "2024-01-08",
    status: "Active",
  },
  {
    id: "4",
    class: "Class 3",
    subject: "Hindi",
    chapterCount: 10,
    uploadDate: "2024-01-05",
    status: "Draft",
  },
  {
    id: "5",
    class: "Class 4",
    subject: "English",
    chapterCount: 14,
    uploadDate: "2024-01-03",
    status: "Active",
  },
  {
    id: "6",
    class: "Class 5",
    subject: "Social Studies",
    chapterCount: 11,
    uploadDate: "2024-01-01",
    status: "Active",
  },
];

const dummyJointLessonsData: JointLesson[] = [
  {
    id: "1",
    topic: "Water Cycle",
    classes: ["Class 3", "Class 4", "Class 5"],
    suggestedTimeline: "3 weeks",
    priority: "High",
  },
  {
    id: "2",
    topic: "Basic Addition & Subtraction",
    classes: ["Class 1", "Class 2"],
    suggestedTimeline: "4 weeks",
    priority: "Medium",
  },
  {
    id: "3",
    topic: "Plant Life Cycles",
    classes: ["Class 2", "Class 3"],
    suggestedTimeline: "2 weeks",
    priority: "High",
  },
  {
    id: "4",
    topic: "Community Helpers",
    classes: ["Class 1", "Class 2", "Class 3"],
    suggestedTimeline: "2 weeks",
    priority: "Medium",
  },
  {
    id: "5",
    topic: "Introduction to Geography",
    classes: ["Class 4", "Class 5"],
    suggestedTimeline: "5 weeks",
    priority: "Low",
  },
];

const quickNavItems = [
  {
    title: "📋 My Lecture Plates",
    description: "View and manage your saved lecture content",
    link: "/lectures",
    color: "bg-material-blue",
    hoverColor: "hover:bg-material-blue-600",
    icon: FileText,
  },
  {
    title: "👥 Student Profiles",
    description: "Access student information and progress",
    link: "/students",
    color: "bg-material-green",
    hoverColor: "hover:bg-material-green-600",
    icon: Users,
  },
  {
    title: "📊 Reports",
    description: "Generate analytics and performance reports",
    link: "/reports",
    color: "bg-material-orange",
    hoverColor: "hover:bg-material-orange-600",
    icon: BarChart3,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-material-green text-white";
    case "Draft":
      return "bg-material-yellow text-material-gray-900";
    case "Archived":
      return "bg-material-gray-500 text-white";
    default:
      return "bg-material-gray-300 text-material-gray-700";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-material-yellow-100 text-material-yellow-800";
    case "Low":
      return "bg-material-gray-100 text-material-gray-700";
    default:
      return "bg-material-gray-100 text-material-gray-700";
  }
};

export default function TeacherDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-material-gray-900 mb-2">
          Teacher Dashboard
        </h1>
        <p className="text-lg text-material-gray-600">
          Welcome! Manage your curriculum and plan smart lessons.
        </p>
      </div>

      {/* Section 1: My Syllabus */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-material-blue mr-3" />
            <h2 className="text-2xl font-semibold text-material-gray-900">
              📚 My Syllabus
            </h2>
          </div>
          <Link
            to="/curriculum"
            className="text-material-blue hover:text-material-blue-600 font-medium flex items-center"
          >
            Add New Syllabus
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummySyllabusData.map((syllabus) => (
            <div
              key={syllabus.id}
              className="bg-white rounded-xl border border-material-gray-200 p-6 hover:shadow-material-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-material-gray-900 mb-1">
                    {syllabus.class}
                  </h3>
                  <p className="text-material-blue font-medium">
                    {syllabus.subject}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    syllabus.status,
                  )}`}
                >
                  {syllabus.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-material-gray-600 mb-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {syllabus.chapterCount} chapters
                  </span>
                </div>
                <div className="flex items-center text-material-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Updated {syllabus.uploadDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-material-gray-100 text-material-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-material-gray-200 transition-colors flex items-center justify-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button className="flex-1 bg-material-blue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-material-blue-600 transition-colors flex items-center justify-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Joint Lessons */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-material-green mr-3" />
          <h2 className="text-2xl font-semibold text-material-gray-900">
            📅 Joint Lessons
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-material-gray-200 overflow-hidden">
          {/* Mobile: Stacked Cards */}
          <div className="block md:hidden">
            {dummyJointLessonsData.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`p-4 ${
                  index !== dummyJointLessonsData.length - 1
                    ? "border-b border-material-gray-200"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-material-gray-900">
                    {lesson.topic}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      lesson.priority,
                    )}`}
                  >
                    {lesson.priority}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <StudentsIcon className="h-4 w-4 text-material-gray-500 mr-2" />
                    <span className="text-sm text-material-gray-600">
                      {lesson.classes.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-material-gray-500 mr-2" />
                    <span className="text-sm text-material-gray-600">
                      {lesson.suggestedTimeline}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-material-green text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-material-green-600 transition-colors">
                  Generate Lesson Plan
                </button>
              </div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-material-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-material-gray-900">
                    Topic
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-material-gray-900">
                    Appears in Classes
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-material-gray-900">
                    Suggested Timeline
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-material-gray-900">
                    Priority
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-material-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyJointLessonsData.map((lesson, index) => (
                  <tr
                    key={lesson.id}
                    className={`${
                      index !== dummyJointLessonsData.length - 1
                        ? "border-b border-material-gray-200"
                        : ""
                    } hover:bg-material-gray-50 transition-colors`}
                  >
                    <td className="py-4 px-6">
                      <span className="font-medium text-material-gray-900">
                        {lesson.topic}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-material-gray-600">
                        {lesson.classes.join(", ")}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-material-gray-600">
                        {lesson.suggestedTimeline}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          lesson.priority,
                        )}`}
                      >
                        {lesson.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="bg-material-green text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-material-green-600 transition-colors">
                        Generate Lesson Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Quick Navigation */}
      <section>
        <div className="flex items-center mb-6">
          <ArrowRight className="h-6 w-6 text-material-orange mr-3" />
          <h2 className="text-2xl font-semibold text-material-gray-900">
            🚀 Quick Navigation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`${item.color} ${item.hoverColor} text-white p-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-material-lg group`}
            >
              <div className="flex items-center mb-4">
                <item.icon className="h-8 w-8 mr-3" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-white/90 mb-4">{item.description}</p>
              <div className="flex items-center text-white font-medium">
                <span>Go to section</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
