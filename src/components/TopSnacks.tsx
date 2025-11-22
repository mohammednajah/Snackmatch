import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star, ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFoodImages } from "@/hooks/useFoodImages";

interface TopSnacksProps {
  onAddToCart: (snack: any) => void;
}

const topSnacks = [
  { 
    id: "top-1",
    name: "Margherita Pizza", 
    rating: 4.9, 
    orders: 342,
    price: 180,
    imagePrompt: "gourmet margherita pizza with fresh basil"
  },
  { 
    id: "top-2",
    name: "Classic Burger", 
    rating: 4.8, 
    orders: 289,
    price: 250,
    imagePrompt: "gourmet burger with fresh ingredients"
  },
  { 
    id: "top-3",
    name: "Vanilla Bean Ice Cream", 
    rating: 4.7, 
    orders: 256,
    price: 200,
    imagePrompt: "premium vanilla ice cream in elegant bowl"
  },
  { 
    id: "top-4",
    name: "Truffle Fries", 
    rating: 4.6, 
    orders: 234,
    price: 150,
    imagePrompt: "gourmet french fries with truffle"
  },
];

export const TopSnacks = ({ onAddToCart }: TopSnacksProps) => {
  const { toast } = useToast();
  const { generateFoodImage, loadingImages } = useFoodImages();
  const [snackImages, setSnackImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      for (const snack of topSnacks) {
        if (!snackImages[snack.id]) {
          const imageUrl = await generateFoodImage(snack.name, snack.imagePrompt);
          if (imageUrl) {
            setSnackImages(prev => ({ ...prev, [snack.id]: imageUrl }));
          }
        }
      }
    };
    loadImages();
  }, []);

  const handleAddToCart = (snack: any) => {
    onAddToCart({
      ...snack,
      image: snackImages[snack.id]
    });
    toast({
      title: "Added to cart",
      description: `${snack.name} is ready for checkout`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-10">
        <TrendingUp className="h-7 w-7 text-primary" />
        <h3 className="text-3xl md:text-4xl font-display font-bold text-center">
          Trending Today
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topSnacks.map((snack) => {
          const isLoading = loadingImages[snack.name];
          const imageUrl = snackImages[snack.id];

          return (
            <Card 
              key={snack.id}
              className="glass-strong hover:shadow-card transition-all duration-500 hover:scale-[1.02] overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-muted/30 overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  </div>
                ) : imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={snack.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    🍽️
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-2 line-clamp-1">
                  {snack.name}
                </h4>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{snack.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({snack.orders})
                  </span>
                </div>

                <div className="text-xl font-bold text-primary mb-4">
                  ₹{snack.price}
                </div>

                <Button 
                  onClick={() => handleAddToCart(snack)}
                  className="w-full bg-gradient-gold hover:shadow-glow transition-all"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
