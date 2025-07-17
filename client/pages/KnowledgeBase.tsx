import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  Eye,
  Trash2,
  Calendar,
  BookOpen,
  GraduationCap,
  Search,
  Filter,
  CloudUpload,
} from "lucide-react";

interface UploadedFile {
  id: string;
  fileName: string;
  subject: string;
  class: string;
  chapterTitle: string;
  uploadDate: string;
  fileSize: string;
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

const subjects = [
  "Marathi",
  "English",
  "Math",
  "Science",
  "EVS",
  "History",
  "Geography",
];

const dummyFiles: UploadedFile[] = [
  {
    id: "1",
    fileName: "marathi_chapter1.pdf",
    subject: "Marathi",
    class: "Class 5",
    chapterTitle: "अक्षरांची ओळख",
    uploadDate: "2024-01-15",
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    fileName: "math_geometry.pdf",
    subject: "Math",
    class: "Class 7",
    chapterTitle: "Geometry Basics",
    uploadDate: "2024-01-12",
    fileSize: "3.1 MB",
  },
  {
    id: "3",
    fileName: "science_plants.pdf",
    subject: "Science",
    class: "Class 6",
    chapterTitle: "Plant Life Cycle",
    uploadDate: "2024-01-10",
    fileSize: "4.2 MB",
  },
  {
    id: "4",
    fileName: "english_grammar.pdf",
    subject: "English",
    class: "Class 8",
    chapterTitle: "Tenses and Grammar",
    uploadDate: "2024-01-08",
    fileSize: "1.8 MB",
  },
  {
    id: "5",
    fileName: "evs_environment.pdf",
    subject: "EVS",
    class: "Class 4",
    chapterTitle: "Our Environment",
    uploadDate: "2024-01-05",
    fileSize: "2.9 MB",
  },
];

export default function KnowledgeBase() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const uploadVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(dummyFiles);
  const [filterClass, setFilterClass] = useState("all-classes");
  const [filterSubject, setFilterSubject] = useState("all-subjects");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileUpload = () => {
    if (!selectedClass || !selectedSubject || !chapterTitle) {
      alert("Please fill in all fields before uploading.");
      return;
    }

    // Dummy upload behavior
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      fileName: `${selectedSubject.toLowerCase()}_${chapterTitle.replace(/\s+/g, "_").toLowerCase()}.pdf`,
      subject: selectedSubject,
      class: selectedClass,
      chapterTitle: chapterTitle,
      uploadDate: new Date().toISOString().split("T")[0],
      fileSize: "2.1 MB",
    };

    setUploadedFiles([newFile, ...uploadedFiles]);

    // Reset form
    setSelectedClass("");
    setSelectedSubject("");
    setChapterTitle("");

