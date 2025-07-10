import { useState } from "react";
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
} from "lucide-react";

interface StudentData {
  id: string;
  name: string;
  age: number;
  gender: string;
  class: string;
  profilePhoto: string;
  familyOccupation: string;
  hobbies: string[];
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
    profilePhoto:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=faces",
    familyOccupation: "Father: Teacher, Mother: Nurse",
    hobbies: ["Reading", "Drawing", "Cricket"],
    motherTongue: "Marathi",
    learningLevel: "Average",
  },
  {
    id: "2",
    name: "Arjun Patel",
    age: 10,
    gender: "Male",
    class: "Class 5",
    profilePhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    familyOccupation: "Father: Farmer, Mother: Homemaker",
    hobbies: ["Football", "Mathematics", "Science"],
    motherTongue: "Gujarati",
    learningLevel: "Advanced",
  },
  {
    id: "3",
    name: "Sneha Desai",
    age: 8,
    gender: "Female",
    class: "Class 3",
    profilePhoto:
      "https://images.unsplash.com/photo-1518871608619-455162693ba5?w=200&h=200&fit=crop&crop=faces",
    familyOccupation: "Father: Shopkeeper, Mother: Tailor",
    hobbies: ["Dancing", "Singing", "Playing"],
    motherTongue: "Hindi",
    learningLevel: "Slow",
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

  return (
    <div className="min-h-screen bg-material-gray-50">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-material-blue-50 to-material-green-50 border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-material-gray-900 mb-3">
            Student Profile
          </h1>
          <p className="text-lg text-material-gray-600">
            View and manage detailed student information
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
              {/* Background Information */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-material-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      Background Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Family Occupation */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-material-gray-700 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Family Occupation
                      </label>
                      {editMode ? (
                        <textarea
                          defaultValue={selectedStudent.familyOccupation}
                          className="w-full p-3 border border-material-gray-300 rounded-lg focus:ring-2 focus:ring-material-blue focus:border-transparent"
                          rows={3}
                        />
                      ) : (
                        <p className="text-material-gray-600 bg-material-gray-50 p-3 rounded-lg">
                          {selectedStudent.familyOccupation}
                        </p>
                      )}
                    </div>

                    {/* Mother Tongue */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-material-gray-700 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Mother Tongue
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          defaultValue={selectedStudent.motherTongue}
                          className="w-full p-3 border border-material-gray-300 rounded-lg focus:ring-2 focus:ring-material-blue focus:border-transparent"
                        />
                      ) : (
                        <p className="text-material-gray-600 bg-material-gray-50 p-3 rounded-lg">
                          {selectedStudent.motherTongue}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hobbies & Interests */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-green-100 rounded-lg">
                      <Heart className="h-6 w-6 text-material-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-material-gray-900">
                      Hobbies & Interests
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {editMode ? (
                      <div>
                        <label className="text-sm font-medium text-material-gray-700 mb-2 block">
                          Add or remove hobbies (comma separated)
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedStudent.hobbies.join(", ")}
                          className="w-full p-3 border border-material-gray-300 rounded-lg focus:ring-2 focus:ring-material-blue focus:border-transparent"
                          placeholder="Reading, Drawing, Sports..."
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {selectedStudent.hobbies.map((hobby, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="px-4 py-2 text-sm bg-material-green-50 text-material-green-700 border-material-green-200"
                          >
                            {hobby}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Assessment */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-material-orange-100 rounded-lg">
                      <Star className="h-6 w-6 text-material-orange" />
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
