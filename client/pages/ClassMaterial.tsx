import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen } from "lucide-react";

interface Homework {
  question: string;
  answer: string;
}

interface Chapter {
  number: string;
  name: string;
  pdf_link: string;
  guideline: string;
  homework: Homework[];
  // Adding computed properties for existing functionality
  id?: string;
  title?: string;
  hasPlate?: boolean;
}

// Dummy data for Marathi Grade 5
const dummyChapters: Chapter[] = [
  {
    number: "1",
    name: "आमची शाळा",
    pdf_link: "https://example.com/marathi-grade5-chapter1.pdf",
    guideline: "या पाठात आम्ही शाळेतील विविध ठिकाणे आणि त्यांचे महत्त्व शिकू. मुलांना शाळेची ओळख करून द्या आणि शाळेतील नियम सांगा.",
    homework: [
      {
        question: "तुमच्या शाळेत कोणकोणती खोली आहेत?",
        answer: "आमच्या शाळेत वर्गखोली, पुस्तकालय, खेळाचे मैदान, प्राचार्यांची खोली, शिक्षकांची खोली आहे."
      },
      {
        question: "शाळेत आपण कोणते नियम पाळतो?",
        answer: "आम्ही वेळेवर शाळेत येतो, गणवेश नीट घालतो, शिक्षकांचा आदर करतो आणि शाळेची स्वच्छता ठेवतो."
      }
    ],
    id: "1",
    title: "Chapter 1",
    hasPlate: true
  },
  {
    number: "2",
    name: "माझे कुटुंब",
    pdf_link: "",
    guideline: "या पाठात मुले आपल्या कुटुंबातील सदस्यांची ओळख करतील. कुटुंबातील प्रत्येकाची भूमिका आणि जबाबदारी समजावून सांगा.",
    homework: [
      {
        question: "तुमच्या कुटुंबात कोण कोण आहे?",
        answer: "माझ्या कुटुंबात आई, बाबा, आजी, आजोबा, भाऊ आणि बहीण आहेत."
      },
      {
        question: "घरातील काम कोण करते?",
        answer: "आई स्वयंपाक करते, बाबा कार्यालयात काम करतात, आम्ही मुले अभ्यास करतो आणि घरातील छोटी कामे करतो."
      }
    ],
    id: "2",
    title: "Chapter 2",
    hasPlate: false
  },
  {
    number: "3",
    name: "निसर्गातील रंग",
    pdf_link: "",
    guideline: "निसर्गातील विविध रंगांची ओळख करून द्या. फुले, पाने, आकाश, समुद्र इत्यादींचे रंग दाखवा आणि त्यांचे महत्त्व सांगा.",
    homework: [
      {
        question: "निसर्गात कोणकोणते रंग दिसतात?",
        answer: "निसर्गात हिरवा, निळा, पिवळा, लाल, पांढरा, काळा असे अनेक रंग दिसतात."
      },
      {
        question: "सूर्यास्ताच्या वेळी आकाशात कोणते रंग दिसतात?",
        answer: "सूर्यास्ताच्या वेळी आकाशात केशरी, लाल, गुलाबी आणि सोनेरी रंग दिसतात."
      },
      {
        question: "वसंत ऋतूत झाडांवर कोणते रंग दिसतात?",
        answer: "वसंत ऋतूत झाडांवर हिरवी पाने, रंगबिरंगी फुले आणि नवीन कोंब दिसतात."
      }
    ],
    id: "3",
    title: "Chapter 3",
    hasPlate: false
  },
  {
    number: "4",
    name: "सणउत्सव",
    pdf_link: "",
    guideline: "महाराष्ट्रातील विविध सणउत्सवांची माहिती द्या. गणपती, दिवाळी, होळी, गुढीपाडवा यांचे महत्त्व आणि साजरे करण्याच्या पद्धती सांगा.",
    homework: [
      {
        question: "महाराष्ट्रात कोणकोणते मुख्य सण साजरे करतात?",
        answer: "महाराष्ट्रात गणेशोत्सव, दिवाळी, होळी, गुढीपाडवा, नवरात्र, दसरा हे मुख्य सण साजरे करतात."
      },
      {
        question: "दिवाळीत कोणकोणत्या गोष्टी करतात?",
        answer: "दिवाळीत घर स्वच्छ करतात, दिवे लावतात, रांगोळी काढतात, मिठाई वाटतात आणि फटाके फोडतात."
      },
      {
        question: "गुढीपाडव्याचे महत्त्व काय आहे?",
        answer: "गुढीपाडवा हा मराठी नववर्षाचा दिवस आहे. या दिवशी घरात गुढी उभारतात आणि नवीन वर्षाचे स्वागत करतात."
      }
    ],
    id: "4",
    title: "Chapter 4",
    hasPlate: false
  }
];

