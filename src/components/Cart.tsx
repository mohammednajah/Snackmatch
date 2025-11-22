import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const itemsText = items
      .map(item => `${item.quantity}x ${item.name}`)
      .join(', ');
    
    const searchQuery = encodeURIComponent(itemsText);
    window.open(`https://www.swiggy.com/search?query=${searchQuery}`, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md glass-strong">
        <SheetHeader>
          <SheetTitle className="text-2xl font-display">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-lg text-muted-foreground">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Add some delicious items to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 mt-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 glass p-4 rounded-lg">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-muted/30 rounded-lg text-2xl">
                        🍽️
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">₹{item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 glass"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 glass"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4">
              <Separator className="bg-border" />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary text-2xl">₹{total}</span>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full h-12 text-lg font-semibold bg-gradient-gold hover:shadow-glow transition-all"
                size="lg"
              >
                Order on Swiggy
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Redirects to Swiggy to complete your order
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
