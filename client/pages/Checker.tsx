// FaceDetectionComponent.tsx
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { FaceDetection } from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const FaceDetectionComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short", // or "full" for better accuracy
      minDetectionConfidence: 0.6,
    });

    faceDetection.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas || !webcamRef.current?.video) return;

      canvas.width = webcamRef.current.video.videoWidth;
      canvas.height = webcamRef.current.video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.detections.length > 0) {
        results.detections.forEach((detection) => {
          const { xCenter, yCenter, width, height } = detection.boundingBox;
          const boxX = (xCenter - width / 2) * canvas.width;
          const boxY = (yCenter - height / 2) * canvas.height;
          const boxWidth = width * canvas.width;
          const boxHeight = height * canvas.height;

          ctx.strokeStyle = "lime";
          ctx.lineWidth = 3;
          ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        });
      }
    });

    if (webcamRef.current && webcamRef.current.video) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceDetection.send({ image: webcamRef.current!.video! });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div style={{ position: "relative", width: 640, height: 480 }}>
      <Webcam
        ref={webcamRef}
        style={{ visibility: "hidden", width: 640, height: 480 }}
        videoConstraints={{ width: 640, height: 480 }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default FaceDetectionComponent;
