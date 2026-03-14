import { Card } from "@/components/ui/card";
import { Factory, Settings, Ruler, FileText, Package, Zap } from "lucide-react";
import aboutBackground from "@/assets/bg-for-about.jpg"; // Додайте ваш файл з картинкою

const Advantages = () => {
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Заголовок секції */}


        {/* Клієнти та переваги */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Клієнти - ліва колонка */}
          <div>
            <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 h-full">
              <h3 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-laser bg-clip-text text-transparent">
                ДЛЯ КОГО МИ ПРАЦЮЄМО
              </h3>
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
              <h3 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-laser bg-clip-text text-transparent">
                ЧОГО ОБИРАЮТЬ АРМІНД
              </h3>
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

        {/* Додатковий заклик до дії */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white">
            <Zap className="h-8 w-8 text-primary animate-laser-pulse" />
            <div className="text-left">
              <div className="text-lg font-semibold text-white">
                Готові до співпраці?
              </div>
              <div className="text-white/90">
                Зв'яжіться з нами для консультації та розрахунку вартості
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;