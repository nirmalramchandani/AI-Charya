import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, User, Scan } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Checker() {
  const [isRecording, setIsRecording] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    subject: "",
    testType: "",
    studentName: "",
    grade: "",
  });
  const [analysis, setAnalysis] = useState({
    subject: "Mathematics – Algebra",
    submittedOn: "July 9, 2025, 5:32 PM",
    status: "Submitted",
    score: "8/10",
    correct: [
      "Correctly solved all linear equation problems",
      "Clear and organized steps for each question",
      "Proper use of mathematical notations",
    ],
    incorrect: [
      "Question 4: Used the incorrect formula for factoring quadratics",
      "Skipped explanation for the final answer in Question 6",
    ],
    improvements: [
      "Review the quadratic formula and its applications",
      "Make sure to include reasoning or justifications for each answer",
      "Double-check each step to avoid minor calculation errors",
    ],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate analysis
      setTimeout(() => {
        setAnalysis({
          ...analysis,
          correct: ["Question 1: Correct answer", "Question 3: Good approach"],
          incorrect: [
            "Question 2: Wrong formula used",
            "Question 4: Calculation error",
          ],
          improvements: [
            "Review algebra basics",
            "Check arithmetic calculations",
          ],
        });
      }, 2000);
    }
  };

  const handleStudentDetailChange = (field: string, value: string) => {
    setStudentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 min-h-screen bg-material-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-material-gray-900 mb-2">
            Homework Checker
          </h1>
          <p className="text-lg text-material-gray-600">
            Upload homework using the camera and get AI-powered analysis and
            feedback
          </p>
        </div>

        {/* Top Section - Camera and Student Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Camera Section */}
          <Card className="material-card bg-gradient-to-br from-material-blue-50 to-material-blue-100 border-material-blue-200 shadow-material-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-material-blue rounded-lg">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl">Camera Section</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-white rounded-xl h-80 mb-6 overflow-hidden shadow-inner">
                {isRecording ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 animate-pulse flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <p className="text-red-700 font-semibold text-lg">
                        Recording...
                      </p>
                      <p className="text-red-600">Point camera at homework</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fcd5b7d8780cb43cba84933df3ba96784%2Fc0f7c8c0eec848afaebf8041f5431f93?format=webp&width=800"
                    alt="Student holding homework"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleCameraToggle}
                  className={cn(
                    "w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105",
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      : "bg-material-blue hover:bg-material-blue-600 text-white shadow-lg",
                  )}
                >
                  {isRecording ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      Stop Recording
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Camera className="h-5 w-5" />
                      Start Camera
                    </div>
                  )}
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold rounded-xl border-2 border-material-blue text-material-blue hover:bg-material-blue hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Homework
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Student Details */}
          <Card className="material-card bg-gradient-to-br from-material-orange-50 to-material-orange-100 border-material-orange-200 shadow-material-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-material-orange rounded-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl">Student Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-material-gray-700 font-medium"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={studentDetails.subject}
                    onChange={(e) =>
                      handleStudentDetailChange("subject", e.target.value)
                    }
                    placeholder="e.g., Mathematics"
                    className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="testType"
                    className="text-material-gray-700 font-medium"
                  >
                    Test Type
                  </Label>
                  <Input
                    id="testType"
                    value={studentDetails.testType}
                    onChange={(e) =>
                      handleStudentDetailChange("testType", e.target.value)
                    }
                    placeholder="e.g., Quiz, Assignment, Exam"
                    className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="studentName"
                    className="text-material-gray-700 font-medium"
                  >
                    Student Name
                  </Label>
                  <Input
                    id="studentName"
                    value={studentDetails.studentName}
                    onChange={(e) =>
                      handleStudentDetailChange("studentName", e.target.value)
                    }
                    placeholder="Enter student name"
                    className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="grade"
                    className="text-material-gray-700 font-medium"
                  >
                    Grade
                  </Label>
                  <Input
                    id="grade"
                    value={studentDetails.grade}
                    onChange={(e) =>
                      handleStudentDetailChange("grade", e.target.value)
                    }
                    placeholder="e.g., 8th Grade"
                    className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-material-orange-200 shadow-sm">
                <h4 className="font-semibold text-material-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-material-orange rounded-full"></div>
                  Quick Setup Guide:
                </h4>
                <ul className="text-sm text-material-gray-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-material-blue rounded-full"></span>
                    Fill in student details above
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-material-green rounded-full"></span>
                    Use camera or upload homework
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-material-yellow rounded-full"></span>
                    Get instant AI analysis below
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results Section - Moved Down */}
        <Card className="material-card bg-gradient-to-br from-material-yellow-50 to-material-green-50 border-material-yellow-200 shadow-material-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-material-yellow to-material-green rounded-lg">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl">📊 Analysis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {analysis ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl p-4 border border-material-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-material-gray-900">
                      📄 {analysis.subject}
                    </h3>
                    <div className="text-3xl font-bold text-material-blue">
                      {analysis.score}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-material-gray-600">
                    <span>Submitted: {analysis.submittedOn}</span>
                    <span className="bg-material-green-100 text-material-green-800 px-3 py-1 rounded-full font-medium">
                      {analysis.status}
                    </span>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="bg-white rounded-xl p-4 border border-material-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-material-gray-900">
                      Overall Performance
                    </span>
                    <span className="text-lg font-bold text-material-green-600">
                      80%
                    </span>
                  </div>
                  <div className="w-full bg-material-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-material-green to-material-blue h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* What Went Right */}
                  <div className="bg-white rounded-xl p-5 border border-material-green-200 shadow-sm">
                    <h4 className="font-bold text-material-green-700 mb-4 text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-material-green rounded-full"></div>
                      ✅ Correct Answers
                    </h4>
                    <ul className="space-y-3">
                      {analysis.correct.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-material-gray-700 pl-4 border-l-2 border-material-green-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What Went Wrong */}
                  <div className="bg-white rounded-xl p-5 border border-red-200 shadow-sm">
                    <h4 className="font-bold text-red-700 mb-4 text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>❌
                      Areas to Fix
                    </h4>
                    <ul className="space-y-3">
                      {analysis.incorrect.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-material-gray-700 pl-4 border-l-2 border-red-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="bg-white rounded-xl p-5 border border-material-orange-200 shadow-sm">
                    <h4 className="font-bold text-material-orange-700 mb-4 text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-material-orange rounded-full"></div>
                      🔁 Suggestions
                    </h4>
                    <ul className="space-y-3">
                      {analysis.improvements.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-material-gray-700 pl-4 border-l-2 border-material-orange-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-material-green-200 shadow-sm">
                    <div className="text-3xl font-bold text-material-green-600 mb-1">
                      6
                    </div>
                    <div className="text-sm font-medium text-material-gray-600">
                      Correct
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      2
                    </div>
                    <div className="text-sm font-medium text-material-gray-600">
                      Wrong
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-material-orange-200 shadow-sm">
                    <div className="text-3xl font-bold text-material-orange-600 mb-1">
                      2
                    </div>
                    <div className="text-sm font-medium text-material-gray-600">
                      Skipped
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-material-gray-200">
                <Scan className="h-16 w-16 text-material-gray-400 mx-auto mb-4" />
                <p className="text-xl text-material-gray-600 mb-2">
                  No analysis yet
                </p>
                <p className="text-material-gray-500">
                  Upload homework using the camera or file upload to see
                  detailed analysis and feedback
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
