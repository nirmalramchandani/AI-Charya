import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  Send,
  Check,
  X,
  User,
  Bot,
  FileText,
  Scan,
} from "lucide-react";

export default function Checker() {
  const [isRecording, setIsRecording] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    subject: "",
    testType: "",
  });
  const [chatMessages, setChatMessages] = useState([
    {
      type: "assistant",
      content:
        "Hello! I'm your AI assistant. Upload homework using the camera to get started with analysis.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
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
  const fileInputRef = useRef(null);

  const handleCameraToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate analysis
      setTimeout(() => {
        setAnalysis({
          correct: ["Question 1: Correct answer", "Question 3: Good approach"],
          incorrect: [
            "Question 2: Wrong formula used",
            "Question 4: Calculation error",
          ],
          improvements: [
            "Review algebra basics",
            "Check arithmetic calculations",
          ],
          totalScore: "7/10",
        });
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { type: "user", content: newMessage },
        {
          type: "assistant",
          content:
            "I'm analyzing your request. Please upload the homework image for detailed feedback.",
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-material-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-material-gray-900 mb-2">
            Homework Checker
          </h1>
          <p className="text-material-gray-600">
            Upload homework using the camera and get AI-powered analysis and
            feedback
          </p>
        </div>

        {/* 4-Section Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Left - Camera Section */}
          <Card className="material-card bg-material-blue-50 border-material-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-material-blue" />
                Camera Section
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-material-gray-100 rounded-lg h-80 mb-4 overflow-hidden">
                {isRecording ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-material-blue-50 to-material-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                      <p className="text-material-gray-700 font-medium">
                        Recording...
                      </p>
                      <p className="text-sm text-material-gray-600">
                        Students on camera
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fcd5b7d8780cb43cba84933df3ba96784%2Fc0f7c8c0eec848afaebf8041f5431f93?format=webp&width=800"
                    alt="Student holding homework"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCameraToggle}
                  className={`w-full ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600"
                      : "material-button-primary"
                  }`}
                >
                  {isRecording ? "Stop Camera" : "Start Camera"}
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
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Homework
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Right - AI Assistant */}
          <Card className="material-card bg-material-green-50 border-material-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-material-green" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto space-y-3 max-h-[280px] mb-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-material-blue text-white"
                          : "bg-material-gray-100 text-material-gray-900"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === "assistant" && (
                          <Bot className="h-4 w-4 mt-0.5 text-material-blue" />
                        )}
                        {message.type === "user" && (
                          <User className="h-4 w-4 mt-0.5" />
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 border-t border-material-gray-200 pt-3 mt-auto">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Left - Student Details */}
          <Card className="material-card bg-material-orange-50 border-material-orange-200 h-[500px] flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-material-orange" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={studentDetails.subject}
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      subject: e.target.value,
                    })
                  }
                  placeholder="e.g., Mathematics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testType">Test Type</Label>
                <Input
                  id="testType"
                  value={studentDetails.testType}
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      testType: e.target.value,
                    })
                  }
                  placeholder="e.g., Quiz, Assignment, Exam"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input id="studentName" placeholder="Enter student name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" placeholder="e.g., 8th Grade" />
              </div>

              <div className="p-3 bg-material-gray-50 rounded-lg">
                <h4 className="font-medium text-material-gray-900 mb-2">
                  Quick Setup:
                </h4>
                <ul className="text-sm text-material-gray-600 space-y-1">
                  <li>• Fill in student details</li>
                  <li>• Use camera or upload homework</li>
                  <li>• Get instant AI analysis</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Right - Analysis */}
          <Card className="material-card bg-material-yellow-50 border-material-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-material-yellow-600" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto max-h-[500px]">
              {analysis ? (
                <div className="space-y-3">
                  {/* Header */}
                  <div className="border-b border-material-gray-200 pb-2">
                    <h3 className="text-lg font-semibold text-material-gray-900 mb-1">
                      📄 Homework Analysis
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-material-gray-600">
                        {analysis.subject}
                      </span>
                      <span className="text-material-blue font-bold text-lg">
                        {analysis.score}
                      </span>
                    </div>
                    <div className="text-xs text-material-gray-500 mt-1">
                      Submitted: {analysis.submittedOn} • Status:{" "}
                      {analysis.status}
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="bg-material-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Performance</span>
                      <span className="text-sm text-material-gray-600">
                        80%
                      </span>
                    </div>
                    <div className="w-full bg-material-gray-200 rounded-full h-2">
                      <div
                        className="bg-material-green h-2 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>

                  {/* What Went Right */}
                  <div>
                    <h4 className="font-medium text-material-green-600 mb-1 text-sm">
                      ✅ What Went Right:
                    </h4>
                    <ul className="space-y-1">
                      {analysis.correct.map((item, index) => (
                        <li
                          key={index}
                          className="text-xs text-material-gray-700 pl-3"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What Went Wrong */}
                  <div>
                    <h4 className="font-medium text-red-600 mb-1 text-sm">
                      ❌ What Went Wrong:
                    </h4>
                    <ul className="space-y-1">
                      {analysis.incorrect.map((item, index) => (
                        <li
                          key={index}
                          className="text-xs text-material-gray-700 pl-3"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h4 className="font-medium text-material-orange mb-1 text-sm">
                      🔁 Suggested Improvements:
                    </h4>
                    <ul className="space-y-1">
                      {analysis.improvements.map((item, index) => (
                        <li
                          key={index}
                          className="text-xs text-material-gray-700 pl-3"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-material-green-50 rounded">
                      <div className="text-lg font-bold text-material-green-600">
                        6
                      </div>
                      <div className="text-xs text-material-gray-600">
                        Correct
                      </div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="text-lg font-bold text-red-600">2</div>
                      <div className="text-xs text-material-gray-600">
                        Wrong
                      </div>
                    </div>
                    <div className="text-center p-2 bg-material-orange-50 rounded">
                      <div className="text-2xl font-bold text-material-orange-600">
                        2
                      </div>
                      <div className="text-xs text-material-gray-600">
                        Skipped
                      </div>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-material-green rounded-full"></div>
                      <span className="text-material-gray-700">
                        Strong in linear equations
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-material-gray-700">
                        Review quadratic formulas
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-material-orange rounded-full"></div>
                      <span className="text-material-gray-700">
                        Show more work steps
                      </span>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="flex-1 bg-material-gray-50 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-4 mb-2">
                        <div className="w-8 h-8 bg-material-green rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✗
                          </span>
                        </div>
                        <div className="w-4 h-4 bg-material-orange rounded-full"></div>
                      </div>
                      <p className="text-xs text-material-gray-500">
                        Question Performance
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 flex-1 flex flex-col justify-center">
                  <Scan className="h-12 w-12 text-material-gray-400 mx-auto mb-4" />
                  <p className="text-material-gray-600 mb-2">No analysis yet</p>
                  <p className="text-sm text-material-gray-500">
                    Upload homework to see detailed analysis and feedback
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
