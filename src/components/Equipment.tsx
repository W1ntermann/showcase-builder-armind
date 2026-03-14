import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, Award, Eye } from "lucide-react";

const Equipment = () => {
  const equipment = [
    {
      id: 1,
      name: "Лазерний комплекс TRUMPF TruLaser 3030",
      category: "Лазерна різка",
      power: "12 кВт",
      workArea: "3000×1500 мм",
      maxThickness: "25 мм",
      features: ["Волоконний лазер", "Автоматична заміна сопел", "Система контролю якості"],
      image: "/api/placeholder/400/300", // Placeholder для зображення
      description: "Високопродуктивний лазерний комплекс для точної різки металу з мінімальними деформаціями."
    },
    {
      id: 2,
      name: "Гідравлічний прес-гальмо AMADA HFE 2204",
      category: "Згинання металу",
      power: "220 тонн",
      workArea: "4000 мм",
      maxThickness: "10 мм",
      features: ["ЧПУ управління", "3D симуляція згину", "Автоматичне позиціонування"],
      image: "/api/placeholder/400/300",
      description: "Прецизійне обладнання для складного згинання металевих деталей з високою повторюваністю."
    },
    {
      id: 3,
      name: "Лазерна зварювальна система IPG YLS-2000",
      category: "Лазерне зварювання",
      power: "2 кВт",
      workArea: "1000×800 мм",
      maxThickness: "6 мм",
      features: ["Безконтактне зварювання", "Мінімальна ЗТВ", "Програмне управління"],
      image: "/api/placeholder/400/300",
      description: "Сучасна система лазерного зварювання для високоякісних з'єднань тонкостінних конструкцій."
    },
    {
      id: 4,
      name: "Лінія порошкового фарбування GEMA OptiGun",
      category: "Порошкове фарбування",
      power: "100 кВт",
      workArea: "6000×3000×2500 мм",
      maxThickness: "120 мкм",
      features: ["Автоматичне нанесення", "Рекуперація порошку", "Контроль товщини"],
      image: "/api/placeholder/400/300",
      description: "Повністю автоматизована лінія для якісного порошкового фарбування великогабаритних виробів."
    },
    {
      id: 5,
      name: "Плазмовий різак Hypertherm Powermax 125",
      category: "Плазмова різка",
      power: "125 А",
      workArea: "2000×1000 мм",
      maxThickness: "38 мм",
      features: ["Високошвидкісна різка", "Чисті кромки", "Низьке споживання газу"],
      image: "/api/placeholder/400/300",
      description: "Потужна плазмова система для швидкої різки товстого металу з відмінною якістю кромки."
    },
    {
      id: 6,
      name: "Координатно-вимірювальна машина ZEISS CONTURA",
      category: "Контроль якості",
      power: "—",
      workArea: "700×1000×600 мм",
      maxThickness: "—",
      features: ["3D вимірювання", "Точність ±2 мкм", "Автоматичний звіт"],
      image: "/api/placeholder/400/300",
      description: "Прецизійне обладнання для контролю геометричних параметрів готових виробів."
    }
  ];

  return (
    <section id="equipment" className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Наше <span className="bg-gradient-laser bg-clip-text text-transparent">обладнання</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Сучасний парк високотехнологічного обладнання від провідних світових виробників 
            забезпечує найвищу якість та продуктивність
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 group">
              {/* Equipment Image */}
              <div className="relative h-48 bg-muted/20 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback якщо зображення не завантажилось
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-metal">
                        <div class="text-center">
                          <div class="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg class="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <p class="text-foreground font-medium">${item.category}</p>
                        </div>
                      </div>
                    `;
                  }}
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Equipment Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Technical Specs */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Потужність:</span>
                    <span className="text-foreground font-medium">{item.power}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Робоча зона:</span>
                    <span className="text-foreground font-medium">{item.workArea}</span>
                  </div>
                  {item.maxThickness !== "—" && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Макс. товщина:</span>
                      <span className="text-foreground font-medium">{item.maxThickness}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Settings className="h-4 w-4 text-primary" />
                    Особливості:
                  </h4>
                  <div className="space-y-1">
                    {item.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                    {item.features.length > 2 && (
                      <div className="text-xs text-primary">
                        +{item.features.length - 2} більше
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Детальніше
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-metal border-border shadow-metal max-w-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Професійне обладнання світового рівня
                </h3>
                <p className="text-muted-foreground">
                  Наш парк обладнання забезпечує найвищу якість обробки металу 
                  та дотримання найсуворіших стандартів виробництва
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Equipment;
