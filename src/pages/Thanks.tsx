import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Home, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { seoPages } from "@/utils/seo";

const Thanks = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Отримуємо параметри з URL
  const source = searchParams.get('source') || 'direct';
  const utm_source = searchParams.get('utm_source') || '';
  const utm_medium = searchParams.get('utm_medium') || '';
  const utm_campaign = searchParams.get('utm_campaign') || '';

  useEffect(() => {
    // Скролимо до верху сторінки
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Відправляємо подію конверсії для Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Замініть на ваші ID
        'value': 1.0,
        'currency': 'UAH'
      });

      // Відправляємо подію перегляду сторінки подяки
      window.gtag('event', 'page_view', {
        page_title: 'Thank You Page',
        page_location: window.location.href,
        page_path: '/thanks',
        source: source,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign
      });

      // Відправляємо кастомну подію успішної конверсії
      window.gtag('event', 'form_submit_success', {
        event_category: 'engagement',
        event_label: 'contact_form',
        source: source,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign
      });
    }

    // Відправляємо подію для Facebook Pixel (якщо налаштований)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        source: source,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign
      });
    }

    // Відправляємо подію для Yandex.Metrica (якщо налаштована)
    if (typeof window !== 'undefined' && window.ym && window.YANDEX_METRICA_ID) {
      window.ym(window.YANDEX_METRICA_ID, 'reachGoal', 'CONTACT_FORM_SUCCESS', {
        source: source,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign
      });
    }
  }, [source, utm_source, utm_medium, utm_campaign]);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.thanks} />
      <Header />
      
      <section className="py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            {/* Успішне повідомлення */}
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Дякуємо за заявку!
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Ваша заявка успішно відправлена. Наш менеджер зв'яжеться з вами протягом 15 хвилин.
                </p>
              </div>

              {/* Інформація про наступні кроки */}
              <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
                <h3 className="font-semibold text-foreground mb-3">Що далі?</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">1</span>
                    </div>
                    <p>Наш менеджер зателефонує вам протягом 15 хвилин</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">2</span>
                    </div>
                    <p>Обговоримо деталі вашого проекту та надамо консультацію</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">3</span>
                    </div>
                    <p>Розрахуємо вартість та терміни виконання робіт</p>
                  </div>
                </div>
              </div>

              {/* Контактна інформація */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Або зателефонуйте нам прямо зараз</h3>
                <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-primary">
                  <Phone className="h-5 w-5" />
                  <a href="tel:+380934236139" className="hover:underline">
                    +380 (93) 423-61-39
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Працюємо: Пн-Пт 8:00-18:00, Сб 9:00-14:00
                </p>
              </div>

              {/* Кнопки навігації */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  На головну
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Thanks;
