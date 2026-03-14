import React from 'react';
import { Card } from "@/components/ui/card";

const HowToOrder = () => {
  const steps = [
    {
      number: "01",
      title: "НАДСИЛАЄТЕ ЗАПИТ",
      description: "Ви надсилаєте креслення, файл або короткий опис деталі"
    },
    {
      number: "02",
      title: "РОЗРАХУНОК ВАРТОСТІ",
      description: "Оцінюємо обсяг і надаємо кошторис в найкоротші строки"
    },
    {
      number: "03",
      title: "ДОГОВІР І ПЕРЕДОПЛАТА",
      description: "Офіційно оформлюємо замовлення і фіксуємо строки виробництва"
    },
    {
      number: "04",
      title: "ВИРОБНИЦТВО + ФОТО",
      description: "Виконуємо всі необхідні етапи, надсилаємо фото перед відвантаженням"
    },
    {
      number: "05",
      title: "ПЕРЕДАЧА ЗАМОВНИКУ",
      description: "Передаємо готові деталі або конструкції зручним для вас способом"
    }
  ];

  return (
    <section id="how-to-order" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Заголовок секції */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              ЯК МИ ПРАЦЮЄМО
            </span>
          </h2>
          <p className="text-white text-xl text-muted-foreground max-w-3xl mx-auto">
            Простий та прозорий процес співпраці від запиту до готового виробу
          </p>
        </div>

        {/* Сітка кроків - Варіант 2 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-4 bg-card border-border shadow-card hover:shadow-metal transition-all duration-300 group h-full"
            >
              <div className="text-4xl md:text-5xl font-black bg-gradient-laser bg-clip-text text-transparent mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                {step.number}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 break-words leading-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;