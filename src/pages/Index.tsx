import { useState, useEffect } from "react";
import MoodTracker from "@/components/MoodTracker";
import MoodChart from "@/components/MoodChart";
import WellnessRecommendations from "@/components/WellnessRecommendations";
import WellnessDashboard from "@/components/WellnessDashboard";
import { Brain, Heart } from "lucide-react";

interface MoodEntry {
  emoji: string;
  label: string;
  value: string;
  timestamp: Date;
}

const Index = () => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  // Load mood history from localStorage on component mount
  useEffect(() => {
    const savedMoods = localStorage.getItem("moodHistory");
    if (savedMoods) {
      const parsed = JSON.parse(savedMoods);
      const moodsWithDates = parsed.map((mood: any) => ({
        ...mood,
        timestamp: new Date(mood.timestamp),
      }));
      setMoodHistory(moodsWithDates);
    }
  }, []);

  // Save mood history to localStorage whenever it changes
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    }
  }, [moodHistory]);

  const handleMoodSubmit = (mood: MoodEntry) => {
    setMoodHistory(prev => [mood, ...prev]);
  };

  const recentMood = moodHistory[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-wellness shadow-wellness">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-3xl font-bold text-primary-foreground">Student Wellness Monitor</h1>
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-center text-primary-foreground/80 max-w-2xl mx-auto">
            Track your daily mood, discover patterns, and receive personalized wellness recommendations to support your mental health journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Overview */}
        <WellnessDashboard moodHistory={moodHistory} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <MoodTracker onMoodSubmit={handleMoodSubmit} />
            <MoodChart moodHistory={moodHistory} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <WellnessRecommendations recentMood={recentMood} />
            
            {/* Recent Activity */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Check-ins</h3>
              {moodHistory.length > 0 ? (
                <div className="space-y-3">
                  {moodHistory.slice(0, 5).map((mood, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mood.emoji}</span>
                        <div>
                          <p className="font-medium">{mood.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {mood.timestamp.toLocaleDateString()} at {mood.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No mood entries yet. Start by tracking your first mood above!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
