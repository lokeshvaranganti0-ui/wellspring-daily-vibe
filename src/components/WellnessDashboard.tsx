import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";

interface MoodEntry {
  emoji: string;
  label: string;
  value: string;
  timestamp: Date;
}

interface WellnessDashboardProps {
  moodHistory: MoodEntry[];
}

const WellnessDashboard = ({ moodHistory }: WellnessDashboardProps) => {
  const today = new Date();
  const week = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const recentMoods = moodHistory.filter(mood => mood.timestamp >= week);
  const streak = calculateStreak(moodHistory);
  const averageMood = calculateAverageMood(recentMoods);
  
  function calculateStreak(moods: MoodEntry[]): number {
    if (moods.length === 0) return 0;
    
    const sortedMoods = [...moods].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    let streak = 0;
    let currentDate = new Date();
    
    for (const mood of sortedMoods) {
      const moodDate = new Date(mood.timestamp);
      const daysDiff = Math.floor((currentDate.getTime() - moodDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= streak + 1) {
        streak++;
        currentDate = moodDate;
      } else {
        break;
      }
    }
    
    return streak;
  }
  
  function calculateAverageMood(moods: MoodEntry[]): string {
    if (moods.length === 0) return "neutral";
    
    const moodValues = {
      sad: 1, anxious: 2, tired: 3, calm: 4, happy: 5, energy: 6
    };
    
    const total = moods.reduce((sum, mood) => {
      return sum + (moodValues[mood.value as keyof typeof moodValues] || 3);
    }, 0);
    
    const average = total / moods.length;
    
    if (average >= 5.5) return "Very Positive 🌟";
    if (average >= 4.5) return "Positive 😊";
    if (average >= 3.5) return "Balanced ⚖️";
    if (average >= 2.5) return "Challenging 🤗";
    return "Difficult 💝";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Check-in Streak</p>
              <p className="text-2xl font-bold text-primary">{streak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
            <Award className="h-8 w-8 text-wellness-energy" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly Mood</p>
              <p className="text-lg font-semibold">{averageMood}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-wellness-happy" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-primary">{recentMoods.length}</p>
              <p className="text-xs text-muted-foreground">check-ins</p>
            </div>
            <Calendar className="h-8 w-8 text-wellness-calm" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Wellness Goal</p>
              <Badge variant="secondary" className="bg-wellness-peaceful/20 text-wellness-peaceful">
                Active
              </Badge>
            </div>
            <Target className="h-8 w-8 text-wellness-peaceful" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessDashboard;