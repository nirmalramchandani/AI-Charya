import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, User } from "lucide-react";
import Webcam from "react-webcam";

const STATIC_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2Fcd5b7d8780cb43cba84933df3ba96784%2Fc0f7c8c0eec848afaebf8041f5431f93?format=webp&width=800";

interface CameraSectionProps {
  step: 'static' | 'camera' | 'preview' | 'verify' | 'confirmed' | 'homework_camera' | 'homework_preview' | 'homework_done';
  capturedImage: string | null;
  studentDetails: {
    subject: string;
    testType: string;
    studentName: string;
    grade: string;
    id: string;
  };
  homeworkImages: string[];
  homeworkPreview: string | null;
  verifying: boolean;
  analyzing: boolean;
  onStartCamera: () => void;
  onTakePhoto: () => void;
  onRetakePhoto: () => void;
  onVerify: () => void;
  onConfirmStudent: () => void;
  onTakeHomeworkPhoto: () => void;
  onRetakeHomework: () => void;
  onAddMoreHomework: () => void;
  onAnalyzeHomework: () => void;
  onAddMoreHomeworkFromDone: () => void;
  onStudentDetailChange: (field: string, value: string) => void;
}

export default function CameraSection({
  step,
  capturedImage,
  studentDetails,
  homeworkImages,
  homeworkPreview,
  verifying,
  analyzing,
  onStartCamera,
  onTakePhoto,
  onRetakePhoto,
  onVerify,
  onConfirmStudent,
  onTakeHomeworkPhoto,
  onRetakeHomework,
  onAddMoreHomework,
  onAnalyzeHomework,
  onAddMoreHomeworkFromDone,
  onStudentDetailChange,
}: CameraSectionProps) {
  const webcamRef = useRef<Webcam>(null);

  const handleTakePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onTakePhoto();
      }
    }
  };

  const handleTakeHomeworkPhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onTakeHomeworkPhoto();
      }
    }
  };

  // Camera section content
  let cameraSectionContent = null;
  if (step === 'static') {
    cameraSectionContent = (
      <>
        <img
          src={STATIC_IMAGE}
          alt="Student holding homework"
          className="w-full h-full object-cover"
        />
        <Button onClick={onStartCamera} className="w-full mt-4">
          <Camera className="h-5 w-5 mr-2" /> Start Camera
        </Button>
      </>
    );
  } else if (step === 'camera') {
    cameraSectionContent = (
      <>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full rounded border"
          videoConstraints={{ width: 640, height: 480 }}
        />
        <Button onClick={handleTakePhoto} className="w-full mt-4">
          <Camera className="h-5 w-5 mr-2" /> Take Photo
        </Button>
      </>
    );
  } else if (step === 'preview') {
    cameraSectionContent = (
      <>
        <img
          src={capturedImage!}
          alt="Captured"
          className="w-full h-full object-cover rounded border"
        />
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={onRetakePhoto} className="w-1/2">Retake</Button>
          <Button onClick={onVerify} className="w-1/2 bg-indigo-600 text-white" disabled={verifying}>
            {verifying ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
      </>
    );
  } else if (step === 'verify') {
    cameraSectionContent = (
      <>
        <img
          src={capturedImage!}
          alt="Student"
          className="w-full h-full object-cover rounded border"
        />
        <div className="mt-4 text-center">
          <div className="font-semibold text-lg">{studentDetails.studentName || '-'}</div>
          <div className="text-sm text-gray-600">Grade: {studentDetails.grade || '-'}</div>
          <div className="text-sm text-gray-600">ID: {studentDetails.id || '-'}</div>
        </div>
        <Button onClick={onConfirmStudent} className="w-full mt-4 bg-green-600 text-white">Confirm</Button>
      </>
    );
  } else if (step === 'homework_camera') {
    cameraSectionContent = (
      <>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full rounded border"
          videoConstraints={{ width: 640, height: 480 }}
        />
        <Button onClick={handleTakeHomeworkPhoto} className="w-full mt-4">
          <Camera className="h-5 w-5 mr-2" /> Take Homework Photo
        </Button>
      </>
    );
  } else if (step === 'homework_preview') {
    cameraSectionContent = (
      <>
        <img
          src={homeworkPreview!}
          alt="Homework Preview"
          className="w-full h-full object-cover rounded border"
        />
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={onRetakeHomework} className="w-1/3">Retake</Button>
          <Button variant="outline" onClick={onAddMoreHomework} className="w-1/3">Add More</Button>
          <Button onClick={onAnalyzeHomework} className="w-1/3 bg-blue-600 text-white" disabled={analyzing}>
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
      </>
    );
  } else if (step === 'homework_done') {
    cameraSectionContent = (
      <>
        <div className="text-center text-green-700 font-semibold">Homework analysis complete. See below.</div>
        <Button onClick={onAddMoreHomeworkFromDone} className="w-full mt-4">Add More Homework</Button>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <div className="relative bg-white rounded-xl h-80 mb-6 overflow-hidden shadow-inner flex items-center justify-center">
            <div className="w-full h-full">{cameraSectionContent}</div>
          </div>
          {/* Optionally, show thumbnails of homework images */}
          {step.startsWith('homework') && homeworkImages.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {homeworkImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Homework ${idx + 1}`} className="w-16 h-16 object-cover rounded border" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Details Section */}
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
              <Label htmlFor="subject" className="text-material-gray-700 font-medium">Subject</Label>
              <Input
                id="subject"
                value={studentDetails.subject}
                onChange={(e) => onStudentDetailChange('subject', e.target.value)}
                placeholder="e.g., Mathematics"
                className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testType" className="text-material-gray-700 font-medium">Test Type</Label>
              <Input
                id="testType"
                value={studentDetails.testType}
                onChange={(e) => onStudentDetailChange('testType', e.target.value)}
                placeholder="e.g., Quiz, Assignment, Exam"
                className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentName" className="text-material-gray-700 font-medium">Student Name</Label>
              <Input
                id="studentName"
                value={studentDetails.studentName}
                onChange={(e) => onStudentDetailChange('studentName', e.target.value)}
                placeholder="Enter student name"
                className="border-2 border-material-gray-300 focus:border-material-orange focus:ring-material-orange rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade" className="text-material-gray-700 font-medium">Grade</Label>
              <Input
                id="grade"
                value={studentDetails.grade}
                onChange={(e) => onStudentDetailChange('grade', e.target.value)}
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
                Use camera to capture student and homework
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
  );
}