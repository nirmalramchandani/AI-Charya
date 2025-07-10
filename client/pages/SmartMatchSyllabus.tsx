import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  Plus,
  Clock,
  Target,
  Lightbulb,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface MatchedTopic {
  id: string;
  topicName: string;
  appearsIn: string[];
  suggestedWeek: number;
  difficulty: "Easy" | "Medium" | "Hard";
  teachingMethod: string;
  activities: string[];
}

interface TimelineItem {
  id: string;
  week: number;
  topics: MatchedTopic[];
  theme: string;
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

const dummyMatchedTopics: MatchedTopic[] = [
  {
    id: "1",
    topicName: "Basic Numbers (1-10)",
    appearsIn: ["Class 1", "Class 2"],
    suggestedWeek: 2,
    difficulty: "Easy",
    teachingMethod: "Story-based learning with counting games",
    activities: [
      "Counting songs",
      "Number recognition games",
      "Finger counting",
    ],
  },
  {
    id: "2",
    topicName: "Addition & Subtraction",
    appearsIn: ["Class 2", "Class 3", "Class 4"],
    suggestedWeek: 4,
    difficulty: "Medium",
    teachingMethod: "Visual aids and practical examples",
    activities: ["Abacus practice", "Real-life scenarios", "Group exercises"],
  },
  {
    id: "3",
    topicName: "Shapes & Patterns",
    appearsIn: ["Class 1", "Class 2", "Class 3"],
    suggestedWeek: 6,
    difficulty: "Easy",
    teachingMethod: "Hands-on exploration with objects",
    activities: ["Shape sorting", "Pattern making", "Art integration"],
  },
  {
    id: "4",
    topicName: "Multiplication Tables",
    appearsIn: ["Class 3", "Class 4", "Class 5"],
    suggestedWeek: 8,
    difficulty: "Medium",
    teachingMethod: "Rhythmic learning and visual patterns",
    activities: ["Table songs", "Grid patterns", "Skip counting"],
  },
  {
    id: "5",
    topicName: "Fractions Introduction",
    appearsIn: ["Class 4", "Class 5"],
    suggestedWeek: 10,
    difficulty: "Hard",
    teachingMethod: "Concrete to abstract approach",
    activities: ["Pizza slicing", "Fraction circles", "Real-life examples"],
  },
  {
    id: "6",
    topicName: "Time & Calendar",
    appearsIn: ["Class 2", "Class 3", "Class 4"],
    suggestedWeek: 12,
    difficulty: "Medium",
    teachingMethod: "Daily routine integration",
    activities: ["Clock reading", "Calendar activities", "Time games"],
  },
];

const generateTimeline = (topics: MatchedTopic[]): TimelineItem[] => {
  const timelineMap: { [week: number]: MatchedTopic[] } = {};

  topics.forEach((topic) => {
    if (!timelineMap[topic.suggestedWeek]) {
      timelineMap[topic.suggestedWeek] = [];
    }
    timelineMap[topic.suggestedWeek].push(topic);
  });

  return Object.entries(timelineMap)
    .map(([week, weekTopics]) => ({
      id: `week-${week}`,
      week: parseInt(week),
      topics: weekTopics,
      theme: `Week ${week} - Foundation Building`,
    }))
    .sort((a, b) => a.week - b.week);
};

export default function SmartMatchSyllabus() {
  const [selectedClass1, setSelectedClass1] = useState("");
  const [selectedClass2, setSelectedClass2] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [matchedTopics, setMatchedTopics] = useState<MatchedTopic[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleMatchTopics = () => {
    if (!selectedClass1 || !selectedSubject) {
      alert("Please select at least one class and subject to match topics.");
      return;
    }

    // Filter topics that appear in the selected classes
    const filteredTopics = dummyMatchedTopics.filter((topic) => {
      if (selectedClass2 && selectedClass2 !== "no-comparison") {
        return (
          topic.appearsIn.includes(selectedClass1) ||
          topic.appearsIn.includes(selectedClass2)
        );
      }
      return topic.appearsIn.includes(selectedClass1);
    });

    setMatchedTopics(filteredTopics);
    setTimeline(generateTimeline(filteredTopics));
  };

  const addToTimeline = (topicId: string) => {
    const topic = matchedTopics.find((t) => t.id === topicId);
    if (topic) {
      alert(
        `"${topic.topicName}" added to teaching timeline for Week ${topic.suggestedWeek}!`,
      );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-material-green text-white";
      case "Medium":
        return "bg-material-yellow text-material-gray-900";
      case "Hard":
        return "bg-material-orange text-white";
      default:
        return "bg-material-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-material-gray-50">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-material-blue-50 to-material-green-50 border-b border-material-gray-200">
        <div className="px-8 lg:px-12 py-8">
          <h1 className="text-4xl font-bold text-material-gray-900 mb-3">
            Smart Match Syllabus
          </h1>
          <p className="text-lg text-material-gray-600">
            Find common topics across classes and create intelligent teaching
            timelines
          </p>
        </div>
      </div>

      <div className="px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Class and Subject Picker */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-material-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-material-blue" />
                </div>
                <h2 className="text-2xl font-bold text-material-gray-900">
                  Class and Subject Selection
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                {/* Primary Class */}
                <div>
                  <label className="block text-sm font-medium text-material-gray-700 mb-2">
                    Primary Class
                  </label>
                  <Select
                    value={selectedClass1}
                    onValueChange={setSelectedClass1}
                  >
                    <SelectTrigger className="w-full h-12 border-2 border-material-gray-300 rounded-lg hover:border-material-blue-400 focus:border-material-blue-500">
                      <SelectValue placeholder="Select primary class..." />
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

                {/* Secondary Class (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-material-gray-700 mb-2">
                    Compare with (Optional)
                  </label>
                  <Select
                    value={selectedClass2}
                    onValueChange={setSelectedClass2}
                  >
                    <SelectTrigger className="w-full h-12 border-2 border-material-gray-300 rounded-lg hover:border-material-blue-400 focus:border-material-blue-500">
                      <SelectValue placeholder="Select second class..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-comparison">
                        No comparison
                      </SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-material-gray-700 mb-2">
                    Subject
                  </label>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="w-full h-12 border-2 border-material-gray-300 rounded-lg hover:border-material-blue-400 focus:border-material-blue-500">
                      <SelectValue placeholder="Select subject..." />
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

                {/* Match Button */}
                <Button
                  onClick={handleMatchTopics}
                  className="h-12 bg-material-green hover:bg-material-green-600 text-white font-semibold"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Match Topics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Matched Topics Display */}
          {matchedTopics.length > 0 && (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-material-green-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-material-green" />
                    </div>
                    <h2 className="text-2xl font-bold text-material-gray-900">
                      Matched Topics
                    </h2>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="text-material-gray-600">
                      {matchedTopics.length} topics found
                    </Badge>
                    <Button
                      onClick={() => setShowTimeline(!showTimeline)}
                      variant="outline"
                      className="border-material-blue-300 text-material-blue hover:bg-material-blue-50"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {showTimeline ? "Hide Timeline" : "View Timeline"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {matchedTopics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="bg-material-gray-50 hover:bg-white hover:shadow-md transition-all duration-200 border border-material-gray-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-material-gray-900 flex-1">
                            {topic.topicName}
                          </h3>
                          <Badge
                            className={`ml-2 ${getDifficultyColor(topic.difficulty)}`}
                          >
                            {topic.difficulty}
                          </Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-material-gray-600">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">Appears in:</span>
                            <div className="flex gap-1">
                              {topic.appearsIn.map((cls, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-material-blue-50 text-material-blue-700"
                                >
                                  {cls}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-material-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Suggested Week:</span>
                            <Badge
                              variant="outline"
                              className="text-material-orange-700 bg-material-orange-50"
                            >
                              Week {topic.suggestedWeek}
                            </Badge>
                          </div>

                          <div className="flex items-start gap-2 text-sm text-material-gray-600">
                            <Lightbulb className="h-4 w-4 mt-0.5" />
                            <div>
                              <span className="font-medium">
                                Teaching Method:
                              </span>
                              <p className="text-material-gray-600 mt-1">
                                {topic.teachingMethod}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-material-gray-700 mb-2">
                            Suggested Activities:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {topic.activities.map((activity, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-material-green-50 text-material-green-700"
                              >
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => addToTimeline(topic.id)}
                          className="w-full bg-material-blue hover:bg-material-blue-600 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Timeline
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline View */}
          {showTimeline && timeline.length > 0 && (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-material-orange-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-material-orange" />
                  </div>
                  <h2 className="text-2xl font-bold text-material-gray-900">
                    Teaching Timeline
                  </h2>
                </div>

                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={item.id} className="relative">
                      {/* Timeline Connector */}
                      {index < timeline.length - 1 && (
                        <div className="absolute left-6 top-16 w-px h-16 bg-material-gray-300"></div>
                      )}

                      <div className="flex gap-6">
                        {/* Week Indicator */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-material-orange rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {item.week}
                            </span>
                          </div>
                        </div>

                        {/* Week Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-material-gray-900 mb-2">
                            {item.theme}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.topics.map((topic) => (
                              <Card
                                key={topic.id}
                                className="bg-material-gray-50 border border-material-gray-200"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-material-gray-900">
                                      {topic.topicName}
                                    </h4>
                                    <CheckCircle className="h-4 w-4 text-material-green" />
                                  </div>
                                  <p className="text-xs text-material-gray-600 mb-2">
                                    {topic.teachingMethod}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={`text-xs ${getDifficultyColor(topic.difficulty)}`}
                                    >
                                      {topic.difficulty}
                                    </Badge>
                                    <ArrowRight className="h-3 w-3 text-material-gray-400" />
                                    <span className="text-xs text-material-gray-500">
                                      {topic.appearsIn.join(", ")}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-material-blue-50 rounded-lg border border-material-blue-200">
                  <h4 className="font-semibold text-material-blue-800 mb-2">
                    📚 Teaching Timeline Summary
                  </h4>
                  <p className="text-sm text-material-blue-700">
                    This timeline shows the optimal sequence for teaching
                    matched topics across classes. Each week builds upon
                    previous concepts while maintaining appropriate difficulty
                    progression.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results State */}
          {selectedClass1 && selectedSubject && matchedTopics.length === 0 && (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-material-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-material-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-material-gray-600 mb-2">
                  No matching topics found
                </h3>
                <p className="text-material-gray-500">
                  Try selecting different classes or subjects to find common
                  curriculum topics.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
