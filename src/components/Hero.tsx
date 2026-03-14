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

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              Виготовлення металевих деталей 
            </span>
            <br />
            та виробів під замовлення
          </h1>

          <p className="text-white text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Лазерна різка, згинання, зварювання та порошкове фарбування. 
            Працюємо з виробництвом, будівельними компаніями та інженерними проєктами.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-laser">✔</span>
              <span>від 1 деталі</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-laser">✔</span>
              <span>партії</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-laser">✔</span>
              <span>повний цикл виробництва</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-laser">✔</span>
              <span>власне обладнання</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/contact?source=hero')} 
              className="group"
            >
              Замовити прорахунок
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToServices}>
              Наші послуги
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;