import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

// Import the TypeScript types
import { Student, Subject, Academic } from "@/types/student"; 

// Import your page components from their respective files
import { StudentForm } from "@/components/student/StudentForm";
import { ProfileInfoCard } from "@/components/student/ProfileInfoCard";
import AcademicOverviewCard from "@/components/student/AcademicOverviewCard";
import PerformanceChartsCard from "@/components/student/PerformanceChartsCard";
import { SummaryCard } from "@/components/student/SummaryCard";
import { ActivitiesCard } from "@/components/student/ActivitiesCard";
import { LearningAssessmentCard } from "@/components/student/LearningAssessmentCard";


// --- Dummy Data ---
// This data is now included directly in the page component file.
const initialStudents: Student[] = [
    {
        student_id: 'S12345',
        name: 'Rahul Sharma',
        profilePhoto: 'https://i.pravatar.cc/150?img=1',
        age: 14,
        dob: '2008-07-10',
        gender: 'Male',
        student_class: '8th Grade',
        blood_group: 'B+',
        address: { street: '123 MG Road', city: 'Pune', state: 'Maharashtra', zip: '411001' },
        aadhar_number: '1234 5678 9012',
        preferred_mode: 'Online',
        preferred_language: 'English',
        mother_tongue: 'Marathi',
        fatherDetails: { name: 'Rajesh Sharma', phone: '9123456789', occupation: 'Engineer' },
        motherDetails: { name: 'Sunita Sharma', phone: '9876543210', occupation: 'Teacher' },
        emergencyContact: { name: 'Rajesh Sharma', phone: '9123456789', relation: 'Father' },
        healthInfo: { allergies: 'None', medicalNotes: 'None' },
        hobbies: ['Reading', 'Chess', 'Football'],
        academic_achievements: 'Won National Science Olympiad in 2023. Consistently scores high in Mathematics.',
        academic: {
            subjects: [
                {
                    name: 'Mathematics',
                    chapters: [
                        { name: 'Algebra', homework_score: 9, test_score: 8, chapter_exercise_score: 10, remarks: 'Excellent progress' },
                        { name: 'Geometry', homework_score: 7, test_score: 7, chapter_exercise_score: 8, remarks: 'Good understanding' }
                    ]
                },
                {
                    name: 'Science',
                    chapters: [
                        { name: 'Light and Sound', homework_score: 8, test_score: 9, chapter_exercise_score: 9, remarks: 'Very curious learner' }
                    ]
                },
                {
                    name: 'History',
                    chapters: [
                        { name: 'Ancient Civilizations', homework_score: 6, test_score: 5, chapter_exercise_score: 7, remarks: 'Needs more focus on dates.' }
                    ]
                }
            ]
        }
    },
    {
        student_id: 'S12346',
        name: 'Priya Patel',
        profilePhoto: 'https://i.pravatar.cc/150?img=2',
        age: 15,
        dob: '2007-02-15',
        gender: 'Female',
        student_class: '9th Grade',
        blood_group: 'O+',
        address: { street: '456 Park Avenue', city: 'Mumbai', state: 'Maharashtra', zip: '400001' },
        aadhar_number: '9876 5432 1098',
        preferred_mode: 'Offline',
        preferred_language: 'Gujarati',
        mother_tongue: 'Gujarati',
        fatherDetails: { name: 'Suresh Patel', phone: '9988776655', occupation: 'Businessman' },
        motherDetails: { name: 'Mina Patel', phone: '9911223344', occupation: 'Homemaker' },
        emergencyContact: { name: 'Suresh Patel', phone: '9988776655', relation: 'Father' },
        healthInfo: { allergies: 'Dust', medicalNotes: 'None' },
        hobbies: ['Dancing', 'Painting'],
        academic_achievements: 'State level dance competition winner. Excels in creative writing.',
        academic: {
            subjects: [
                {
                    name: 'English',
                    chapters: [
                        { name: 'Poetry', homework_score: 9, test_score: 9, chapter_exercise_score: 9, remarks: 'Excellent creative writing.' },
                        { name: 'Grammar', homework_score: 8, test_score: 8, chapter_exercise_score: 8, remarks: 'Very good.' }
                    ]
                },
                {
                    name: 'Social Studies',
                    chapters: [
                        { name: 'Civics', homework_score: 7, test_score: 8, chapter_exercise_score: 7, remarks: 'Good participation in class discussions.' }
                    ]
                }
            ]
        }
    }
];

