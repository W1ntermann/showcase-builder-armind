import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroVideo from "@/assets/hero-main.mp4"; // або .webm

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          {/* Додайте WebM для кращої підтримки браузерів */}
          {/* <source src={heroVideoWebm} type="video/webm" /> */}
        </video>
        
        {/* Затемнення поверх відео */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              Виготовлення металевих деталей 
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
              та виробів під замовлення
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Лазерна різка, згинання, зварювання та порошкове фарбування. 
            Працюємо з виробництвом, будівельними компаніями та інженерними проєктами.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-4 mb-8 md:mb-12 px-2">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
              <span className="text-laser text-sm sm:text-base flex-shrink-0">✓</span>
              <span>від 1 деталі</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
              <span className="text-laser text-sm sm:text-base flex-shrink-0">✓</span>
              <span>партії</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
              <span className="text-laser text-sm sm:text-base flex-shrink-0">✓</span>
              <span>повний цикл виробництва</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
              <span className="text-laser text-sm sm:text-base flex-shrink-0">✓</span>
              <span>власне обладнання</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button 
              variant="hero" 
              size="default" 
              onClick={() => navigate('/contact?source=hero')} 
              className="group text-sm sm:text-base py-5 sm:py-6 w-full sm:w-auto"
            >
              Замовити прорахунок
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="default" 
              onClick={scrollToServices}
              className="text-sm sm:text-base py-5 sm:py-6 w-full sm:w-auto"
            >
              Наші послуги
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;