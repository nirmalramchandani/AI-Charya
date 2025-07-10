import { Link } from "react-router-dom";
import {
  Clock,
  BookOpen,
  Users,
  TrendingUp,
  Mic,
  Calendar,
  School,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface ClassSchedule {
  time: string;
  class: string;
  subject: string;
  topic: string;
}

interface SubjectProgress {
  subject: string;
  progress: number;
  color: string;
}

interface WeakSubject {
  subject: string;
  percentage: number;
  color: string;
}

interface ClassAttendance {
  class: string;
  present: number;
  total: number;
}

const todaySchedule: ClassSchedule[] = [
  {
    time: "9:00–9:40",
    class: "Class 5",
    subject: "Math",
    topic: "Fractions",
  },
  {
    time: "10:00–10:40",
    class: "Class 4",
    subject: "Science",
    topic: "Water Cycle",
  },
  {
    time: "12:00–12:40",
    class: "Class 3",
    subject: "Marathi",
    topic: "Story Writing",
  },
];

const syllabusProgress: SubjectProgress[] = [
  { subject: "Math", progress: 60, color: "bg-material-blue" },
  { subject: "Science", progress: 80, color: "bg-material-green" },
  { subject: "Marathi", progress: 40, color: "bg-material-orange" },
  { subject: "English", progress: 70, color: "bg-material-yellow" },
];

const weakSubjects: WeakSubject[] = [
  { subject: "Science", percentage: 45, color: "bg-red-500" },
  { subject: "English", percentage: 30, color: "bg-material-orange" },
  { subject: "EVS", percentage: 25, color: "bg-material-yellow" },
];

const todayAttendance: ClassAttendance[] = [
  { class: "Class 3", present: 21, total: 25 },
  { class: "Class 4", present: 18, total: 22 },
  { class: "Class 5", present: 24, total: 28 },
];

const weeklyAttendanceData = [
  { day: "Mon", percentage: 85 },
  { day: "Tue", percentage: 92 },
  { day: "Wed", percentage: 88 },
  { day: "Thu", percentage: 90 },
  { day: "Fri", percentage: 87 },
  { day: "Sat", percentage: 82 },
  { day: "Sun", percentage: 0 },
];

export default function TeacherDashboard() {
  const getAttendanceColor = (present: number, total: number) => {
    const percentage = (present / total) * 100;
    if (percentage >= 90) return "text-material-green";
    if (percentage >= 75) return "text-material-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-material-gray-900 mb-2">
          Teacher Dashboard
        </h1>
        <p className="text-lg text-material-gray-600">
          Good morning! Here's your overview for today.
        </p>
      </div>

      {/* Section 1: Today's Class Timetable */}
      <section className="bg-white rounded-xl border border-material-gray-200 p-6 shadow-material">
        <div className="flex items-center mb-6">
          <Clock className="h-6 w-6 text-material-blue mr-3" />
          <h2 className="text-2xl font-semibold text-material-gray-900">
            🕒 Today's Class Schedule
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-material-gray-50 rounded-lg">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-material-gray-900 rounded-l-lg">
                    🕒 Time
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-material-gray-900">
                    🏫 Class
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-material-gray-900">
                    📘 Subject
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-material-gray-900 rounded-r-lg">
                    📚 Topic
                  </th>
                </tr>
              </thead>
              <tbody>
                {todaySchedule.map((schedule, index) => (
                  <tr
                    key={index}
                    className="border-b border-material-gray-100 hover:bg-material-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-material-blue">
                      {schedule.time}
                    </td>
                    <td className="py-4 px-4 text-material-gray-700">
                      {schedule.class}
                    </td>
                    <td className="py-4 px-4 text-material-gray-700">
                      {schedule.subject}
                    </td>
                    <td className="py-4 px-4 text-material-gray-700">
                      {schedule.topic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Stacked List View */}
        <div className="md:hidden space-y-4">
          {todaySchedule.map((schedule, index) => (
            <div
              key={index}
              className="bg-material-gray-50 rounded-lg p-4 border border-material-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-material-blue text-lg">
                  {schedule.time}
                </span>
                <span className="text-material-gray-600 text-sm">
                  {schedule.class}
                </span>
              </div>
              <div className="text-material-gray-900 font-medium mb-1">
                📘 {schedule.subject}
              </div>
              <div className="text-material-gray-600 text-sm">
                📚 {schedule.topic}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Study Material Access */}
      <section className="bg-gradient-to-r from-material-blue-50 to-material-blue-100 rounded-xl border border-material-blue-200 p-8 text-center shadow-material">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-material-blue mr-3" />
          <h2 className="text-2xl font-semibold text-material-gray-900">
            📘 Class-Wise Study Material
          </h2>
        </div>
        <p className="text-material-gray-600 mb-6 text-lg">
          Access chapters, tests, and learning plates by class
        </p>
        <Link
          to="/class-material"
          className="inline-flex items-center bg-material-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-material-blue-600 transition-all duration-200 hover:scale-105 shadow-material"
        >
          <GraduationCap className="h-5 w-5 mr-2" />
          Go to Study Material
        </Link>
      </section>

      {/* Section 3: Student Insights Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Syllabus Progress */}
        <div className="bg-white rounded-xl border border-material-gray-200 p-6 shadow-material">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-material-green mr-3" />
            <h3 className="text-xl font-semibold text-material-gray-900">
              📊 Syllabus Progress
            </h3>
          </div>
          <div className="space-y-4">
            {syllabusProgress.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-material-gray-700 font-medium">
                    {item.subject}
                  </span>
                  <span className="text-material-gray-600 text-sm">
                    {item.progress}%
                  </span>
                </div>
                <div className="w-full bg-material-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Subjects */}
        <div className="bg-white rounded-xl border border-material-gray-200 p-6 shadow-material">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <h3 className="text-xl font-semibold text-material-gray-900">
              ⚠️ Weak Subjects
            </h3>
          </div>
          <div className="space-y-4">
            {weakSubjects.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${item.color} mr-3`} />
                  <span className="text-material-gray-900 font-medium">
                    {item.subject}
                  </span>
                </div>
                <span className="text-red-600 font-semibold">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Students Present Today */}
        <div className="bg-white rounded-xl border border-material-gray-200 p-6 shadow-material">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-material-orange mr-3" />
            <h3 className="text-xl font-semibold text-material-gray-900">
              👥 Students Present Today
            </h3>
          </div>
          <div className="space-y-4">
            {todayAttendance.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-material-gray-50 rounded-lg"
              >
                <span className="text-material-gray-900 font-medium">
                  {item.class}
                </span>
                <div className="flex items-center">
                  <span
                    className={`font-semibold ${getAttendanceColor(
                      item.present,
                      item.total,
                    )}`}
                  >
                    {item.present}/{item.total}
                  </span>
                  <div className="ml-2">
                    {(item.present / item.total) * 100 >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-material-green" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Weekly Attendance Trend (Hidden on mobile) */}
      <section className="hidden lg:block bg-white rounded-xl border border-material-gray-200 p-6 shadow-material">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-material-green mr-3" />
          <h2 className="text-2xl font-semibold text-material-gray-900">
            📈 Attendance Trend (Last 7 Days)
          </h2>
        </div>
        <div className="flex items-end justify-between h-40 bg-material-gray-50 rounded-lg p-4">
          {weeklyAttendanceData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-material-blue rounded-t-lg w-8 transition-all duration-500 hover:bg-material-blue-600"
                style={{
                  height: `${day.percentage > 0 ? (day.percentage / 100) * 120 : 4}px`,
                }}
              />
              <span className="text-xs text-material-gray-600 mt-2">
                {day.day}
              </span>
              <span className="text-xs text-material-gray-500">
                {day.percentage}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Voice Note */}
      <section className="bg-gradient-to-r from-material-blue-50 to-material-blue-100 rounded-xl border border-material-blue-200 p-6 shadow-material">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-material-blue rounded-full p-3 mr-4">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-material-gray-900">
                🎤 Quick Voice Note
              </h3>
              <p className="text-material-gray-600">
                Record important reminders or observations
              </p>
            </div>
          </div>
          <button className="bg-material-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-material-blue-600 transition-all duration-200 hover:scale-105 shadow-material flex items-center">
            <Mic className="h-5 w-5 mr-2" />
            Record Note
          </button>
        </div>
      </section>
    </div>
  );
}
