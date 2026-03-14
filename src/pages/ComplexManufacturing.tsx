import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Zap, CheckCircle, Phone, Settings, ArrowLeft, X, ZoomIn,
  FileText, Upload, Ruler, Layers, Grid3x3, Shield, Award,
  User, Mail, MessageSquare, Clock, AlertCircle, Check,
  Thermometer, Wind, Gauge, Droplets, Truck, Cog, Building2,
  Lightbulb, Box, Ruler as RulerIcon, Repeat, Gauge as GaugeIcon,
  PenTool, Wrench, Hammer, Paintbrush, Sparkles, Factory,
  HardHat, Flame, Cpu, Home, Wind as WindIcon
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import { seoPages } from "@/utils/seo";
import complexImage from "@/assets/metal-parts.jpg";
import backgroundImage from "@/assets/for-cutting-page.jpg";
import { makeWebhookService } from "@/services/makeWebhook";

// URL Google Apps Script для відправки файлів
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyBYVfh9EpY49WF3ROqQQs88RoWjvCUhWckOZ6GKn87x8eJLiAU2QmpxKN1gt4nS9YcQ/exec";

// Імпорт картинок для галереї (замініть на реальні фото)
import g1 from "@/assets/welding.jpg";
import g2 from "@/assets/welding.jpg";
import g3 from "@/assets/welding.jpg";
import g4 from "@/assets/welding.jpg";
import g5 from "@/assets/welding.jpg";
import g6 from "@/assets/welding.jpg";

// Типи для форми
interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  material: string;
  dimensions: string;
  quantity: string;
  deadline: string;
  description: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectType?: string;
  material?: string;
  dimensions?: string;
  quantity?: string;
  deadline?: string;
  description?: string;
}

