// src/components/checker/RecognitionPanel.tsx

import FaceDetectionComponent from "./FaceDetectionComponent";
import DocumentScannerComponent from "./DocumentScannerComponent";
import { Camera, CheckCircle, FileText } from "lucide-react";

export default function RecognitionPanel({
  appStep,
  onStartCamera,
  onFaceCapture,
  onHomeworkCapture,
  capturedFaceImage,
  onReset,
  captureResetKey
}) {
  
  const renderContent = () => {
    switch (appStep) {
      case 'FACE_SCANNING':
        return <FaceDetectionComponent onCapture={onFaceCapture} onReset={captureResetKey} />;
      
      case 'VERIFYING':
        return (
          <div className="relative w-full aspect-video">
            <img src={capturedFaceImage} alt="Recognizing face" className="w-full h-full object-cover rounded-lg filter blur-md" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-lg">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-white mb-4"></div>
              <p className="text-white text-xl font-semibold">Recognizing...</p>
            </div>
          </div>
        );

      case 'VERIFIED_SUCCESS':
        return (
          <div className="w-full aspect-video bg-green-100 rounded-lg flex flex-col items-center justify-center text-center p-4">
            <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
            <p className="text-green-800 text-2xl font-bold">Verified!</p>
          </div>
        );

      case 'SHOWING_INSTRUCTION':
        return (
          <div className="w-full aspect-video bg-blue-100 rounded-lg flex flex-col items-center justify-center text-center p-4">
            <FileText className="h-16 w-16 text-blue-600 mb-4" />
            <p className="text-blue-800 text-xl font-bold">Get Ready to Scan Your Homework</p>
            <p className="text-blue-700 mt-2">The camera will start in a few seconds...</p>
          </div>
        );

      case 'SCANNING_HOMEWORK':
        return <DocumentScannerComponent onCapture={onHomeworkCapture} />;
      
      case 'FAILED':
        return (
          <div className="w-full aspect-video bg-red-100 rounded-lg flex flex-col items-center justify-center text-center p-4">
            <p className="text-red-700 text-xl font-bold mb-4">❌ Verification Failed</p>
            <p className="text-red-600 mb-6">Could not recognize the student. Please try again.</p>
            <button onClick={onReset} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
              Try Again
            </button>
          </div>
        );

      case 'IDLE':
      default:
        return (
          <div className="w-full aspect-video bg-gray-900 rounded-lg flex flex-col items-center justify-center text-center p-4">
            <Camera className="h-16 w-16 text-gray-500 mb-4" />
            <p className="text-gray-400 mb-6">Click the button to start student verification.</p>
            <button onClick={onStartCamera} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Start Camera
            </button>
          </div>
        );
    }
  };

  return (
    <div className="p-4 bg-white border-2 border-pink-300 rounded-lg shadow-md flex-shrink-0">
      {renderContent()}
    </div>
  );
}