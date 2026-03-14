import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Phone, Menu, MessageCircle, Phone as PhoneIcon, Send, Instagram } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImage from "@/assets/3D logo.png";

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { serviceData } from "@/components/Services";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
  
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  const navigateToHome = () => {
    navigate('/');
    setIsOpen(false);
    // Scroll to top when navigating to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Contact and CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <a href="tel:+380934236139" className="hover:text-primary transition-colors font-medium">
              +380 (93) 423-61-39
            </a>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Відкрити меню">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8" role="navigation" aria-label="Мобільна навігація">
                  {serviceData.map(s => (
                    <button
                      key={s.url}
                      onClick={() => {
                        setIsOpen(false);
                        navigate(s.url);
                      }}
                      className="text-left text-lg text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                    >
                      {s.title}
                    </button>
                  ))}
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-lg text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    Про нас
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-lg text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    Контакти
                  </button>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+380934236139" className="hover:text-primary transition-colors font-medium">
                        +380 (93) 423-61-39
                      </a>
                    </div>
                    
                    {/* Mobile Social Media Icons */}
                    <div className="flex items-center gap-2 mb-4">
                      <a 
                        href="https://www.instagram.com/armind_industry/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://wa.me/380934236139" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <a 
                        href="viber://chat?number=380934236139" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Viber"
                      >
                        <PhoneIcon className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://t.me/+380934236139" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Telegram"
                      >
                        <Send className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/contact?source=header-mobile');
                      }}
                    >
                      Прорахунок
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => navigate('/contact?source=header-desktop')}
            aria-label="Замовити безкоштовну консультацію"
            className="hidden md:inline-flex"
          >
            Прорахунок
          </Button>
        </div>

        {/* Social Media Icons */}
        <div className="hidden lg:flex items-center gap-2">
          <a 
            href="https://www.instagram.com/armind_industry/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a 
            href="https://wa.me/380934236139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a 
            href="viber://chat?number=380934236139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="Viber"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <a 
            href="https://t.me/+380934236139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="Telegram"
          >
            <Send className="h-4 w-4" />
          </a>
        </div>
        
        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Головна навігація">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={() => scrollToSection('services')}>Послуги</NavigationMenuTrigger>
                <NavigationMenuContent className="w-[220px]">
                  <div className="flex flex-col p-2">
                    {serviceData.map(s => (
                      <NavigationMenuLink key={s.url} asChild>
                        <Link
                          to={s.url}
                          className="block px-3 py-2 text-foreground hover:bg-muted rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          {s.title}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors focus:outline-none rounded-sm px-2 py-1"
            aria-label="Перейти до секції про нас"
          >
            Про нас
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors focus:outline-none rounded-sm px-2 py-1"
            aria-label="Перейти до секції контактів"
          >
            Контакти
          </button>
        </nav>

        {/* Right side - Logo (clickable) */}
        <div 
          onClick={navigateToHome}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigateToHome();
            }
          }}
          aria-label="Перейти на головну сторінку"
        >
          <div className="relative">
            <img src={logoImage} alt="Логотип Армінд" className="h-8 w-8" />
          </div>
          <span className="text-xl font-bold text-foreground">Армінд</span>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;