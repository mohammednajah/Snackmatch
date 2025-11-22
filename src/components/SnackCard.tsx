import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useFoodImages } from "@/hooks/useFoodImages";

interface SnackCardProps {
  mood: string;
  onAddToCart: (snack: any) => void;
}

const snackDatabase: Record<string, any[]> = {
  bored: [
    { 
      id: "popcorn-1", 
      name: "Caramel Popcorn", 
      description: "Sweet, crunchy kernels with premium caramel coating", 
      price: 120,
      imagePrompt: "gourmet caramel popcorn in elegant bowl"
    },
    { 
      id: "chips-1", 
      name: "Artisan Pretzel Twists", 
      description: "Hand-twisted pretzels with sea salt crystals", 
      price: 80,
      imagePrompt: "artisan pretzel twists with sea salt"
    },
    { 
      id: "candy-1", 
      name: "Sour Gummies", 
      description: "Premium gummy candies with natural fruit flavors", 
      price: 60,
      imagePrompt: "colorful gourmet sour gummy candies"
    },
  ],
  hungry: [
    { 
      id: "burger-1", 
      name: "Gourmet Mini Sliders", 
      description: "Wagyu beef sliders with truffle aioli", 
      price: 250,
      imagePrompt: "gourmet mini burger sliders with premium ingredients"
    },
    { 
      id: "pizza-1", 
      name: "Wood-Fired Pizza Bites", 
      description: "Neapolitan-style pizza with buffalo mozzarella", 
      price: 180,
      imagePrompt: "gourmet mini pizza bites with fresh mozzarella"
    },
    { 
      id: "fries-1", 
      name: "Truffle Parmesan Fries", 
      description: "Crispy fries with black truffle and aged parmesan", 
      price: 150,
      imagePrompt: "gourmet loaded fries with truffle and parmesan"
    },
  ],
  sad: [
    { 
      id: "ice-cream-1", 
      name: "Belgian Chocolate Ice Cream", 
      description: "Rich dark chocolate ice cream with cookie dough chunks", 
      price: 200,
      imagePrompt: "premium chocolate ice cream in elegant bowl"
    },
    { 
      id: "chocolate-1", 
      name: "Dark Chocolate Bar", 
      description: "70% single-origin cacao from Ecuador", 
      price: 100,
      imagePrompt: "premium dark chocolate bar pieces"
    },
    { 
      id: "cake-1", 
      name: "Chocolate Decadence", 
      description: "Triple layer chocolate cake with ganache", 
      price: 220,
      imagePrompt: "elegant chocolate cake slice"
    },
  ],
  stressed: [
    { 
      id: "tea-1", 
      name: "Chamomile Tea Set", 
      description: "Organic chamomile with artisan butter cookies", 
      price: 90,
      imagePrompt: "elegant tea cup with cookies on marble surface"
    },
    { 
      id: "nuts-1", 
      name: "Premium Mixed Nuts", 
      description: "Roasted cashews, almonds, and macadamia nuts", 
      price: 130,
      imagePrompt: "gourmet mixed nuts in wooden bowl"
    },
    { 
      id: "fruit-1", 
      name: "Exotic Fruit Platter", 
      description: "Dragon fruit, mango, and premium berries", 
      price: 170,
      imagePrompt: "beautiful fresh fruit platter arrangement"
    },
  ],
};

export const SnackCard = ({ mood, onAddToCart }: SnackCardProps) => {
  const { toast } = useToast();
  const { generateFoodImage, loadingImages } = useFoodImages();
  const [currentSnackIndex, setCurrentSnackIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [snackImages, setSnackImages] = useState<Record<string, string>>({});
  
  const snacks = snackDatabase[mood] || [];
  const currentSnack = snacks[currentSnackIndex];

  useEffect(() => {
    const loadImage = async () => {
      if (currentSnack && !snackImages[currentSnack.id]) {
        const imageUrl = await generateFoodImage(currentSnack.name, currentSnack.imagePrompt);
        if (imageUrl) {
          setSnackImages(prev => ({ ...prev, [currentSnack.id]: imageUrl }));
        }
      }
    };
    loadImage();
  }, [currentSnack?.id]);

  const handleNextSnack = () => {
    setCurrentSnackIndex((prev) => (prev + 1) % snacks.length);
    setRating(0);
  };

  const handleRating = (stars: number) => {
    setRating(stars);
    toast({
      title: "Rating saved",
      description: `You rated ${currentSnack.name} ${stars} stars`,
    });
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...currentSnack,
      image: snackImages[currentSnack.id]
    });
    toast({
      title: "Added to cart",
      description: `${currentSnack.name} is ready for checkout`,
    });
  };

  if (!currentSnack) return null;

  const isLoading = loadingImages[currentSnack.name];
  const currentImage = snackImages[currentSnack.id];

  return (
    <Card className="max-w-3xl mx-auto glass-strong shadow-card overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
        {/* Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/30">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : currentImage ? (
            <img 
              src={currentImage} 
              alt={currentSnack.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              🍽️
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-3xl md:text-4xl font-display font-bold mb-3 text-foreground">
              {currentSnack.name}
            </h4>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {currentSnack.description}
            </p>

            <div className="text-3xl font-bold text-primary mb-6">
              ₹{currentSnack.price}
            </div>

            {/* Rating */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-colors",
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleAddToCart}
              className="h-12 text-base font-semibold bg-gradient-gold hover:shadow-glow transition-all"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <Button
              onClick={handleNextSnack}
              variant="outline"
              className="h-12 text-base font-semibold glass"
              size="lg"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Next Suggestion
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
