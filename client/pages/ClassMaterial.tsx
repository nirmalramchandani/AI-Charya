import { useState } from "react";
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
import {
  FlaskConical,
  BarChart3,
  Camera,
  FileText,
  BookOpen,
  AlertCircle,
  Settings,
} from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  name: string;
  hasPlate: boolean;
}

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

const subjects = ["Marathi", "English", "Math", "Science", "EVS"];

const chapters: Chapter[] = [
  { id: 1, title: "Chapter 1", name: "अक्षरांची ओळख", hasPlate: true },
  { id: 2, title: "Chapter 2", name: "माझे कुटुंब", hasPlate: false },
  { id: 3, title: "Chapter 3", name: "फुलांची बाग", hasPlate: true },
  { id: 4, title: "Chapter 4", name: "पक्ष्यांचे जग", hasPlate: false },
];

export default function ClassMaterial() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleApplyFilters = () => {
    // UI-only functionality as requested
    console.log("Filters applied:", { selectedClass, selectedSubject });
  };

  const handleCreateLecturePlate = (
    chapterTitle: string,
    chapterName: string,
  ) => {
    navigate(
      `/lecture-plate-generator?chapter=${encodeURIComponent(chapterTitle)}&name=${encodeURIComponent(chapterName)}`,
    );
  };

  const handleViewPlate = (chapterTitle: string, chapterName: string) => {
    // Show dummy data alert for now
    alert(
      `Viewing lecture plate for ${chapterTitle}: ${chapterName}\n\nDummy Content:\n- Introduction to ${chapterName}\n- Key Learning Points\n- Activities and Exercises\n- Assessment Questions`,
    );
  };

  const handleTakeTest = (chapterTitle: string, chapterName: string) => {
    navigate(
      `/quiz?chapter=${encodeURIComponent(chapterTitle)}&name=${encodeURIComponent(chapterName)}`,
    );
  };

  const handleCheckExercise = () => {
    navigate("/checker");
  };

  const handleSeeResult = () => {
    navigate("/checker");
  };

  return (
    <div className="min-h-screen bg-material-gray-50">
      {/* Page Header - Full Width */}
      <div className="w-full bg-gradient-to-r from-material-blue-50 to-material-green-50 border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-material-gray-900 mb-3">
            Study Material
          </h1>
          <p className="text-lg text-material-gray-600">
            Select class and subject to view chapters and actions
          </p>
        </div>
      </div>

      {/* Filter Section - Full Width */}
      <div className="w-full bg-white shadow-sm border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              {/* Class Dropdown */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-material-gray-700 mb-2">
                  Select Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full h-12 bg-material-gray-50 border-2 border-material-gray-300 rounded-xl hover:border-material-blue-400 focus:border-material-blue-500 transition-colors">
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
                <label className="block text-sm font-medium text-material-gray-700 mb-2">
                  Select Subject
                </label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="w-full h-12 bg-material-gray-50 border-2 border-material-gray-300 rounded-xl hover:border-material-blue-400 focus:border-material-blue-500 transition-colors">
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

            {/* Apply Button */}
            <Button
              onClick={handleApplyFilters}
              className="bg-material-blue hover:bg-material-blue-600 text-white px-8 py-3 h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Grid Section - Full Width */}
      <div className="w-full bg-material-gray-50">
        <div className="px-8 lg:px-12 py-8">
          {/* Subject Label */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-material-blue-100 text-material-blue-800 px-4 py-2 rounded-full font-semibold">
              <BookOpen className="h-5 w-5" />
              Subject: {selectedSubject || "Marathi"}
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="space-y-6">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-material-gray-200"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left Column - Chapter Info */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-material-blue to-material-green rounded-full flex items-center justify-center text-white font-bold">
                          {chapter.id}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-material-gray-900">
                            {chapter.title}
                          </h3>
                          <p className="text-material-gray-600 mb-2">
                            {chapter.name}
                          </p>
                          {/* <div className="bg-material-gray-100 text-material-gray-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                            Chapter {chapter.id}
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - Plate Status */}
                    <div className="lg:col-span-3">
                      <div className="space-y-2">
                        {chapter.hasPlate ? (
                          <Button
                            onClick={() =>
                              handleViewPlate(chapter.title, chapter.name)
                            }
                            className="w-full bg-material-yellow hover:bg-material-yellow-600 text-material-gray-900 hover:text-white rounded-xl font-semibold transition-all duration-200"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Plate
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={() =>
                                handleCreateLecturePlate(
                                  chapter.title,
                                  chapter.name,
                                )
                              }
                              className="w-full bg-material-blue hover:bg-material-blue-600 text-white rounded-xl font-semibold transition-all duration-200"
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Create Lecture Plate
                            </Button>
                            <div className="flex items-center justify-center">
                              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                                Plate Not Created
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Action Buttons */}
                    <div className="lg:col-span-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button
                          onClick={() =>
                            handleTakeTest(chapter.title, chapter.name)
                          }
                          className="bg-material-blue hover:bg-material-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm h-12 px-1 flex flex-wrap"
                        >
                          Take Test
                        </Button>

                        <Button
                          onClick={handleSeeResult}
                          className="bg-material-green hover:bg-material-green-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm h-12 px-1 flex flex-wrap"
                        >
                          View Result
                        </Button>

                        <Button
                          onClick={handleCheckExercise}
                          className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm h-12 px-1 flex flex-wrap"
                        >
                          Check Exercise
                        </Button>
                        <Button
                          onClick={() =>
                            handleTakeTest(chapter.title, chapter.name)
                          }
                          className="bg-material-orange hover:bg-material-orange-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm h-12 px-3 flex flex-wrap"
                        >
                          Upload HW
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
