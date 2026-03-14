import { Phone, Mail, MapPin, Instagram, MessageCircle, Phone as PhoneIcon, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/3D logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="Логотип Армінд" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">ARMIND</span>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Armada Industry - це Повний цикл обробки металу. Виробництво, інженерний підхід, відповідальність за результат. Від проєктування до порошкового фарбування - все в одному виробництві
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+380934236139" className="hover:text-primary transition-colors font-medium">
                  +380 (93) 423-61-39
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:armindind@gmail.com" 
                  className="hover:text-primary transition-colors font-medium"
                >
                  armindind@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Instagram className="h-4 w-4" />
                <a 
                  href="https://www.instagram.com/armind_industry/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-medium"
                >
                  @armind_industry
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>вул. Миколи Боровського, 28, м. Одеса, 65041</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Послуги</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/laser-cutting" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Лазерна різка металу
                </Link>
              </li>
              <li>
                <Link 
                  to="/powder-coating" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Порошкове фарбування
                </Link>
              </li>
              <li>
                <Link 
                  to="/metal-welding" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Зварювання металевих деталей
                </Link>
              </li>
              <li>
                <Link 
                  to="/precise-bending" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Гнуття металу
                </Link>
              </li>
              <li>
                <Link 
                  to="/complex-manufacturing" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Металеві деталі на замовлення
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Режим роботи</h4>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Понеділок - П'ятниця:</span>
                <span className="text-foreground font-medium">8:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Субота:</span>
                <span className="text-foreground font-medium">9:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Неділя:</span>
                <span className="text-muted-foreground">Вихідний</span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">Соцмережі</h4>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/armind_industry/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/380934236139" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="viber://chat?number=380934236139" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Viber"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/+380934236139" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Армада Індастрі. Всі права захищені. | Професійна обробка металу в Одесі
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;