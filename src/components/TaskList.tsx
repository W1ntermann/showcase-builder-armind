import React, { memo, useMemo } from 'react';
import { Zap, Calendar, ArrowRight, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Типізація
interface Task {
  id: number;
  text: string;
  description: string;
  specs?: string[];
}

interface TaskListProps {
  className?: string;
  onConsultationClick?: () => void;
  onPortfolioClick?: () => void;
}

// Константи
const TASKS: Task[] = [
  {
    id: 1,
    text: "Виготовлення металевих деталей за кресленням",
    description: "Точність до 0.1 мм за вашими кресленнями",
    specs: ["Точність 0.1мм", "Лазерне різання", "Гнуття"]
  },
  {
    id: 2,
    text: "Виробництво корпусів для обладнання",
    description: "Міцні та надійні корпуси будь-якої складності",
    specs: ["Нержавійка", "Алюміній", "Сталь"]
  },
  {
    id: 3,
    text: "Виготовлення каркасів для меблів",
    description: "Естетичні та довговічні металеві конструкції",
    specs: ["Дизайн", "Зварювання", "Полірування"]
  },
  {
    id: 4,
    text: "Виробництво металевих конструкцій",
    description: "Від невеликих елементів до складних споруд",
    specs: ["Монтаж", "Розрахунки", "Кріплення"]
  },
  {
    id: 5,
    text: "Фарбування металевих деталей до 6 м",
    description: "Порошкове фарбування в будь-який колір RAL",
    specs: ["RAL Classic", "RAL Effect", "Термостійке"]
  },
  {
    id: 6,
    text: "Виготовлення індивідуальних виробів з металу",
    description: "Реалізуємо ваші унікальні ідеї",
    specs: ["3D моделювання", "Прототипування", "Дизайн"]
  }
];

// Оптимізований компонент картки задачі
const TaskCard = memo(({ task, index }: { task: Task; index: number }) => {
  const delay = useMemo(() => `${index * 100}ms`, [index]);

  return (
    <Card 
      className="
        group
        relative
        overflow-hidden
        bg-gradient-to-br
        from-card
        to-card/95
        backdrop-blur-sm
        border-border
        hover:border-primary/50
        transition-all
        duration-700
        hover:shadow-[0_0_40px_rgba(0,168,107,0.2)]
        animate-fade-in-up
        will-change-transform
      "
      style={{ animationDelay: delay }}
    >
      {/* Фонові ефекти */}
      <div className="absolute inset-0 bg-gradient-metal opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
      <div className="absolute -inset-1 bg-gradient-laser opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700" />
      
      {/* Анімована рамка */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-x" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-x-reverse" />
      </div>
      
      <div className="relative p-6 lg:p-8">
        <div className="flex items-start gap-4">
          {/* Велика галочка замість іконки */}
          <div className="relative flex-shrink-0">
            <div className="
              w-14 h-14
              bg-gradient-to-br
              from-primary/20
              to-primary/5
              rounded-2xl
              flex items-center justify-center
              group-hover:scale-110
              group-hover:rotate-3
              transition-all
              duration-500
              border
              border-primary/20
              group-hover:border-primary/50
            ">
              <span className="
                text-primary
                text-4xl
                font-bold
                group-hover:scale-125
                transition-all
                duration-300
              ">
                ✓
              </span>
            </div>
            {/* Пульсуюче коло */}
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100" />
          </div>

          {/* Контент */}
          <div className="flex-1">
            <h3 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {task.text}
            </h3>
            
            {/* Опис */}
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              {task.description}
            </p>

            {/* Технічні характеристики */}
            <div className="flex flex-wrap gap-2 mt-4">
              {task.specs?.map((spec, idx) => (
                <span 
                  key={idx}
                  className="
                    text-xs
                    bg-primary/5
                    text-primary
                    px-3
                    py-1
                    rounded-full
                    border
                    border-primary/10
                    hover:bg-primary/10
                    hover:border-primary/30
                    transition-colors
                    duration-300
                    cursor-default
                  "
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';

// Головний компонент
const TaskList: React.FC<TaskListProps> = memo(({ 
  className = '',
  onConsultationClick,
  onPortfolioClick 
}) => {
  return (
    <section 
      id="services" 
      className={`relative py-24 overflow-hidden bg-background ${className}`}
    >
      {/* Фонові ефекти */}
      <div className="absolute inset-0 bg-gradient-metal opacity-50 will-change-transform" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,168,107,0.1),transparent_50%)] will-change-transform" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(10,30,60,0.15),transparent_50%)] will-change-transform" />
      
      {/* Лазерні лінії */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[25, 50, 75].map((position, index) => (
          <div
            key={`vertical-${index}`}
            className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-laser-scan"
            style={{ 
              left: `${position}%`,
              animationDelay: `${index * 500}ms`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секції */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-laser/10 px-4 py-2 rounded-full border border-primary/20 mb-6 backdrop-blur-sm">
            
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              ЯКІ ЗАДАЧІ МИ
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              ДОПОМАГАЄМО ВИРІШИТИ
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Професійне виготовлення металевих виробів будь-якої складності 
            з гарантією якості та точності
          </p>

          
        </div>

        {/* Сітка задач */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {TASKS.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;