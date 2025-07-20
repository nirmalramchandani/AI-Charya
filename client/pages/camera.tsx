// src/components/checker/CheckerDashboard.js

import { useState, useCallback, useEffect } from "react";
import StudentHeader from "@/components/checker/StudentHeader";
import RecognitionPanel from "@/components/checker/CameraPanel";
import TaskDetailsPanel from "@/components/checker/TaskDetailsPanel";
import ChatbotPanel from "@/components/checker/ChatbotPanel";
import AnalysisPanel from "@/components/checker/AnalysisPanel";

export default function CheckerDashboard() {
  const [appStep, setAppStep] = useState('IDLE'); // IDLE, FACE_SCANNING, VERIFYING, VERIFIED_SUCCESS, SHOWING_INSTRUCTION, SCANNING_HOMEWORK, ANALYZING, DONE
  
  const [student, setStudent] = useState({ name: "...", roll: "..." });
  const [capturedFaceImage, setCapturedFaceImage] = useState(null);
  const [capturedHomeworkImage, setCapturedHomeworkImage] = useState(null);
  const [task, setTask] = useState({ subject: "Mathematics", chapter: "Algebra", mode: "Homework", totalScored: null });
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Your 5th question is wrong?' }]);
  const [analysis, setAnalysis] = useState(null);
  const [captureResetKey, setCaptureResetKey] = useState(0);

  // This effect handles the timed transitions after verification
  useEffect(() => {
    let timer;
    if (appStep === 'VERIFIED_SUCCESS') {
      // After 3 seconds, move to showing instructions
      timer = setTimeout(() => {
        setAppStep('SHOWING_INSTRUCTION');
      }, 1000);
    } else if (appStep === 'SHOWING_INSTRUCTION') {
      // After 4 seconds, start the document scanner
      timer = setTimeout(() => {
        setAppStep('SCANNING_HOMEWORK');
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup timer on component unmount or state change
  }, [appStep]);

  const handleStartCamera = () => setAppStep('FACE_SCANNING');

  const handleFaceCapture = useCallback((imageDataUrl) => {
    setCapturedFaceImage(imageDataUrl);
    setAppStep('VERIFYING');
    
    setTimeout(() => {
        setStudent({ name: "Nawaz Sayyad", roll: "33363" });
        setAppStep('VERIFIED_SUCCESS'); // Start the timed transition flow
    }, 2000);
  }, []);
  
  const handleHomeworkCapture = useCallback((imageDataUrl) => {
    setCapturedHomeworkImage(imageDataUrl);
    setAppStep('ANALYZING');
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