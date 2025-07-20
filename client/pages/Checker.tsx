// src/components/checker/CheckerDashboard.tsx

import { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import StudentHeader from "@/components/checker/StudentHeader";
import RecognitionPanel from "@/components/checker/CameraPanel";
import TaskDetailsPanel from "@/components/checker/TaskDetailsPanel";
import ChatbotPanel from "@/components/checker/ChatbotPanel";
import AnalysisPanel from "@/components/checker/AnalysisPanel";

// Helper function to convert base64 data URL to a File object
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default function CheckerDashboard() {
  const [appStep, setAppStep] = useState('IDLE');
  const [student, setStudent] = useState({ name: "...", roll: "..." });
  const [capturedFaceImage, setCapturedFaceImage] = useState(null);
  const [capturedHomeworkImage, setCapturedHomeworkImage] = useState(null);
  const [task, setTask] = useState({ subject: "Mathematics", chapter: "Algebra", mode: "Homework", totalScored: null });
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Your 5th question is wrong?' }]);
  const [analysis, setAnalysis] = useState(null);
  const [captureResetKey, setCaptureResetKey] = useState(0);

  useEffect(() => {
    let timer;
    if (appStep === 'VERIFIED_SUCCESS') {
      timer = setTimeout(() => setAppStep('SHOWING_INSTRUCTION'), 1000);
    } else if (appStep === 'SHOWING_INSTRUCTION') {
      timer = setTimeout(() => setAppStep('SCANNING_HOMEWORK'), 3000);
    }
    return () => clearTimeout(timer);
  }, [appStep]);

  const handleStartCamera = () => setAppStep('FACE_SCANNING');

  // MODIFIED: Simplified to handle the direct response from the backend
  const handleFaceCapture = useCallback(async (imageDataUrl) => {
    setCapturedFaceImage(imageDataUrl);
    setAppStep('VERIFYING');

    const imageFile = dataURLtoFile(imageDataUrl, "student_face.png");
    const formData = new FormData();
    formData.append('image', imageFile); // The key is 'image'

    try {
      const response = await axios.post('/api/recognize_student/', formData);
      
      // The backend now directly returns the student's name and roll_no
      const studentData = response.data;

      if (studentData && studentData.name && studentData.roll_no) {
        setStudent({ name: studentData.name, roll: studentData.roll_no });
        setAppStep('VERIFIED_SUCCESS');
      } else {
        // This case handles unexpected successful responses that don't have the data
        console.error("API response missing student data.");
        setAppStep('FAILED');
      }

    } catch (error) {
      console.error("Recognition failed:", error);
      if (error.response) {
        // The backend now sends a 404 with a detail message if not found
        const errorMessage = error.response.data?.detail || "An unknown error occurred.";
        console.error("Backend error:", errorMessage);
        alert(`Recognition Failed: ${errorMessage}`);
      }
      setAppStep('FAILED');
    }
  }, []);
  
  const handleHomeworkCapture = useCallback((imageDataUrl) => {
    setCapturedHomeworkImage(imageDataUrl);
    setAppStep('ANALYZING');
    // This can be replaced with a real API call to analyze homework
    setTimeout(() => {
      const results = { total: 12, max: 20 };
      setAnalysis(results);
      setTask(prev => ({ ...prev, totalScored: `${results.total}/${results.max}`}));
      setAppStep('DONE');
    }, 3000);
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
            onHomeworkCapture={handleHomeworkCapture}
            capturedFaceImage={capturedFaceImage}
            onReset={handleReset}
            captureResetKey={captureResetKey} 
          />
          <TaskDetailsPanel task={task} />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-6">
          <ChatbotPanel initialMessages={messages} />
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