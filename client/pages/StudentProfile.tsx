import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  Users,
  Heart,
  Globe,
  Edit,
  Save,
  BookOpen,
  Star,
  MapPin,
  Award,
  TrendingUp,
  AlertTriangle,
  Trophy,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface Subject {
  name: string;
  score: number;
  strength: "Strong" | "Average" | "Needs Work";
}

interface StudentData {
  id: string;
  name: string;
  age: number;
  gender: string;
  class: string;
  profilePhoto: string;
  school: string;
  subjects: Subject[];
  bestSubject: string;
  needsFocusOn: string[];
  summary: string;
  activities: string[];
  motherTongue: string;
  learningLevel: "Slow" | "Average" | "Advanced";
}

const dummyStudents: StudentData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 12,
    gender: "Female",
    class: "Class 7",
    school: "Govt. School",
    profilePhoto:
      "https://cdn.builder.io/api/v1/image/assets%2Fdf3a905663914b9689163bc99d388444%2Fa326ce4634444ae783ef9004e0f57a85?format=webp&width=800",
    subjects: [
      { name: "Mathematics", score: 92, strength: "Strong" },
      { name: "Science", score: 89, strength: "Strong" },
      { name: "English", score: 75, strength: "Average" },
      { name: "History", score: 61, strength: "Needs Work" },
      { name: "Geography", score: 58, strength: "Needs Work" },
      { name: "Hindi", score: 83, strength: "Strong" },
    ],
    bestSubject: "Mathematics",
    needsFocusOn: ["History", "Geography"],
    summary:
      "Priya is a sharp thinker, especially in Maths and Science, but needs to work on theory-based subjects.",
    activities: [
      "🏸 Badminton Team Captain",
      "📖 Participated in Science Quiz",
      "🗣️ Recitation and Storytelling Competitions",
    ],
    motherTongue: "Hindi",
    learningLevel: "Advanced",
  },
  {
    id: "2",
    name: "Arjun Patel",
    age: 12,
    gender: "Male",
    class: "Class 7",
    school: "Govt. School",
    profilePhoto:
      "https://cdn.builder.io/api/v1/image/assets%2Fdf3a905663914b9689163bc99d388444%2F560d2d0b83ac48588e7ce0e5e03a2bcc?format=webp&width=800",
    subjects: [
      { name: "English", score: 90, strength: "Strong" },
      { name: "History", score: 88, strength: "Strong" },
      { name: "Geography", score: 85, strength: "Strong" },
      { name: "Science", score: 72, strength: "Average" },
      { name: "Mathematics", score: 68, strength: "Average" },
      { name: "Hindi", score: 79, strength: "Average" },
    ],
    bestSubject: "English",
    needsFocusOn: ["Mathematics"],
    summary:
      "Arjun is a strong reader and writer. He understands concepts well in Social Studies, but needs improvement in Maths.",
    activities: [
      "⚽ Football Team Goalkeeper",
      "📝 Editor of Class Wall Magazine",
      "🎤 Debates, Plays & Morning Assembly Speaker",
    ],
    motherTongue: "Gujarati",
    learningLevel: "Average",
  },
];