const ComplexManufacturing = () => {
  const formRef = useRef(null);
  const { openPopup } = useContactPopup();
  const navigate = useNavigate();
  
  // Стан форми
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    material: '',
    dimensions: '',
    quantity: '',
    deadline: '',
    description: '',
    file: null
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const goBackToServices = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('services');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Валідація форми
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ім'я має містити мінімум 2 символи";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!/^[\+\d\s\(\)\-]{10,20}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    
    if (!formData.projectType) {
      newErrors.projectType = "Вкажіть тип проекту";
    }
    
    if (!formData.material) {
      newErrors.material = "Виберіть матеріал";
    }
    
    if (!formData.dimensions) {
      newErrors.dimensions = "Вкажіть габарити";
    }
    
    if (!formData.quantity) {
      newErrors.quantity = "Вкажіть кількість";
    } else if (parseInt(formData.quantity) < 1) {
      newErrors.quantity = "Кількість має бути більше 0";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Опишіть ваш проект";
    } else if (formData.description.length < 10) {
      newErrors.description = "Опис має містити мінімум 10 символів";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обробка зміни полів
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаємо помилку при введенні
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Обробка файлу
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Перевірка розміру файлу (max 20MB для комплексних проектів)
      if (file.size > 20 * 1024 * 1024) {
        alert('Файл занадто великий. Максимальний розмір 20MB');
        return;
      }
      
      // Симуляція завантаження
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setUploadProgress(0);
  };

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 20 * 1024 * 1024) {
        alert('Файл занадто великий. Максимальний розмір 20MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  // Відправка форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Скрол до першої помилки
      const firstError = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Підготовка даних для відправки
      const dataToSend = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        projectType: formData.projectType,
        material: formData.material,
        dimensions: formData.dimensions,
        quantity: formData.quantity,
        deadline: formData.deadline || '',
        description: formData.description,
        timestamp: new Date().toLocaleString('uk-UA', { 
          timeZone: 'Europe/Kiev',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: 'complex_manufacturing',
        page_url: window.location.href
      };

      // Відправка даних паралельно в Google Таблицю та Make
      const promises = [];
      
      // 1. Відправка в Google Таблицю (з прикріпленим файлом, якщо є)
      const formDataForGoogle = new FormData();
      Object.keys(dataToSend).forEach(key => {
        formDataForGoogle.append(key, dataToSend[key]);
      });
      if (formData.file) {
        formDataForGoogle.append('file', formData.file);
      }

      promises.push(
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formDataForGoogle
        }).catch(error => {
          console.error('Помилка відправки в Google Sheets:', error);
          return null;
        })
      );

      // 2. Відправка в Make webhook
      promises.push(
        makeWebhookService.sendToMake({
          ...dataToSend,
          file: formData.file,
          file_name: formData.file?.name,
          file_size: formData.file?.size,
          file_type: formData.file?.type
        }).catch(error => {
          console.error('Помилка відправки в Make:', error);
          return { success: false, error: error.message };
        })
      );

      // Чекаємо виконання всіх запитів
      const results = await Promise.allSettled(promises);
      
      // Перевіряємо результати Make webhook
      const makeResult = results[1];
      if (makeResult.status === 'fulfilled' && makeResult.value && !makeResult.value.success) {
        console.warn('Make webhook помилка:', makeResult.value.error);
      }

      setSubmitStatus('success');
      
      // Очищаємо форму після успішної відправки
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          projectType: '',
          material: '',
          dimensions: '',
          quantity: '',
          deadline: '',
          description: '',
          file: null
        });
        setSubmitStatus('idle');
        openPopup(); // Відкриваємо popup з подякою
      }, 2000);
      
    } catch (error) {
      console.error('Помилка відправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Дані для галереї
  const galleryImages = [
    { id: 1, img: g1, title: "Металеві конструкції для промисловості" },
    { id: 2, img: g2, title: "Архітектурні металеві елементи" },
    { id: 3, img: g3, title: "Нестандартні металеві вироби" },
    { id: 4, img: g4, title: "Зварні металоконструкції" },
    { id: 5, img: g5, title: "Металеві каркаси та рами" },
    { id: 6, img: g6, title: "Декоративні металеві конструкції" },
  ];

  // Опції для випадаючих списків
  const projectTypeOptions = [
    { value: 'industrial', label: 'Промислові конструкції' },
    { value: 'architectural', label: 'Архітектурні елементи' },
    { value: 'furniture', label: 'Меблеві конструкції' },
    { value: 'advertising', label: 'Рекламні конструкції' },
    { value: 'custom', label: 'Індивідуальне замовлення' }
  ];

  const materialOptions = [
    { value: 'steel', label: 'Конструкційна сталь' },
    { value: 'stainless', label: 'Нержавіюча сталь' },
    { value: 'aluminum', label: 'Алюміній' },
    { value: 'galvanized', label: 'Оцинкована сталь' },
    { value: 'combined', label: 'Комбіновані матеріали' }
  ];

  const deadlineOptions = [
    { value: 'standard', label: 'Стандартний (10-15 днів)' },
    { value: 'urgent', label: 'Терміновий (5-7 днів)' },
    { value: 'flexible', label: 'Гнучкий (обговоримо)' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.complexManufacturing} />
      <Header />
      
      {/* Floating Back Button */}
      <BackButton targetId="services" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="bg-gradient-laser bg-clip-text text-transparent">Комплексне виготовлення</span> металевих конструкцій
              </h1>
              <div className="space-y-4 mb-8">
                <p className="text-white text-lg text-muted-foreground">
                  Повний цикл розробки та виробництва металевих конструкцій від проектування до фінальної обробки.
                </p>
                <p className="text-white text-lg text-muted-foreground">
                  Оптимізуємо витрати та забезпечуємо найвищу якість виробів для промисловості, архітектури та індивідуальних замовлень.
                </p>
                <p className="text-white text-lg text-muted-foreground">
                  Працюємо зі сталлю, нержавійкою, алюмінієм та іншими матеріалами будь-якої складності.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group"
                  onClick={scrollToForm}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Замовити розрахунок
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={complexImage} 
                alt="Комплексне виготовлення металевих конструкцій"
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Етапи вашого проекту
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 relative group hover:border-primary/50 transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PenTool className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Проектування</h3>
                <p className="text-white/70 text-sm">
                  Розробка креслень та 3D моделей з урахуванням технологічних можливостей та вимог замовника.
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 relative group hover:border-primary/50 transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Різка та заготівля</h3>
                <p className="text-white/70 text-sm">
                  Лазерна різка, гідроабразивна різка, штамповка та згинання листового металу для отримання заготовок.
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 relative group hover:border-primary/50 transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Hammer className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Зварювання та збирання</h3>
                <p className="text-white/70 text-sm">
                  MIG/MAG, TIG та лазерне зварювання, механічне з'єднання з контролем якості швів.
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 relative group hover:border-primary/50 transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Paintbrush className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Обробка та покриття</h3>
                <p className="text-white/70 text-sm">
                  Порошкове фарбування, гальванізація, шліфування, полірування та антикорозійний захист.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Технічні можливості
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Layers className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">до 20 мм</div>
              <div className="text-white font-medium mb-1">Товщина матеріалу</div>
              <div className="text-sm text-white/70">Сталь, алюміній, нержавіюча</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Ruler className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">3000x1500 мм</div>
              <div className="text-white font-medium mb-1">Максимальні розміри</div>
              <div className="text-sm text-white/70">Листові заготовки</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Gauge className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">±0.5 мм</div>
              <div className="text-white font-medium mb-1">Точність виробництва</div>
              <div className="text-sm text-white/70">Вимірювання та контроль</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Truck className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">до 500 кг</div>
              <div className="text-white font-medium mb-1">Вага виробу</div>
              <div className="text-sm text-white/70">Максимальна вага</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Factory className="h-6 w-6 text-primary" />
                Основні послуги
              </h3>
              <div className="space-y-3">
                {[
                  "Розробка проектно-кошторисної документації",
                  "CAD/CAM проектування та 3D моделювання",
                  "Лазерна та гідроабразивна різка",
                  "Згинання та штамповка листового металу",
                  "MIG/MAG, TIG та лазерне зварювання",
                  "Зняття напруги та термообробка"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-white">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Додаткова обробка
              </h3>
              <div className="space-y-3">
                {[
                  "Порошкове фарбування (300+ кольорів RAL)",
                  "Гальванізація та цинкування",
                  "Шліфування та полірування",
                  "Різьбові з'єднання та навивка",
                  "Антикорозійні покриття",
                  "Логотипування та маркування"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-white">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            ПРИКЛАДИ РОБІТ
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Реалізовані проекти металевих конструкцій різної складності
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((work) => (
              <Card key={work.id} className="overflow-hidden group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={work.img} 
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 font-medium">{work.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Галузі застосування
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Промисловість</h3>
              <p className="text-muted-foreground text-sm">Обладнання, станки, конвеєри, рами</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Архітектура</h3>
              <p className="text-muted-foreground text-sm">Фасадні системи, перила, несучі конструкції</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Енергетика</h3>
              <p className="text-muted-foreground text-sm">Котли, теплообмінники, трубопроводи</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Електроніка</h3>
              <p className="text-muted-foreground text-sm">Корпуси, шасі, стійки для обладнання</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Меблі та інтер'єр</h3>
              <p className="text-muted-foreground text-sm">Каркаси, стелажі, дизайнерські елементи</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <WindIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Вентиляція</h3>
              <p className="text-muted-foreground text-sm">Повітропроводи, кожухи, повітророзподільники</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            ЧАСТІ ПИТАННЯ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Які терміни виконання комплексних замовлень?</h3>
              <p className="text-white/80">Терміни залежать від складності проекту та обсягу робіт. Зазвичай від 10 до 30 робочих днів.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Чи допомагаєте з проектуванням?</h3>
              <p className="text-white/80">Так, наші інженери розроблять креслення та 3D-моделі на основі ваших ескізів або технічного завдання.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Яка мінімальна партія?</h3>
              <p className="text-white/80">Працюємо як з одиничними виробами, так і з серійним виробництвом від 100 одиниць.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Чи можливе фарбування в будь-який колір RAL?</h3>
              <p className="text-white/80">Так, ми маємо понад 300 кольорів RAL для порошкового фарбування.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Order Form */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Розрахувати вартість проекту
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Заповніть форму нижче. Ми проаналізуємо ваш проект і підготуємо 
              комерційну пропозицію протягом 24 годин
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 shadow-2xl border-primary/20 bg-gradient-to-br from-card to-background">
              {/* Індикатори процесу */}
              <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <span className="ml-2 text-sm font-medium text-foreground">Контакти</span>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-border">
                  <div className="h-full w-1/2 bg-primary"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <span className="ml-2 text-sm font-medium text-foreground">Проект</span>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-border">
                  <div className="h-full w-1/2 bg-primary"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <span className="ml-2 text-sm font-medium text-muted-foreground">Файли</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Контактні дані */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Ваше ім'я <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg bg-background border ${
                          errors.name ? 'border-destructive' : 'border-border'
                        } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                        placeholder="Іван Петренко"
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg bg-background border ${
                          errors.phone ? 'border-destructive' : 'border-border'
                        } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                        placeholder="+380 (67) 123-45-67"
                      />
                      {errors.phone && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </div>
                      )}
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email (необов'язково)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                {/* Параметри проекту */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Тип проекту <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.projectType ? 'border-destructive' : 'border-border'
                      } text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    >
                      <option value="">Оберіть тип</option>
                      {projectTypeOptions.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="text-sm text-destructive">{errors.projectType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Матеріал <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.material ? 'border-destructive' : 'border-border'
                      } text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    >
                      <option value="">Оберіть матеріал</option>
                      {materialOptions.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                    {errors.material && (
                      <p className="text-sm text-destructive">{errors.material}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Габарити (ДхШхВ) <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.dimensions ? 'border-destructive' : 'border-border'
                      } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="2000x1000x500 мм"
                    />
                    {errors.dimensions && (
                      <p className="text-sm text-destructive">{errors.dimensions}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Кількість <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.quantity ? 'border-destructive' : 'border-border'
                      } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="10 шт"
                    />
                    {errors.quantity && (
                      <p className="text-sm text-destructive">{errors.quantity}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Термін виконання
                    </label>
                    <select
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Оберіть термін</option>
                      {deadlineOptions.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Опис проекту */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Опис проекту <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full p-3 rounded-lg bg-background border ${
                      errors.description ? 'border-destructive' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none`}
                    placeholder="Опишіть ваш проект: призначення, вимоги до міцності, особливості конструкції, бажані матеріали..."
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Мінімум 10 символів. Чим детальніший опис, тим точнішим буде розрахунок
                  </p>
                </div>

                {/* Завантаження файлу */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    Креслення, ескізи або технічне завдання
                  </label>
                  
                  {!formData.file ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                        dragActive 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".dwg,.dxf,.cdw,.pdf,.jpg,.jpeg,.png,.step,.stp,.iges,.igs,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      <div className="text-center">
                        <div className="h-10 w-10 text-muted-foreground mx-auto mb-3">
                          <Upload className="h-10 w-10" />
                        </div>
                        <p className="text-sm text-foreground mb-1">
                          <span className="text-primary">Натисніть для завантаження</span> або перетягніть файл
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Підтримуються: DWG, DXF, PDF, STEP, JPG, PNG, DOC (макс. 20 MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {formData.file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                        >
                          <X className="h-5 w-5 text-destructive" />
                        </button>
                      </div>
                      
                      {uploadProgress < 100 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Завантаження...</span>
                            <span className="text-primary">{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {uploadProgress === 100 && (
                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                          <Check className="h-3 w-3" />
                          <span>Файл завантажено успішно</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Статус відправки */}
                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        Заявку успішно відправлено!
                      </p>
                      <p className="text-sm text-green-600/70 dark:text-green-400/70">
                        Ми зв'яжемося з вами протягом 24 годин
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-destructive font-medium">
                        Помилка відправки
                      </p>
                      <p className="text-sm text-destructive/70">
                        Спробуйте пізніше або зв'яжіться з нами по телефону
                      </p>
                    </div>
                  </div>
                )}

                {/* Кнопка відправки */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary animate-shimmer" />
                      <span className="relative flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Відправка...
                      </span>
                    </>
                  ) : (
                    <>
                      <Factory className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Отримати розрахунок проекту
                    </>
                  )}
                </Button>

                {/* Додаткова інформація */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Відповідь протягом 24 годин</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Ваші дані захищені</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Безкоштовний розрахунок</span>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ContactPopup />
    </div>
  );
};

export default ComplexManufacturing;