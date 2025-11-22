import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { 
    id: "bored", 
    label: "Bored",
    icon: "😐",
    description: "Need something interesting"
  },
  { 
    id: "hungry", 
    label: "Hungry",
    icon: "😋",
    description: "Craving something filling"
  },
  { 
    id: "sad", 
    label: "Melancholy",
    icon: "🥺",
    description: "Comfort food vibes"
  },
  { 
    id: "stressed", 
    label: "Stressed",
    icon: "😤",
    description: "Need to unwind"
  },
];

export const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {moods.map((mood) => (
        <Button
          key={mood.id}
          onClick={() => onMoodSelect(mood.id)}
          variant="outline"
          className={cn(
            "h-40 md:h-48 flex flex-col items-center justify-center gap-3 relative overflow-hidden transition-all duration-500 group",
            "glass hover:shadow-card",
            selectedMood === mood.id 
              ? "border-primary bg-gradient-subtle shadow-glow scale-105" 
              : "border-border hover:border-primary/50"
          )}
        >
          {/* Hover effect */}
          <div className={cn(
            "absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500",
            selectedMood === mood.id && "opacity-20"
          )} />
          
          <span className="text-5xl md:text-6xl relative z-10 transition-transform duration-300 group-hover:scale-110">
            {mood.icon}
          </span>
          <div className="text-center relative z-10">
            <span className="text-lg md:text-xl font-semibold block mb-1">
              {mood.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {mood.description}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};