    alert("File uploaded successfully!");
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
    alert("File deleted successfully!");
  };

  const handlePreviewFile = (fileName: string) => {
    alert(`Preview functionality for ${fileName} will be implemented soon.`);
  };

  const filteredFiles = uploadedFiles.filter((file) => {
    const matchesClass =
      !filterClass ||
      filterClass === "all-classes" ||
      file.class === filterClass;
    const matchesSubject =
      !filterSubject ||
      filterSubject === "all-subjects" ||
      file.subject === filterSubject;
    const matchesSearch =
      !searchTerm ||
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesClass && matchesSubject && matchesSearch;
  });

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Marathi: "bg-material-blue-100 text-material-blue-800",
      English: "bg-material-green-100 text-material-green-800",
      Math: "bg-material-orange-100 text-material-orange-800",
      Science: "bg-purple-100 text-purple-800",
      EVS: "bg-material-yellow-100 text-material-yellow-800",
      History: "bg-red-100 text-red-800",
      Geography: "bg-blue-100 text-blue-800",
    };
    return colors[subject] || "bg-material-gray-100 text-material-gray-800";
  };

  return (
    <div className="min-h-screen bg-material-gray-50">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-material-blue-50 to-material-green-50 border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-material-gray-900 mb-3">
            Knowledge Base
          </h1>
          <p className="text-lg text-material-gray-600">
            Upload, organize and manage curriculum documents
          </p>
        </div>
      </div>

      <div className="px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Upload Section */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-material-blue-100 rounded-lg">
                  <CloudUpload className="h-6 w-6 text-material-blue" />
                </div>
                <h2 className="text-2xl font-bold text-material-gray-900">
                  Upload Curriculum
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Upload Zone */}
                <div className="lg:col-span-5">
                  <div className="border-2 border-dashed border-material-gray-300 rounded-xl p-8 text-center hover:border-material-blue-400 transition-colors">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-material-blue-100 rounded-full">
                        <Upload className="h-8 w-8 text-material-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-material-gray-900 mb-2">
                          Select PDF File
                        </h3>
                        <p className="text-material-gray-600 mb-4">
                          Drag and drop or click to upload curriculum PDF
                        </p>
                        <Button className="bg-material-blue hover:bg-material-blue-600 text-white">
                          <Upload className="h-4 w-4 mr-2" />
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Class Selection */}
                    <div>
                      <Label className="text-sm font-medium text-material-gray-700 mb-2 block">
                        Select Class
                      </Label>
                      <Select
                        value={selectedClass}
                        onValueChange={setSelectedClass}
                      >
                        <SelectTrigger className="w-full h-12 border-2 border-material-gray-300 rounded-lg hover:border-material-blue-400 focus:border-material-blue-500">
                          <SelectValue placeholder="Choose class..." />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                {cls}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject Selection */}
                    <div>
                      <Label className="text-sm font-medium text-material-gray-700 mb-2 block">
                        Select Subject
                      </Label>
                      <Select
                        value={selectedSubject}
                        onValueChange={setSelectedSubject}
                      >
                        <SelectTrigger className="w-full h-12 border-2 border-material-gray-300 rounded-lg hover:border-material-blue-400 focus:border-material-blue-500">
                          <SelectValue placeholder="Choose subject..." />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                {subject}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Chapter Title */}
                  <div>
                    <Label className="text-sm font-medium text-material-gray-700 mb-2 block">
                      Chapter Title
                    </Label>
                    <Input
                      type="text"
                      value={chapterTitle}
                      onChange={(e) => setChapterTitle(e.target.value)}
                      placeholder="Enter chapter title..."
                      className="w-full h-12 border-2 border-material-gray-300 rounded-lg hover:border-material-blue-400 focus:border-material-blue-500"
                    />
                  </div>

                  {/* Upload Button */}
                  <div className="pt-4">
                    <Button
                      onClick={handleFileUpload}
                      className="w-full bg-material-green hover:bg-material-green-600 text-white h-12 font-semibold"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Curriculum
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files Section */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-material-green-100 rounded-lg">
                    <FileText className="h-6 w-6 text-material-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-material-gray-900">
                    Uploaded Documents
                  </h2>
                </div>
                <div className="text-sm text-material-gray-600">
                  {filteredFiles.length} files found
                </div>
              </div>

              {/* Filters */}
              <div className="mb-6 p-4 bg-material-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-material-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-material-gray-300"
                    />
                  </div>

                  {/* Filter by Class */}
                  <Select value={filterClass} onValueChange={setFilterClass}>
                    <SelectTrigger className="border-material-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-classes">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Filter by Subject */}
                  <Select
                    value={filterSubject}
                    onValueChange={setFilterSubject}
                  >
                    <SelectTrigger className="border-material-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-subjects">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Clear Filters */}
                  <Button
                    onClick={() => {
                      setFilterClass("all-classes");
                      setFilterSubject("all-subjects");
                      setSearchTerm("");
                    }}
                    variant="outline"
                    className="border-material-gray-300"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Files Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFiles.map((file) => (
                  <Card
                    key={file.id}
                    className="bg-material-gray-50 hover:bg-white hover:shadow-md transition-all duration-200 border border-material-gray-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-material-blue-100 rounded-lg flex-shrink-0">
                          <FileText className="h-5 w-5 text-material-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-material-gray-900 truncate">
                            {file.chapterTitle}
                          </h3>
                          <p className="text-xs text-material-gray-500 truncate">
                            {file.fileName}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(file.subject)}`}
                          >
                            {file.subject}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-material-gray-200 text-material-gray-700">
                            {file.class}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-material-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {file.uploadDate}
                          </div>
                          <span>{file.fileSize}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handlePreviewFile(file.fileName)}
                          size="sm"
                          className="flex-1 bg-material-blue hover:bg-material-blue-600 text-white"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          onClick={() => handleDeleteFile(file.id)}
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFiles.length === 0 && (
                <div className="text-center py-12">
                  <div className="p-4 bg-material-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-material-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-material-gray-600 mb-2">
                    No files found
                  </h3>
                  <p className="text-material-gray-500">
                    Try adjusting your filters or upload some documents to get
                    started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
