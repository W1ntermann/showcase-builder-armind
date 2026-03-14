import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-laser bg-clip-text text-transparent">Контакти</span>
          </h2>
          <p className="text-white text-xl text-muted-foreground max-w-3xl mx-auto">
            Готові обговорити ваш проект? Зв'яжіться з нами будь-яким зручним способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Call to Action */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-metal border-border shadow-metal">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6 animate-laser-pulse" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Безкоштовна консультація
                </h3>
                <p className="text-white text-muted-foreground mb-6 leading-relaxed">
                  Наші фахівці допоможуть підібрати оптимальне рішення для вашого проекту, 
                  розрахують вартість та терміни виконання.
                </p>
                <div className="space-y-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.location.href = 'tel:+380934236139'}
                    aria-label="Замовити дзвінок"
                  >
                    Замовити дзвінок
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.open('https://t.me/+380934236139', '_blank')}
                    aria-label="Написати в Telegram"
                  >
                    Написати в Telegram
                  </Button>
                </div>
              </div>
            </Card>

            {/* Карта */}
            <Card className="p-0 overflow-hidden border-border shadow-card">
              <div className="h-64 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.3!2d30.66366!3d46.48554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c632783c000001%3A0x1!2z0LLRg9C7LiDQnNC40LrQvtC70Lgg0JHQvtGA0L7QstGB0YzQutC-0LPQviwgMjgsINCe0LTQtdGB0LAsIDY1MDc1!5e0!3m2!1suk!2sua!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Наше розташування: вул. Миколи Боровського, 28, Одеса"
                />
              </div>
              <div className="p-4 bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Наша адреса</h4>
                </div>
                <p className="text-foreground mb-1">вул. Миколи Боровського, 28</p>
                <p className="text-muted-foreground text-sm">м. Одеса, 65000</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => window.open('https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%8F+%D0%91%D0%BE%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE,+28,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%B0,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+65000/@46.485387,30.664776,17z/data=!3m1!4b1!4m6!3m5!1s0x40c632783c000001:0x9d3fa63bab8c9b1f!8m2!3d46.485387!4d30.664776!16s%2Fg%2F11c2m5z5_9?entry=ttu', '_blank')}
                >
                  Прокласти маршрут
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Телефон</h3>
                  <a href="tel:+380934236139" className="block text-2xl font-bold text-primary hover:text-primary/80 transition-colors mb-2">
                    +380 (93) 423-61-39
                  </a>
                  <p className="text-muted-foreground">Пн-Пт: 8:00-18:00, Сб: 9:00-14:00</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-xl font-semibold text-primary mb-1">armindind@gmail.com</p>
                  <p className="text-muted-foreground">Відповідаємо протягом 1 години</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/armind_industry/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-xl font-semibold text-primary hover:text-primary/80 transition-colors mb-1"
                  >
                    @armind_industry
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Адреса</h3>
                  <p className="text-foreground font-medium mb-1">вул. Миколи Боровського, 28</p>
                  <p className="text-foreground font-medium mb-1">м. Одеса, 65000</p>
                  <p className="text-muted-foreground">Зручна транспортна розв'язка</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Режим роботи</h3>
                  <div className="space-y-1">
                    <p className="text-foreground">Пн-Пт: <span className="font-medium">8:00 - 18:00</span></p>
                    <p className="text-foreground">Субота: <span className="font-medium">9:00 - 14:00</span></p>
                    <p className="text-muted-foreground">Неділя: вихідний</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Social Media Links */}
      </div>
    </section>
  );
};

export default Contact;