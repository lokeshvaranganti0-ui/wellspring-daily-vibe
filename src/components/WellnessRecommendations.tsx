import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Moon, Sun } from "lucide-react";

interface MoodEntry {
  emoji: string;
  label: string;
  value: string;
  timestamp: Date;
}

interface WellnessRecommendationsProps {
  recentMood?: MoodEntry;
}

const recommendations = {
  happy: [
    { icon: Heart, text: "Share your joy! Connect with friends or family", category: "Social" },
    { icon: Sun, text: "Take a walk outside to maintain this positive energy", category: "Physical" },
    { icon: Brain, text: "Practice gratitude journaling", category: "Mental" },
  ],
  calm: [
    { icon: Moon, text: "Perfect time for meditation or deep breathing", category: "Mindfulness" },
    { icon: Brain, text: "Read a book or learn something new", category: "Mental" },
    { icon: Heart, text: "Practice self-care activities", category: "Self-Care" },
  ],
  energy: [
    { icon: Sun, text: "Channel this energy into exercise or physical activity", category: "Physical" },
    { icon: Brain, text: "Tackle challenging tasks on your to-do list", category: "Productivity" },
    { icon: Heart, text: "Connect with others and spread positive vibes", category: "Social" },
  ],
  tired: [
    { icon: Moon, text: "Prioritize rest and consider an earlier bedtime", category: "Rest" },
    { icon: Heart, text: "Take short breaks throughout the day", category: "Self-Care" },
    { icon: Brain, text: "Practice gentle stretching or light movement", category: "Physical" },
  ],
  anxious: [
    { icon: Brain, text: "Try the 4-7-8 breathing technique", category: "Breathing" },
    { icon: Moon, text: "Practice progressive muscle relaxation", category: "Relaxation" },
    { icon: Heart, text: "Reach out to a trusted friend or counselor", category: "Support" },
  ],
  sad: [
    { icon: Heart, text: "Be gentle with yourself - it's okay to feel this way", category: "Self-Compassion" },
    { icon: Sun, text: "Try to get some sunlight or fresh air", category: "Nature" },
    { icon: Brain, text: "Consider talking to someone you trust", category: "Support" },
  ],
};

const WellnessRecommendations = ({ recentMood }: WellnessRecommendationsProps) => {
  const moodRecommendations = recentMood 
    ? recommendations[recentMood.value as keyof typeof recommendations] || recommendations.calm
    : recommendations.calm;

  return (
    <Card className="bg-gradient-calm shadow-wellness border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Wellness Recommendations
        </CardTitle>
        {recentMood && (
          <p className="text-sm text-muted-foreground">
            Based on your current mood: {recentMood.emoji} {recentMood.label}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {moodRecommendations.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
              <IconComponent className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm mb-2">{rec.text}</p>
                <Badge variant="secondary" className="text-xs">
                  {rec.category}
                </Badge>
              </div>
            </div>
          );
        })}
        <Button 
          variant="outline" 
          className="w-full mt-4 hover:bg-primary/10 border-primary/30"
        >
          Explore More Resources
        </Button>
      </CardContent>
    </Card>
  );
};

export default WellnessRecommendations;