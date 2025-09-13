import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodEntry {
  emoji: string;
  label: string;
  value: string;
  timestamp: Date;
}

interface MoodChartProps {
  moodHistory: MoodEntry[];
}

const moodValues = {
  sad: 1,
  anxious: 2,
  tired: 3,
  calm: 4,
  happy: 5,
  energy: 6,
};

const MoodChart = ({ moodHistory }: MoodChartProps) => {
  const chartData = moodHistory
    .slice(-7) // Last 7 entries
    .map((mood, index) => ({
      day: `Day ${index + 1}`,
      mood: moodValues[mood.value as keyof typeof moodValues] || 3,
      emoji: mood.emoji,
      label: mood.label,
    }));

  if (chartData.length === 0) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Mood Trends</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Start tracking your mood to see trends!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle>Mood Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                domain={[1, 6]}
                ticks={[1, 2, 3, 4, 5, 6]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <div className="text-xs text-muted-foreground">
            1: Sad • 2: Anxious • 3: Tired • 4: Calm • 5: Happy • 6: Energetic
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;