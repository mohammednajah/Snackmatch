import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useFoodImages = () => {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const generateFoodImage = async (snackName: string, description: string) => {
    setLoadingImages(prev => ({ ...prev, [snackName]: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-food-images', {
        body: { snackName, description }
      });

      if (error) throw error;

      return data.imageUrl;
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast({
        title: "Image generation failed",
        description: error.message || "Could not generate food image",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoadingImages(prev => ({ ...prev, [snackName]: false }));
    }
  };

  return { generateFoodImage, loadingImages };
};
