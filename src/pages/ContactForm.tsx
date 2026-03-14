import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone, User, HelpCircle, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { makeWebhookService } from "@/services/makeWebhook";
import SEOHead from "@/components/SEOHead";
import { seoPages } from "@/utils/seo";

// URL вашого Google Apps Script Web App
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyBYVfh9EpY49WF3ROqQQs88RoWjvCUhWckOZ6GKn87x8eJLiAU2QmpxKN1gt4nS9YcQ/exec";

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Отримуємо джерело переходу з URL параметрів
  const source = searchParams.get('source') || 'direct';
  const utm_source = searchParams.get('utm_source') || '';
  const utm_medium = searchParams.get('utm_medium') || '';
  const utm_campaign = searchParams.get('utm_campaign') || '';

  // Відстеження перегляду сторінки та скрол до верху
  useEffect(() => {
    // Скролимо до верху сторінки при відкритті форми контакту
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Відправляємо подію для Google Analytics або інших систем аналітики
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Contact Form',
        page_location: window.location.href,
        page_path: '/contact',
        source: source
      });
    }
  }, [source]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Підготовка даних для відправки з урахуванням джерела
      const dataToSend = {
        name: formData.name,
        phone: formData.phone,
        question: formData.question || "Питання не вказано",
        timestamp: new Date().toLocaleString('uk-UA', { 
          timeZone: 'Europe/Kiev',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: source,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        page_url: window.location.href
      };

      // Відправка даних паралельно в Google Таблицю та Make
      const promises = [];
      
      // 1. Відправка в Google Таблицю
      promises.push(
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        }).catch(error => {
          console.error('Помилка відправки в Google Sheets:', error);
          return null;
        })
      );

      // 2. Відправка в Make webhook
      promises.push(
        makeWebhookService.sendToMake(dataToSend).catch(error => {
          console.error('Помилка відправки в Make:', error);
          return { success: false, error: error.message };
        })
      );

      // Чекаємо виконання всіх запитів
      const results = await Promise.allSettled(promises);
      
      // Перевіряємо результати Make webhook
      const makeResult = results[1];
      if (makeResult.status === 'fulfilled' && makeResult.value && !makeResult.value.success) {
        console.warn('Make webhook помилка:', makeResult.value.error);
      }

      // Показуємо успішне повідомлення
      toast({
        title: "Успішно відправлено!",
        description: "Перенаправляємо на сторінку подяки...",
      });
      
      // Формуємо URL для сторінки подяки з усіма параметрами
      const thanksUrl = new URL('/thanks', window.location.origin);
      thanksUrl.searchParams.set('source', source);
      if (utm_source) thanksUrl.searchParams.set('utm_source', utm_source);
      if (utm_medium) thanksUrl.searchParams.set('utm_medium', utm_medium);
      if (utm_campaign) thanksUrl.searchParams.set('utm_campaign', utm_campaign);
      
      // Перенаправлення на сторінку подяки через 1 секунду
      setTimeout(() => {
        navigate(thanksUrl.pathname + thanksUrl.search);
      }, 1000);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Помилка відправки",
        description: "Спробуйте ще раз або зателефонуйте нам безпосередньо.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.contact} />
      <Header />
      
      <section className="py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            {/* Кнопка повернення */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-6 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>

            <div className="text-center space-y-4 mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-laser rounded-full flex items-center justify-center">
                <HelpCircle className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Виникли питання?
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Залишіть заявку і наш менеджер зв'яжеться з вами протягом 15 хвилин
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Ваше ім'я *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Введіть ваше ім'я"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Номер телефону *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+380 (XX) XXX-XX-XX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question" className="text-foreground font-medium">
                    Ваше питання
                  </Label>
                  <Textarea
                    id="question"
                    placeholder="Опишіть що вас цікавить..."
                    value={formData.question}
                    onChange={(e) => handleInputChange('question', e.target.value)}
                    className="bg-background border-border focus:ring-primary min-h-[120px] resize-none"
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full"
                  size="lg"
                  disabled={!formData.name || !formData.phone || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Відправка...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Надіслати заявку
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Натискаючи "Надіслати заявку", ви погоджуєтесь з обробкою персональних даних
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactForm;
