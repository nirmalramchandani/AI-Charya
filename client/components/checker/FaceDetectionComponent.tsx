// src/components/checker/FaceDetectionComponent.tsx

import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { FaceDetection } from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const TARGET_ZONE = { x: 0.2, y: 0.05, width: 0.6, height: 0.9 };
const roundedRectLoaderCss = `
.loader-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 10;
}
.rect-guide, .rect-progress {
  fill: transparent; stroke-width: 2; stroke-linecap: round;
}
.rect-guide {
  stroke: rgba(255, 255, 255, 0.5); stroke-dasharray: 4 6;
}
.rect-progress {
  stroke: #00ffff; stroke-dasharray: 1632; stroke-dashoffset: 1632;
}
.loader-container.active .rect-progress {
  animation: fill-rect 5s linear forwards;
}
@keyframes fill-rect { to { stroke-dashoffset: 0; } }
`;

export default function FaceDetectionComponent({ onCapture, onReset }) {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const faceDetectionRef = useRef<FaceDetection | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const boundingBoxRef = useRef(null);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const isTimerActiveRef = useRef(false);

  useEffect(() => {
    setIsTimerActive(false);
    isTimerActiveRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [onReset]);

  useEffect(() => {
    faceDetectionRef.current = new FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });
    faceDetectionRef.current.setOptions({ model: "short", minDetectionConfidence: 0.7 });
    
    return () => {
      faceDetectionRef.current?.close();
      cameraRef.current?.stop();
    };
  }, []);

  const handleUserMedia = () => {
    const video = webcamRef.current?.video;
    const faceDetection = faceDetectionRef.current;
    if (!video || !faceDetection) return;

    faceDetection.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      
      let bothEyesInZone = false;
      if (results.detections.length > 0) {
        const detection = results.detections[0];
        // MODIFIED: Changed keypoints to landmarks
        const landmarks = detection.landmarks;
        if (landmarks.length >= 2) {
          const leftEye = landmarks[0];
          const rightEye = landmarks[1];
          
          const isPointInZone = (point) => {
            return (
              point.x > TARGET_ZONE.x && point.x < TARGET_ZONE.x + TARGET_ZONE.width &&
              point.y > TARGET_ZONE.y && point.y < TARGET_ZONE.y + TARGET_ZONE.height
            );
          };

          if (isPointInZone(leftEye) && isPointInZone(rightEye)) {
            bothEyesInZone = true;
            boundingBoxRef.current = detection.boundingBox;
          }
        }
      }
      
      if (bothEyesInZone && !isTimerActiveRef.current) {
        setIsTimerActive(true);
        isTimerActiveRef.current = true;
        timerRef.current = setTimeout(() => {
          const fullImageSrc = webcamRef.current?.getScreenshot();
          if (fullImageSrc && boundingBoxRef.current) {
            const image = new Image();
            image.onload = () => {
              const bbox = boundingBoxRef.current;
              const cropCanvas = document.createElement("canvas");
              const cropCtx = cropCanvas.getContext("2d");

              const cropWidth = bbox.width * image.width;
              const cropHeight = bbox.height * image.height;
              const cropX = (bbox.xCenter * image.width) - (cropWidth / 2);
              const cropY = (bbox.yCenter * image.height) - (cropHeight / 2);

              cropCanvas.width = cropWidth;
              cropCanvas.height = cropHeight;

              cropCtx.drawImage(
                image,
                cropX, cropY, cropWidth, cropHeight,
                0, 0, cropWidth, cropHeight
              );

              const croppedImageSrc = cropCanvas.toDataURL("image/png");
              onCapture(croppedImageSrc);
            };
            image.src = fullImageSrc;
          }
          
          timerRef.current = null;
          setIsTimerActive(false);
          isTimerActiveRef.current = false;
        }, 5000);
      } else if (!bothEyesInZone && timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        setIsTimerActive(false);
        isTimerActiveRef.current = false;
      }
    });

    cameraRef.current = new Camera(video, {
      onFrame: async () => await faceDetection.send({ image: video }),
      width: 640,
      height: 480,
    });
    cameraRef.current.start();
  };
  
  const canvasWidth = 640;
  const canvasHeight = 480;
  const x = TARGET_ZONE.x * canvasWidth;
  const y = TARGET_ZONE.y * canvasHeight;
  const width = TARGET_ZONE.width * canvasWidth;
  const height = TARGET_ZONE.height * canvasHeight;
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-inner">
      <style>{roundedRectLoaderCss}</style>
      <div className={`loader-container ${isTimerActive ? "active" : ""}`}>
        <svg width="100%" height="100%" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          <rect className="rect-guide" x={x} y={y} width={width} height={height} rx="30" />
          <rect className="rect-progress" x={x} y={y} width={width} height={height} rx="30" />
        </svg>
      </div>
      <Webcam
        ref={webcamRef}
        audio={false}
        onUserMedia={handleUserMedia}
        style={{ position: 'absolute', visibility: 'hidden' }}
        screenshotFormat="image/png"
        videoConstraints={{ width: canvasWidth, height: canvasHeight }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}