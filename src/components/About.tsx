import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Users, 
  Settings, 
  Award, 
  Target, 
  Lightbulb, 
  Factory, 
  Ruler, 
  FileText, 
  Package,
  ArrowRight,
  CheckCircle2,
  Building2,
  PencilRuler,
  Wrench,
  HardHat,
  Home,
  Cpu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import aboutBackground from "@/assets/bg-for-about.jpg";

const About = () => {
  const navigate = useNavigate();
  
  const targetClients = [
    "Виробничі підприємства",
    "меблеві виробництва",
    "будівельні компанії",
    "Архітектори та дизайнери",
    "інженерні компанії",
    "підприємства, яким потрібні нестандартні металеві деталі"
  ];

  const advantages = [
    {
      icon: Factory,
      title: "Власне виробництво",
      description: "Усі роботи виконуються на нашому обладнанні без посередників."
    },
    {
      icon: Settings,
      title: "Повний цикл виробництва",
      description: "Можемо виконати всі етапи: різка, згинання, зварювання та фарбування."
    },
    {
      icon: Ruler,
      title: "Точність і повторюваність",
      description: "Сучасне обладнання дозволяє отримувати однакову якість у кожній партії."
    },
    {
      icon: FileText,
      title: "Робота з кресленнями та без",
      description: "Можемо виготовити деталь навіть за ескізом або фото."
    },
    {
      icon: Package,
      title: "Працюємо з різними обсягами",
      description: "Від одиничних деталей до серійного виробництва."
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${aboutBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Декоративний градієнт */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Заголовок секції */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              ДЛЯ КОГО МИ ПРАЦЮЄМО
            </span>
          </h2>
          <p className="text-xl text-white/80 leading-relaxed uppercase tracking-wide">
            ЧОГО ОБИРАЮТЬ АРМІНД
          </p>
        </div>

        {/* Клієнти та переваги */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Клієнти - ліва колонка */}
          <div>
            <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 h-full">
              <div className="space-y-4">
                {targetClients.map((client, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-white text-lg">{client}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Переваги - права колонка */}
          <div>
            <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 h-full">
              <div className="space-y-6">
                {advantages.map((advantage, index) => {
                  const Icon = advantage.icon;
                  return (
                    <div key={index} className="flex gap-4 group">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-all"></div>
                        <div className="relative p-3 bg-gradient-laser rounded-xl">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {advantage.title}
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="relative overflow-hidden bg-gradient-laser p-1">
            <div className="bg-black/90 backdrop-blur-xl rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Готові розпочати співпрацю?
                    </h3>
                    <p className="text-white/70 max-w-md">
                      Розкажіть нам про ваш проект — підберемо оптимальне рішення
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  onClick={() => navigate('/contact?source=about')}
                  className="group whitespace-nowrap"
                >
                  Обговорити проект
                  <Zap className="ml-2 h-4 w-4 group-hover:animate-laser-pulse" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;