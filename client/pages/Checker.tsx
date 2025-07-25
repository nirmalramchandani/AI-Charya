// src/components/checker/CheckerDashboard.tsx
import { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import StudentHeader from "@/components/checker/StudentHeader";
import RecognitionPanel from "@/components/checker/CameraStream";
import TaskDetailsPanel from "@/components/checker/TaskDetailsPanel";
import ChatBot from "@/components/checker/ChatBox";
import AnalysisPanel from "@/components/checker/AnalysisPanel";

// Helper function (remains the same)
function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid data URL");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

interface Message {
  from: 'ai' | 'user';
  text: string;
}

// FIX: Define the specific types for the application steps
export type AppStep =
  | 'IDLE'
  | 'FACE_SCANNING'
  | 'VERIFYING'
  | 'VERIFIED_SUCCESS'
  | 'SHOWING_INSTRUCTION'
  | 'INTERACTIVE_SESSION'
  | 'FAILED'
  | 'ANALYZING'
  | 'DONE';

export default function CheckerDashboard() {
  // FIX: Explicitly type the useState hook with the AppStep type
  const [appStep, setAppStep] = useState<AppStep>('IDLE');
  
  const [student, setStudent] = useState({ name: "...", roll: "..." });
  const [capturedFaceImage, setCapturedFaceImage] = useState<string | null>(null);
  const [capturedHomeworkImage, setCapturedHomeworkImage] = useState<string | null>(null);
  const [task, setTask] = useState({ subject: "Mathematics", chapter: "Algebra", mode: "Interactive", totalScored: null });
  
  const [messages, setMessages] = useState<Message[]>([
    { from: 'ai', text: 'Hello! Please position your face in the camera to get verified.' }
  ]);
  
  const [analysis, setAnalysis] = useState(null);
  const [captureResetKey, setCaptureResetKey] = useState(0);
  
  // Simple streaming state for ChatBot (no WebSocket management needed here)
  const [isStreaming, setIsStreaming] = useState(false);

  // Update streaming state based on app step
  useEffect(() => {
    if (appStep === 'INTERACTIVE_SESSION') {
      console.log('🚀 Interactive session started');
      setIsStreaming(true);
    } else {
      console.log('⏹️ Interactive session ended');
      setIsStreaming(false);
    }
  }, [appStep]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (appStep === 'VERIFIED_SUCCESS') {
      timer = setTimeout(() => setAppStep('SHOWING_INSTRUCTION'), 1000);
    } else if (appStep === 'SHOWING_INSTRUCTION') {
      timer = setTimeout(() => setAppStep('INTERACTIVE_SESSION'), 3000);
    }
    return () => clearTimeout(timer);
  }, [appStep]);

  const handleStartCamera = () => setAppStep('FACE_SCANNING');

  const handleFaceCapture = useCallback(async (imageDataUrl: string) => {
    setCapturedFaceImage(imageDataUrl);
    setAppStep('VERIFYING');

    const imageFile = dataURLtoFile(imageDataUrl, "student_face.png");
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post('/api/recognize_student/', formData);
      const studentData = response.data;

      if (studentData && studentData.name && studentData.roll_no) {
        setStudent({ name: studentData.name, roll: studentData.roll_no });
        setAppStep('VERIFIED_SUCCESS');
      } else {
        console.error("API response missing student data.");
        setAppStep('FAILED');
      }

    } catch (error: any) {
      console.error("Recognition failed:", error);
      if (error.response) {
        const errorMessage = error.response.data?.detail || "An unknown error occurred.";
        console.error("Backend error:", errorMessage);
        alert(`Recognition Failed: ${errorMessage}`);
      }
      setAppStep('FAILED');
    }
  }, []);
  
  const handleReset = useCallback(() => {
    setAnalysis(null);
    setCapturedFaceImage(null);
    setCapturedHomeworkImage(null);
    setTask(prev => ({ ...prev, totalScored: null}));
    setStudent({ name: "...", roll: "..." });
    setAppStep('IDLE');
    setCaptureResetKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <StudentHeader studentName={student.name} rollNumber={student.roll} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <RecognitionPanel 
            appStep={appStep}
            onStartCamera={handleStartCamera}
            onFaceCapture={handleFaceCapture} 
            capturedFaceImage={capturedFaceImage}
            onReset={handleReset}
            captureResetKey={captureResetKey}
            // WebSocket props removed - CameraStream now handles WebSocket directly
          />
          <TaskDetailsPanel task={task} />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-6">
          <ChatBot
            isActive={isStreaming}
            initialMessages={[]}
          />
          <AnalysisPanel 
            appStep={appStep}
            analysis={analysis}
            capturedHomeworkImage={capturedHomeworkImage}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
