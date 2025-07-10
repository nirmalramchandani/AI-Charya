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
  const [analysis, setAnalysis] = useState(null);
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
              <div className="relative bg-material-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden">
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
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-material-gray-400 mx-auto mb-2" />
                    <p className="text-material-gray-600">Camera off</p>
                  </div>
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
            <CardContent className="flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
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

              <div className="flex gap-2">
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
          <Card className="material-card bg-material-orange-50 border-material-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-material-orange" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="mt-6 p-4 bg-material-gray-50 rounded-lg">
                <h4 className="font-medium text-material-gray-900 mb-2">
                  To get started:
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
          <Card className="material-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-material-blue" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="space-y-4">
                  {/* What is right */}
                  <div>
                    <h4 className="font-medium text-material-green-600 mb-2 flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      What is right ✓
                    </h4>
                    <ul className="space-y-1">
                      {analysis.correct.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-material-gray-700 pl-4"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What is wrong */}
                  <div>
                    <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                      <X className="h-4 w-4" />
                      What is wrong ✗
                    </h4>
                    <ul className="space-y-1">
                      {analysis.incorrect.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-material-gray-700 pl-4"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corrections/Improvements */}
                  <div>
                    <h4 className="font-medium text-material-orange mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Corrections & Improvements
                    </h4>
                    <ul className="space-y-1">
                      {analysis.improvements.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-material-gray-700 pl-4"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Total Score */}
                  <div className="mt-4 p-3 bg-material-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-material-gray-900">
                        Total Score:
                      </span>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {analysis.totalScore}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
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
