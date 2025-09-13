import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { emoji: "😊", label: "Happy", value: "happy", color: "wellness-happy" },
  { emoji: "😌", label: "Calm", value: "calm", color: "wellness-calm" },
  { emoji: "⚡", label: "Energetic", value: "energy", color: "wellness-energy" },
  { emoji: "😴", label: "Tired", value: "tired", color: "wellness-peaceful" },
  { emoji: "😰", label: "Anxious", value: "anxious", color: "wellness-anxious" },
  { emoji: "😢", label: "Sad", value: "sad", color: "wellness-sad" },
];

interface MoodTrackerProps {
  onMoodSubmit: (mood: { emoji: string; label: string; value: string; timestamp: Date }) => void;
}

const MoodTracker = ({ onMoodSubmit }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.value);
    onMoodSubmit({
      ...mood,
      timestamp: new Date(),
    });
    
    toast({
      title: "Mood logged!",
      description: `Feeling ${mood.label.toLowerCase()} today`,
    });
    
    setTimeout(() => setSelectedMood(null), 2000);
  };

  return (
    <Card className="bg-gradient-wellness shadow-wellness border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-xl">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="secondary"
              size="lg"
              className={`h-20 flex-col gap-2 transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                selectedMood === mood.value 
                  ? 'ring-2 ring-primary bg-primary/20' 
                  : 'hover:bg-secondary/80'
              }`}
              onClick={() => handleMoodSelect(mood)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;