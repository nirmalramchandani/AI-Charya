import React, { useState, useEffect, useRef } from 'react';

// Define a type for corner points for better type safety
interface Point {
  x: number;
  y: number;
}

// Basic styling for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '640px',
    height: '480px',
    margin: '20px auto',
    border: '2px solid black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  resultImage: {
    maxWidth: '100%',
    marginTop: '20px',
    border: '1px solid #ccc',
  },
};

const DocumentScanner: React.FC = () => {
  const [cvReady, setCvReady] = useState<boolean>(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cornersRef = useRef<Point[] | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Load OpenCV script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.9.0/opencv.js';
    script.async = true;
    script.onload = () => {
      if (window.cv) {
        setCvReady(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Start camera and processing
  useEffect(() => {
    if (!cvReady || scannedImage) return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'environment',
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play();
              processFrame();
            }
          };
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    // Replace the existing processFrame function with this improved version
const processFrame = () => {
  if (!videoRef.current || !canvasRef.current || videoRef.current.paused || videoRef.current.ended) {
    return;
  }

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;

  tempCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  let src = window.cv.imread(tempCanvas);
  let gray = new window.cv.Mat();
  window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);
  
  // -- START OF IMPROVED PIPELINE --

  // 1. Apply a blur to reduce noise
  let blurred = new window.cv.Mat();
  window.cv.GaussianBlur(gray, blurred, new window.cv.Size(5, 5), 0);

  // 2. Use adaptive thresholding instead of Canny
  let thresh = new window.cv.Mat();
  window.cv.adaptiveThreshold(
    blurred,        // Input image
    thresh,         // Output image
    255,            // Max value to be given to a pixel
    window.cv.ADAPTIVE_THRESH_GAUSSIAN_C, // Method
    window.cv.THRESH_BINARY_INV, // Type of thresholding
    11,             // Block size (must be an odd number)
    2               // Constant C subtracted from the mean
  );
  
  // -- END OF IMPROVED PIPELINE --

  let contours = new window.cv.MatVector();
  let hierarchy = new window.cv.Mat();
  // Find contours on the thresholded image
  window.cv.findContours(thresh, contours, hierarchy, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);

  let largestContour = null;
  let maxArea = 0;
  for (let i = 0; i < contours.size(); ++i) {
    let cnt = contours.get(i);
    let area = window.cv.contourArea(cnt);
    if (area > 2000) { // Increased minimum area to filter out more noise
      let peri = window.cv.arcLength(cnt, true);
      let approx = new window.cv.Mat();
      window.cv.approxPolyDP(cnt, approx, 0.02 * peri, true);
      if (approx.rows === 4 && area > maxArea) {
        maxArea = area;
        largestContour = approx;
      } else {
        approx.delete();
      }
    }
    cnt.delete();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (largestContour) {
    cornersRef.current = [
      { x: largestContour.data32S[0], y: largestContour.data32S[1] },
      { x: largestContour.data32S[2], y: largestContour.data32S[3] },
      { x: largestContour.data32S[4], y: largestContour.data32S[5] },
      { x: largestContour.data32S[6], y: largestContour.data32S[7] },
    ];
    // Draw the bounding box... (rest of the logic is the same)
    ctx.beginPath();
    ctx.moveTo(cornersRef.current[0].x, cornersRef.current[0].y);
    for (let i = 1; i < 4; i++) {
      ctx.lineTo(cornersRef.current[i].x, cornersRef.current[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 3;
    ctx.stroke();
    largestContour.delete();
  } else {
    cornersRef.current = null;
  }

  // Memory cleanup
  src.delete();
  gray.delete();
  blurred.delete();
  thresh.delete();
  contours.delete();
  hierarchy.delete();

  animationFrameId.current = requestAnimationFrame(processFrame);
};

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cvReady, scannedImage]);

  const handleCapture = () => {
    if (!cornersRef.current || !videoRef.current) {
      alert("No document detected. Please try again.");
      return;
    }

    const video = videoRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    tempCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    let src = window.cv.imread(tempCanvas);
    
    const sortedCorners = [...cornersRef.current].sort((a, b) => a.y - b.y);
    const topCorners = sortedCorners.slice(0, 2).sort((a, b) => a.x - b.x);
    const bottomCorners = sortedCorners.slice(2).sort((a, b) => a.x - b.x);
    const finalCorners: Point[] = [...topCorners, bottomCorners[1], bottomCorners[0]];

    const [tl, tr, br, bl] = finalCorners;
    
    const widthA = Math.hypot(br.x - bl.x, br.y - bl.y);
    const widthB = Math.hypot(tr.x - tl.x, tr.y - tl.y);
    const maxWidth = Math.max(widthA, widthB);

    const heightA = Math.hypot(tr.x - br.x, tr.y - br.y);
    const heightB = Math.hypot(tl.x - bl.x, tl.y - bl.y);
    const maxHeight = Math.max(heightA, heightB);

    const dsize = new window.cv.Size(maxWidth, maxHeight);
    const srcTri = window.cv.matFromArray(4, 1, window.cv.CV_32FC2, [tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y]);
    const dstTri = window.cv.matFromArray(4, 1, window.cv.CV_32FC2, [0, 0, maxWidth, 0, maxWidth, maxHeight, 0, maxHeight]);

    let M = window.cv.getPerspectiveTransform(srcTri, dstTri);
    let warped = new window.cv.Mat();
    window.cv.warpPerspective(src, warped, M, dsize, window.cv.INTER_LINEAR, window.cv.BORDER_CONSTANT, new window.cv.Scalar());

    const resultCanvas = document.createElement('canvas');
    window.cv.imshow(resultCanvas, warped);
    setScannedImage(resultCanvas.toDataURL('image/jpeg'));

    src.delete(); M.delete(); warped.delete(); srcTri.delete(); dstTri.delete();
  };

  const resetScanner = () => {
    setScannedImage(null);
  };

  return (
    <div>
      <h3>Web Document Scanner using React & OpenCV.js</h3>
      {!cvReady && <p>Loading OpenCV...</p>}

      {scannedImage ? (
        <div>
          <h4>Scanned Result:</h4>
          <img src={scannedImage} alt="Scanned document" style={styles.resultImage} />
          <div style={styles.buttonContainer}>
            <button onClick={resetScanner} style={styles.button}>Scan Again</button>
          </div>
        </div>
      ) : (
        cvReady && (
          <div>
            <div style={styles.container}>
              <video ref={videoRef} style={styles.video}></video>
              <canvas ref={canvasRef} style={styles.canvas}></canvas>
            </div>
            <div style={styles.buttonContainer}>
              <button onClick={handleCapture} style={styles.button}>Capture</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DocumentScanner;