// Helper function to calculate subject metrics - needed for LearningAssessmentCard
const calculateSubjectMetrics = (subject: Subject) => {
  if (!subject.chapters || subject.chapters.length === 0) {
    return { averageScore: 0, strength: 'Weak' as const };
  }
  const chapterScores = subject.chapters.map(chapter => {
    const scores = [chapter.homework_score, chapter.test_score, chapter.chapter_exercise_score];
    return scores.reduce((acc, score) => acc + score, 0) / scores.length;
  });
  const totalScore = chapterScores.reduce((acc, score) => acc + score, 0);
  const averageScoreOutOf10 = totalScore / chapterScores.length;
  const averageScorePercentage = Math.round(averageScoreOutOf10 * 10);
  
  let strength: 'Strong' | 'Average' | 'Weak';
  if (averageScoreOutOf10 >= 8) strength = 'Strong';
  else if (averageScoreOutOf10 >= 6) strength = 'Average';
  else strength = 'Weak';

  return { averageScore: averageScorePercentage, strength };
};


export default function StudentProfile() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(students[0]);
  const [editMode, setEditMode] = useState(false);
  const [view, setView] = useState<'profile' | 'form'>('profile');

  const handleSaveStudent = (newStudentData: Student) => {
    // The backend will generate the permanent ID.
    // For local state management and React keys, we'll add a temporary, unique ID.
    const newStudentWithTempId = {
      ...newStudentData,
      student_id: `temp_${Date.now()}`, 
    };
    setStudents(prevStudents => [...prevStudents, newStudentWithTempId]);
    setSelectedStudent(newStudentWithTempId); // Select the newly added student
    setView('profile');
  };
  
  // Calculate learning level for the selected student to pass to LearningAssessmentCard
  const studentMetrics = useMemo((): { learningLevel: "Average" | "Advanced" | "Slow" } => {
    if (!selectedStudent) return { learningLevel: 'Average' as const };
    
    const subjects = selectedStudent.academic.subjects;
    if (!subjects || subjects.length === 0) return { learningLevel: 'Average' as const };
    
    const subjectDetails = subjects.map(s => calculateSubjectMetrics(s));
    const totalAverage = subjectDetails.reduce((acc, s) => acc + s.averageScore, 0) / subjectDetails.length;
    
    let learningLevel: "Advanced" | "Average" | "Slow";
    if (totalAverage >= 80) learningLevel = 'Advanced';
    else if (totalAverage >= 60) learningLevel = 'Average';
    else learningLevel = 'Slow';

    return { learningLevel };
  }, [selectedStudent]);


  if (view === 'form') {
    return (
      <StudentForm 
        onSave={handleSaveStudent} 
        onCancel={() => setView('profile')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">🎓 Student Dashboard</h1>
          <p className="text-lg text-gray-600">View and manage student profiles</p>
        </div>
      </div>

      <div className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 lg:px-12 py-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3">
            {students.map((student) => (
              <Button
                key={student.student_id}
                onClick={() => setSelectedStudent(student)}
                variant={selectedStudent?.student_id === student.student_id ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <img
                  src={student.profilePhoto || `https://api.dicebear.com/8.x/initials/svg?seed=${student.name}`}
                  alt={student.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                {student.name}
              </Button>
            ))}
          </div>
          <Button onClick={() => setView('form')} className="bg-[#34A853] hover:bg-[#1E8E3E] text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Student
          </Button>
        </div>
      </div>

      <div className="px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {selectedStudent ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <ProfileInfoCard
                  student={selectedStudent}
                  editMode={editMode}
                  onEditToggle={() => setEditMode(!editMode)}
                />
              </div>
              <div className="lg:col-span-8 space-y-6">
                <AcademicOverviewCard
                  subjects={selectedStudent.academic.subjects}
                  studentId={selectedStudent.student_id}
                />
                <PerformanceChartsCard
                  subjects={selectedStudent.academic.subjects}
                  studentName={selectedStudent.name}
                />
                <SummaryCard summary={selectedStudent.academic_achievements} />
                <ActivitiesCard activities={selectedStudent.hobbies} />
                <LearningAssessmentCard
                  learningLevel={studentMetrics.learningLevel}
                  editMode={editMode}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold text-gray-600">No Student Selected</h2>
              <p className="text-gray-500">Please add or select a student to view their profile.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
