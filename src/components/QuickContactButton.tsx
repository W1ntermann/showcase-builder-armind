import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { useMakeWebhook } from "@/hooks/useMakeWebhook";
import { useToast } from "@/hooks/use-toast";

interface QuickContactButtonProps {
  variant?: "default" | "outline" | "hero";
  size?: "sm" | "lg" | "default";
  className?: string;
}

/**
 * Компонент швидкого контакту з інтеграцією Make
 */
const QuickContactButton = ({ 
  variant = "hero", 
  size = "default",
  className 
}: QuickContactButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { sendData, isLoading } = useMakeWebhook();
  const { toast } = useToast();

  const handleQuickContact = async () => {
    try {
      // Відправляємо швидку заявку в Make
      await sendData({
        name: "Швидкий контакт",
        phone: "Не вказано",
        question: "Клієнт натиснув кнопку швидкого контакту",
        timestamp: new Date().toLocaleString('uk-UA', { 
          timeZone: 'Europe/Kiev',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: "quick-contact-button",
        page_url: window.location.href
      });

      toast({
        title: "Заявку відправлено!",
        description: "Ми зателефонуємо вам найближчим часом.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Помилка",
        description: "Не вдалося відправити заявку. Спробуйте ще раз.",
      });
    }
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Швидкий зв'язок
          </h3>
          <p className="text-muted-foreground mb-6">
            Натисніть кнопку нижче і наш менеджер зателефонує вам протягом 15 хвилин.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleQuickContact}
              variant="hero"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Відправка...
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Замовити дзвінок
                </>
              )}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              disabled={isLoading}
            >
              Скасувати
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setIsOpen(true)}
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Швидкий зв'язок
    </Button>
  );
};

export default QuickContactButton;