export default function StudentProfile() {
  const [selectedStudent, setSelectedStudent] = useState<StudentData>(
    dummyStudents[0],
  );
  const [editMode, setEditMode] = useState(false);

  const getLearningLevelColor = (level: string) => {
    switch (level) {
      case "Slow":
        return "bg-material-orange text-white";
      case "Average":
        return "bg-material-blue text-white";
      case "Advanced":
        return "bg-material-green text-white";
      default:
        return "bg-material-gray-500 text-white";
    }
  };

  const getSubjectStrengthColor = (strength: string) => {
    switch (strength) {
      case "Strong":
        return "text-material-green-600";
      case "Average":
        return "text-material-blue-600";
      case "Needs Work":
        return "text-material-orange-600";
      default:
        return "text-material-gray-600";
    }
  };

  const getSubjectIcon = (strength: string) => {
    switch (strength) {
      case "Strong":
        return "✅";
      case "Average":
        return "☑️";
      case "Needs Work":
        return "⚠️";
      default:
        return "⭕";
    }
  };

  return (
    <div className="min-h-screen bg-material-gray-50">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-material-blue-50 to-material-green-50 border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-material-gray-900 mb-3">
            🎓 Student Profile
          </h1>
          <p className="text-lg text-material-gray-600">
            View detailed academic overview and student information
          </p>
        </div>
      </div>

      {/* Student Selector */}
      <div className="w-full bg-white shadow-sm border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-6">
          <div className="flex flex-wrap gap-3">
            {dummyStudents.map((student) => (
              <Button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                variant={
                  selectedStudent.id === student.id ? "default" : "outline"
                }
                className={`flex items-center gap-2 ${
                  selectedStudent.id === student.id
                    ? "bg-material-blue hover:bg-material-blue-600"
                    : "hover:bg-material-gray-100"
                }`}
              >
                <img
                  src={student.profilePhoto}
                  alt={student.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                {student.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-4">
              <Card className="bg-white shadow-lg sticky top-8">
                <CardContent className="p-8 text-center">
                  {/* Profile Photo */}
                  <div className="mb-6">
                    <img
                      src={selectedStudent.profilePhoto}
                      alt={selectedStudent.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-material-blue-200 shadow-lg"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-material-gray-900">
                      {selectedStudent.name}
                    </h2>
                    <p className="text-sm text-material-gray-500">
                      {selectedStudent.school}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-material-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Age: {selectedStudent.age} years</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-material-gray-600">
                        <User className="h-4 w-4" />
                        <span>{selectedStudent.gender}</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-material-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{selectedStudent.class}</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-material-gray-600">
                        <Globe className="h-4 w-4" />
                        <span>{selectedStudent.motherTongue}</span>
                      </div>
                    </div>

                    {/* Learning Level Badge */}
                    <div className="pt-4">
                      <Badge
                        className={`px-4 py-2 text-sm font-semibold ${getLearningLevelColor(
                          selectedStudent.learningLevel,
                        )}`}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        {selectedStudent.learningLevel} Learner
                      </Badge>
                    </div>

                    {/* Best Subject */}
                    <div className="pt-4 bg-material-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-material-green-800 mb-1 flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        🥇 Best Subject
                      </h4>
                      <p className="text-material-green-700 font-medium">
                        {selectedStudent.bestSubject}
                      </p>
                    </div>

                    {/* Needs Focus */}
                    {selectedStudent.needsFocusOn.length > 0 && (
                      <div className="bg-material-orange-50 rounded-lg p-4">
                        <h4 className="font-semibold text-material-orange-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          ⚠️ Needs Focus On
                        </h4>
                        <div className="space-y-1">
                          {selectedStudent.needsFocusOn.map(
                            (subject, index) => (
                              <p
                                key={index}
                                className="text-material-orange-700 text-sm"
                              >
                                {subject}
                              </p>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex gap-3 justify-center">
                    <Button
                      onClick={() => setEditMode(!editMode)}
                      className="bg-material-blue hover:bg-material-blue-600 text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {editMode ? "Cancel" : "Edit Profile"}
                    </Button>
                    {editMode && (
                      <Button
                        onClick={() => setEditMode(false)}
                        className="bg-material-green hover:bg-material-green-600 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-8 space-y-6">
              {/* Academic Overview - Table */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-blue-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-material-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      📚 Academic Overview
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-material-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-material-gray-700">
                            Subject
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-material-gray-700">
                            Score
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-material-gray-700">
                            Strength
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.subjects.map((subject, index) => (
                          <tr
                            key={index}
                            className="border-b border-material-gray-100 hover:bg-material-gray-50"
                          >
                            <td className="py-3 px-4 font-medium text-material-gray-900">
                              {subject.name}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-material-gray-800">
                                {subject.score}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`flex items-center gap-2 font-medium ${getSubjectStrengthColor(subject.strength)}`}
                              >
                                <span>{getSubjectIcon(subject.strength)}</span>
                                {subject.strength}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Performance Graphs */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-green-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-material-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      📊 Performance Charts
                    </h3>
                  </div>

                  <div className="space-y-8">
                    {/* Bar Chart */}
                    <div>
                      <h4 className="text-lg font-semibold text-material-gray-800 mb-4">
                        Subject Scores
                      </h4>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={selectedStudent.subjects.map((subject) => ({
                              ...subject,
                              fill:
                                subject.strength === "Strong"
                                  ? "#34A853"
                                  : subject.strength === "Average"
                                    ? "#4285F4"
                                    : "#FB7C00",
                            }))}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#E8EAED"
                            />
                            <XAxis
                              dataKey="name"
                              stroke="#5F6368"
                              fontSize={12}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis
                              stroke="#5F6368"
                              fontSize={12}
                              domain={[0, 100]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#F8F9FA",
                                border: "1px solid #E8EAED",
                                borderRadius: "8px",
                              }}
                            />
                            <Bar
                              dataKey="score"
                              radius={[4, 4, 0, 0]}
                              fill={(entry) => entry.fill}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Radar Chart */}
                    <div>
                      <h4 className="text-lg font-semibold text-material-gray-800 mb-4">
                        Skills Radar
                      </h4>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            data={selectedStudent.subjects}
                            margin={{
                              top: 20,
                              right: 30,
                              bottom: 20,
                              left: 30,
                            }}
                          >
                            <PolarGrid stroke="#E8EAED" />
                            <PolarAngleAxis
                              dataKey="name"
                              tick={{ fontSize: 12, fill: "#5F6368" }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, 100]}
                              tick={{ fontSize: 10, fill: "#5F6368" }}
                            />
                            <Radar
                              name={selectedStudent.name}
                              dataKey="score"
                              stroke="#4285F4"
                              fill="#4285F4"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#F8F9FA",
                                border: "1px solid #E8EAED",
                                borderRadius: "8px",
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-material-green-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-material-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      📝 Summary
                    </h3>
                  </div>
                  <p className="text-material-gray-700 leading-relaxed bg-material-gray-50 p-4 rounded-lg">
                    {selectedStudent.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Activities & Achievements */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-orange-100 rounded-lg">
                      <Award className="h-6 w-6 text-material-orange" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      ⚽ Activities
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {selectedStudent.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-material-blue-50 rounded-lg border border-material-blue-100"
                      >
                        <div className="w-2 h-2 bg-material-blue-500 rounded-full"></div>
                        <span className="text-material-gray-700 font-medium">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Assessment */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-yellow-100 rounded-lg">
                      <Star className="h-6 w-6 text-material-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      Learning Assessment
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-material-gray-700">
                      Learning Level
                    </label>
                    {editMode ? (
                      <div className="flex gap-4">
                        {["Slow", "Average", "Advanced"].map((level) => (
                          <label
                            key={level}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="learningLevel"
                              value={level}
                              defaultChecked={
                                selectedStudent.learningLevel === level
                              }
                              className="text-material-blue focus:ring-material-blue"
                            />
                            <span className="text-material-gray-700">
                              {level}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Badge
                          className={`px-4 py-2 text-sm font-semibold ${getLearningLevelColor(
                            selectedStudent.learningLevel,
                          )}`}
                        >
                          {selectedStudent.learningLevel} Learner
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Learning Progress Indicator */}
                  <div className="mt-6 p-4 bg-material-blue-50 rounded-lg border border-material-blue-200">
                    <h4 className="font-semibold text-material-blue-800 mb-2">
                      Learning Insights
                    </h4>
                    <p className="text-sm text-material-blue-700">
                      {selectedStudent.learningLevel === "Advanced" &&
                        "This student shows exceptional understanding and can handle challenging concepts. Consider providing additional enrichment activities."}
                      {selectedStudent.learningLevel === "Average" &&
                        "This student is progressing well with standard curriculum. Regular practice and reinforcement will help maintain steady growth."}
                      {selectedStudent.learningLevel === "Slow" &&
                        "This student may benefit from additional support and modified teaching approaches. Consider using visual aids and hands-on activities."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