// Class and subject options
const classes = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
];
const subjects = ["marathi", "English", "Mathematics", "Science", "EVS"];

const lecturePlateLinks: Record<string, string> = {
  1: "https://yourbackend.com/lecture-plate/1",
  2: "https://yourbackend.com/lecture-plate/2",
  3: "https://yourbackend.com/lecture-plate/3",
};

export default function ClassMaterial() {
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState({ chapters: false });
  const [error, setError] = useState<string | null>(null);
  const [backendDataReceived, setBackendDataReceived] = useState<boolean>(false);
  const [plateGenerationStatus, setPlateGenerationStatus] = useState<Record<string, 'idle' | 'generating' | 'success' | 'failed'>>({});
  const [plateGenerationResponse, setPlateGenerationResponse] = useState<Record<string, any>>({});

  // For inline expand of single chapter card
  const [viewingChapterId, setViewingChapterId] = useState<string | null>(null);

  // Check if should show dummy data
  const shouldShowDummyData = () => {
    return !backendDataReceived && 
           selectedClass === "Class 5" && 
           selectedSubject === "marathi" && 
           chapters.length === 0 && 
           !isLoading.chapters && 
           !error;
  };

  // This handles the backend fetch using class_name and subject as GET params
  const handleFetchSyllabus = useCallback(async () => {
    if (!selectedClass || !selectedSubject) {
      alert("Please select both a class and a subject.");
      return;
    }
    setIsLoading({ chapters: true });
    setError(null);
    setChapters([]);
    setViewingChapterId(null);
    setBackendDataReceived(false);
    setPlateGenerationStatus({});
    setPlateGenerationResponse({});

    try {
      const classNumber = selectedClass.split(" ")[1] || selectedClass;
      const url = `https://c226b90d503f.ngrok-free.app/fetch_chapters/?class_name=${classNumber}&subject=${selectedSubject}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // This header bypasses ngrok's browser warning page
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText.substring(0, 200)}...`);
      }

      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        throw new Error(`Expected JSON response but got: ${contentType}. Response: ${responseText.substring(0, 200)}...`);
      }

      const data: Chapter[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid server format: not an array");
      }

      // Transform the fetched data to match existing component expectations
      const transformedChapters = data.map((chapter) => ({
        ...chapter,
        id: chapter.number,
        title: `Chapter ${chapter.number}`,
        hasPlate: chapter.pdf_link && chapter.pdf_link !== "", // Check if pdf_link exists and is not empty
      }));

      setChapters(transformedChapters);
      setBackendDataReceived(true);
    } catch (err: any) {
      console.error("Failed to fetch chapters:", err);
      setError("Could not load syllabus. Please try again later.");
      
      // Show dummy data for Class 5 Marathi when backend fails
      if (selectedClass === "Class 5" && selectedSubject === "marathi") {
        console.log("Showing dummy data due to backend failure");
      }
    } finally {
      setIsLoading({ chapters: false });
    }
  }, [selectedClass, selectedSubject]);

  // Effect to show dummy data when appropriate
  useEffect(() => {
    if (shouldShowDummyData()) {
      setChapters(dummyChapters);
    }
  }, [selectedClass, selectedSubject, backendDataReceived, isLoading.chapters, error]);

  // --- Actions ---
  const handleCreateLecturePlate = async (chapter: Chapter) => {
    const classNumber = selectedClass.split(" ")[1] || selectedClass;
    const chapterId = chapter.id || "";
    
    // Set status to generating
    setPlateGenerationStatus(prev => ({
      ...prev,
      [chapterId]: 'generating'
    }));
    
    // Clear any previous response for this chapter
    setPlateGenerationResponse(prev => ({
      ...prev,
      [chapterId]: null
    }));
    
    // If using dummy data, simulate the proper backend flow
    if (shouldShowDummyData() || !backendDataReceived) {
      console.log(`Starting dummy lecture plate generation for Chapter ${chapter.number}: ${chapter.name}`);
      
      // Simulate realistic API call delay (3-5 seconds)
      const delay = 3000 + Math.random() * 2000;
      
      setTimeout(() => {
        // Simulate realistic success/failure rate (85% success for demo)
        const isSuccess = Math.random() > 0.15;
        
        if (isSuccess) {
          const dummyResponse = {
            status: "success",
            message: `Lecture plate generated successfully for Chapter ${chapter.number}`,
            pdf_link: `https://example.com/generated-plates/marathi-grade5-chapter${chapter.number}-lecture-plate.pdf`,
            chapter_number: chapter.number,
            generated_at: new Date().toISOString(),
            processing_time: `${(delay / 1000).toFixed(1)} seconds`
          };
          
          console.log(`Dummy API Response for Chapter ${chapter.number}:`, dummyResponse);
          
          // Store the response
          setPlateGenerationResponse(prev => ({
            ...prev,
            [chapterId]: dummyResponse
          }));
          
          // Update chapter with new PDF link
          setChapters(prevChapters => 
            prevChapters.map(ch => 
              ch.id === chapter.id 
                ? { 
                    ...ch, 
                    pdf_link: dummyResponse.pdf_link,
                    hasPlate: true 
                  }
                : ch
            )
          );
          
          // Set status to success
          setPlateGenerationStatus(prev => ({
            ...prev,
            [chapterId]: 'success'
          }));
          
          // Show success alert with response details
          alert(`✅ Lecture Plate Created Successfully!\n\nChapter: ${chapter.number} - ${chapter.name}\nProcessing Time: ${dummyResponse.processing_time}\nPDF Link: ${dummyResponse.pdf_link}`);
          
        } else {
          const errorResponse = {
            status: "error",
            message: `Failed to generate lecture plate for Chapter ${chapter.number}. Please try again.`,
            error_code: "GENERATION_FAILED",
            chapter_number: chapter.number,
            failed_at: new Date().toISOString()
          };
          
          console.error(`Dummy API Error for Chapter ${chapter.number}:`, errorResponse);
          
          // Store the error response
          setPlateGenerationResponse(prev => ({
            ...prev,
            [chapterId]: errorResponse
          }));
          
          // Set status to failed
          setPlateGenerationStatus(prev => ({
            ...prev,
            [chapterId]: 'failed'
          }));
          
          // Show error alert
          alert(`❌ Failed to Create Lecture Plate\n\nChapter: ${chapter.number} - ${chapter.name}\nError: ${errorResponse.message}`);
          
          // Reset to idle after 4 seconds to show create button again
          setTimeout(() => {
            setPlateGenerationStatus(prev => ({
              ...prev,
              [chapterId]: 'idle'
            }));
          }, 4000);
        }
      }, delay);
      return;
    }
    
    // Real backend API call
    try {
      const url = `https://c226b90d503f.ngrok-free.app/create_lecture_plate/?std=${classNumber}&subject=${selectedSubject}&chapter_no=${chapter.number}`;
      
      console.log(`Making API call to: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText.substring(0, 200)}...`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        throw new Error(`Expected JSON response but got: ${contentType}`);
      }

      const responseData = await response.json();
      
      console.log(`Backend API Response for Chapter ${chapter.number}:`, responseData);
      
      // Store the response
      setPlateGenerationResponse(prev => ({
        ...prev,
        [chapterId]: responseData
      }));
      
      // Update the specific chapter with the new PDF link
      setChapters(prevChapters => 
        prevChapters.map(ch => 
          ch.id === chapter.id 
            ? { 
                ...ch, 
                pdf_link: responseData.pdf_link || responseData.link || responseData.url || "",
                hasPlate: true 
              }
            : ch
        )
      );
      
      // Set status to success
      setPlateGenerationStatus(prev => ({
        ...prev,
        [chapterId]: 'success'
      }));
      
      // Show success alert with response
      alert(`✅ Lecture Plate Created Successfully!\n\nResponse: ${JSON.stringify(responseData, null, 2)}`);
      
    } catch (err: any) {
      console.error("Failed to create lecture plate:", err);
      
      const errorResponse = {
        status: "error",
        message: err.message,
        chapter_number: chapter.number,
        failed_at: new Date().toISOString()
      };
      
      // Store the error response
      setPlateGenerationResponse(prev => ({
        ...prev,
        [chapterId]: errorResponse
      }));
      
      // Set status to failed
      setPlateGenerationStatus(prev => ({
        ...prev,
        [chapterId]: 'failed'
      }));
      
      alert(`❌ Failed to create lecture plate: ${err.message}`);
      
      // Reset to idle after 4 seconds to show create button again
      setTimeout(() => {
        setPlateGenerationStatus(prev => ({
          ...prev,
          [chapterId]: 'idle'
        }));
      }, 4000);
    }
  };
  
  const handleViewPlate = (chapter: Chapter) => {
    setViewingChapterId((id) => (id === chapter.id ? null : chapter.id));
  };
  
  const handleTakeTest = (chapter: Chapter) =>
    alert(`Take test for ${chapter.title}`);
  
  const handleSeeResult = (chapter: Chapter) =>
    alert(`View result for ${chapter.title}`);
  
  const handleCheckExercise = (chapter: Chapter) => {
    const gradeNumber = selectedClass.split(" ")[1];
    const sessionDetails = {
      studentname: "",
      rollnumber: "",
      grade: gradeNumber || selectedClass,
      subject: selectedSubject,
      chapter: chapter.id,
    };
    navigate("/checker", { state: { sessionDetails } });
  };
  
  const handleUploadHomework = (chapter: Chapter) =>
    alert(`Upload homework for ${chapter.title}`);

  // Get current status for a chapter
  const getChapterStatus = (chapterId: string) => {
    return plateGenerationStatus[chapterId] || 'idle';
  };

  // Render plate button based on status
  const renderPlateButton = (chapter: Chapter) => {
    const chapterId = chapter.id || "";
    const status = getChapterStatus(chapterId);
    
    if (chapter.hasPlate && status === 'success') {
      return (
        <Button
          onClick={() => handleViewPlate(chapter)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-semibold"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          {viewingChapterId === chapter.id ? "Hide" : "View"}
        </Button>
      );
    }
    
    switch (status) {
      case 'generating':
        return (
          <Button
            disabled
            className="w-full bg-blue-400 text-white rounded-xl font-semibold cursor-not-allowed min-h-[40px]"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Generating...</span>
            </div>
          </Button>
        );
        
      case 'failed':
        return (
          <div className="space-y-2">
            <Button
              disabled
              className="w-full bg-red-500 text-white rounded-xl font-semibold cursor-not-allowed"
            >
              Generation Failed
            </Button>
            <div className="flex items-center justify-center">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                Will retry in a moment...
              </span>
            </div>
          </div>
        );
        
      default: // 'idle' or initial state
        return (
          <div className="space-y-2">
            <Button
              onClick={() => handleCreateLecturePlate(chapter)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold min-h-[40px]"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Create Lecture Plate
            </Button>
            <div className="flex items-center justify-center">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                Plate Not Created
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Study Material
          </h1>
          <p className="text-lg text-gray-600">
            Select class and subject to view chapters and actions
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              {/* Class Dropdown */}
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="class-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Class
                </label>
                <Select
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                >
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-2 border-gray-300 rounded-xl">
                    <SelectValue placeholder="Choose a class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Subject Dropdown */}
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="subject-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Subject
                </label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-2 border-gray-300 rounded-xl">
                    <SelectValue placeholder="Choose a subject..." />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Fetch Syllabus Button */}
            <Button
              onClick={handleFetchSyllabus}
              disabled={isLoading.chapters || !selectedClass || !selectedSubject}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-12 rounded-xl font-semibold disabled:bg-gray-400"
            >
              {isLoading.chapters ? "Loading..." : "Fetch Syllabus"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chapter Grid Section */}
      <div className="w-full bg-gray-50">
        <div className="px-8 lg:px-12 py-8">
          {selectedSubject && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                <BookOpen className="h-5 w-5" />
                Subject: {selectedSubject}
                {shouldShowDummyData() && (
                  <span className="ml-2 bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs">
                    Demo Data
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Loading/error/empty states */}
          {isLoading.chapters && (
            <p className="text-center text-gray-500">Loading syllabus...</p>
          )}
          {error && !shouldShowDummyData() && (
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">{error}</p>
              <Button 
                onClick={handleFetchSyllabus}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Try Again
              </Button>
            </div>
          )}
          {!isLoading.chapters &&
            !error &&
            chapters.length === 0 &&
            selectedSubject &&
            !shouldShowDummyData() && (
              <p className="text-center text-gray-500">
                No chapters found for this subject. Click "Fetch Syllabus" to
                load.
              </p>
            )}
          
          {/* Chapters List */}
          <div className="space-y-6">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Chapter info */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                          {chapter.number}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {chapter.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{chapter.name}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Create or View Plate Button */}
                    <div className="lg:col-span-3">
                      {renderPlateButton(chapter)}
                    </div>
                    
                    {/* Other Action Buttons */}
                    <div className="lg:col-span-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button
                          onClick={() => handleTakeTest(chapter)}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium h-12"
                        >
                          Take Test
                        </Button>
                        <Button
                          onClick={() => handleSeeResult(chapter)}
                          className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium h-12"
                        >
                          View Result
                        </Button>
                        <Button
                          onClick={() => handleCheckExercise(chapter)}
                          className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium h-12"
                        >
                          Check Exercise
                        </Button>
                        <Button
                          onClick={() => handleUploadHomework(chapter)}
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium h-12"
                        >
                          Upload HW
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Inline expand details */}
                  {viewingChapterId === chapter.id && (
                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 px-6 py-5 space-y-5 shadow-inner">
                      <div>
                        <strong className="block text-blue-700 mb-1">Guidelines</strong>
                        <span className="text-gray-700">
                          {chapter.guideline || "No guidelines available."}
                        </span>
                      </div>
                      
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <strong className="block text-yellow-700 mb-1">PDF Material</strong>
                          <span className="text-gray-700">
                            {chapter.pdf_link ? "Available" : "Not available"}
                          </span>
                        </div>
                        <Button
                          disabled={!chapter.pdf_link}
                          onClick={() => window.open(chapter.pdf_link, "_blank", "noopener noreferrer")}
                          className="flex gap-2 ml-5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-extrabold disabled:bg-gray-400"
                        >
                          Open PDF
                        </Button>
                      </div>
                      
                      <div>
                        <strong className="block text-green-700 mb-1">Homework</strong>
                        {chapter.homework && chapter.homework.length > 0 ? (
                          <div className="space-y-3 mt-2">
                            {chapter.homework.map((hw, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg border border-green-200">
                                <p className="text-sm font-medium text-green-800 mb-1">Question {index + 1}:</p>
                                <p className="text-gray-700 mb-2">{hw.question}</p>
                                <p className="text-sm font-medium text-green-800 mb-1">Answer:</p>
                                <p className="text-gray-600">{hw.answer}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-700">No homework available.</span>
                        )}
                      </div>
                      
                      {/* Show API Response if available */}
                      {plateGenerationResponse[chapter.id || ""] && (
                        <div>
                          <strong className="block text-purple-700 mb-1">API Response</strong>
                          <div className="bg-gray-100 p-3 rounded-lg border">
                            <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                              {JSON.stringify(plateGenerationResponse[chapter.id || ""], null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
