import { useState } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { SnackCard } from "@/components/SnackCard";
import { TopSnacks } from "@/components/TopSnacks";
import { Cart } from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles } from "lucide-react";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (snack: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === snack.id);
      if (existing) {
        return prev.map(item => 
          item.id === snack.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...snack, quantity: 1 }];
    });
  };

  const removeFromCart = (snackId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== snackId));
  };

  const updateQuantity = (snackId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(snackId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === snackId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              SnackMatch
            </h1>
          </div>
          <Button 
            onClick={() => setShowCart(!showCart)}
            variant="outline"
            size="icon"
            className="relative hover:shadow-glow transition-all glass"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-gold text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-glow">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <div className="inline-block mb-6">
            <span className="text-6xl md:text-7xl">✨</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground leading-tight">
            Discover Your
            <span className="block bg-gradient-gold bg-clip-text text-transparent">
              Perfect Snack
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tell us your mood, and we'll curate the perfect snack experience. 
            Premium flavors, perfectly matched to your moment.
          </p>
        </section>

        {/* Mood Selector */}
        <MoodSelector 
          selectedMood={selectedMood} 
          onMoodSelect={setSelectedMood}
        />

        {/* Snack Results */}
        {selectedMood && (
          <section className="mt-16 md:mt-24">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-3 text-foreground">
                Curated for Your Mood
              </h3>
              <p className="text-muted-foreground">
                Feeling {selectedMood}? Here's what we recommend.
              </p>
            </div>
            <SnackCard mood={selectedMood} onAddToCart={addToCart} />
          </section>
        )}

        {/* Top Snacks Section */}
        <section className="mt-20 md:mt-32">
          <TopSnacks onAddToCart={addToCart} />
        </section>
      </main>

      {/* Cart Drawer */}
      <Cart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Footer */}
      <footer className="relative mt-32 py-12 glass-strong border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Crafted with precision • SnackMatch 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
