import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Zap, CheckCircle, Phone, Award, Shield, Wrench, 
  FileText, Upload, Grid3x3, Ruler, Layers, Repeat, 
  Truck, Clock, MessageSquare, User, Mail, AlertCircle,
  X, Check, Download, FileUp, Image, FileWarning, 
  Cog, Building2, Ship, Factory, Ship as ShipIcon, Shield as ShieldIcon
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import { seoPages } from "@/utils/seo";
import weldingImg from "@/assets/for-welding-first.jpg";
import backgroundImage from "@/assets/welding.jpg";
import { makeWebhookService } from "@/services/makeWebhook";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyBYVfh9EpY49WF3ROqQQs88RoWjvCUhWckOZ6GKn87x8eJLiAU2QmpxKN1gt4nS9YcQ/exec";

// Функція для перетворення файлу в base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

// Приклади робіт (замініть на реальні фото)
import g1 from "@/assets/for-welding-1.jpg";
import g2 from "@/assets/for-welding-2.jpg";
import g3 from "@/assets/for-welding-3.jpg";
import g4 from "@/assets/for-welding-4.jpg";
import g5 from "@/assets/for-welding-5.jpg";
import g6 from "@/assets/for-welding-6.jpg";

// Типи для форми
interface FormData {
  name: string;
  phone: string;
  email: string;
  weldingType: string;
  material: string;
  thickness: string;
  quantity: string;
  description: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  weldingType?: string;
  material?: string;
  thickness?: string;
  quantity?: string;
  description?: string;
}

const MetalWelding = () => {
  const formRef = useRef(null);
  const { openPopup } = useContactPopup();
  const navigate = useNavigate();
  
  // Стан форми
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    weldingType: '',
    material: '',
    thickness: '',
    quantity: '',
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
    
    if (!formData.weldingType) {
      newErrors.weldingType = "Виберіть тип зварювання";
    }
    
    if (!formData.material) {
      newErrors.material = "Виберіть матеріал";
    }
    
    if (!formData.thickness) {
      newErrors.thickness = "Вкажіть товщину";
    }
    
    if (!formData.quantity) {
      newErrors.quantity = "Вкажіть кількість";
    } else if (parseInt(formData.quantity) < 1) {
      newErrors.quantity = "Кількість має бути більше 0";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Опишіть ваше замовлення";
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
      // Перевірка розміру файлу (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл занадто великий. Максимальний розмір 10MB');
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
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл занадто великий. Максимальний розмір 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  // Відправка форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валідація форми
    if (!validateForm()) {
      // Скрол до першої помилки
      const firstErrorField = Object.keys(errors).find(key => errors[key as keyof FormErrors]);
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Підготовка даних для відправки
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        weldingType: formData.weldingType,
        material: formData.material,
        thickness: formData.thickness,
        quantity: formData.quantity,
        description: formData.description,
        service: 'Metal Welding',
        timestamp: new Date().toISOString(),
        file_name: formData.file?.name || '',
        file_type: formData.file?.type
      };

      // Підготовка даних для Google Sheets
      const formDataForGoogle = new FormData();
      Object.entries(dataToSend).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataForGoogle.append(key, String(value));
        }
      });

      // Якщо є файл, додаємо його до FormData
      if (formData.file) {
        formDataForGoogle.append('file', formData.file);
      }

      // Створюємо масив промісів для паралельної відправки
      const promises: Promise<any>[] = [];

      // Додаємо відправку в Google Sheets
      promises.push(
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formDataForGoogle
        }).catch(error => {
          console.error('Помилка відправки в Google Sheets:', error);
        })
      );

      // Додаємо відправку в Make
      const makeData = {
        ...dataToSend,
        file: formData.file
      };
      
      promises.push(
        makeWebhookService.sendToMake(makeData).catch(error => {
          console.error('Помилка відправки в Make:', error);
        })
      );

      // Чекаємо виконання всіх запитів
      const results = await Promise.allSettled(promises);

      // Перевіряємо результати
      const hasErrors = results.some(result => result.status === 'rejected' || 
        (result.status === 'fulfilled' && result.value && !result.value.ok));

      if (hasErrors) {
        setSubmitStatus('error');
        console.error('Помилка відправки даних');
      } else {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          weldingType: '',
          material: '',
          thickness: '',
          quantity: '',
          description: '',
          file: null
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Помилка відправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const galleryImages = [
    { id: 1, img: g1, title: "Зварні конструкції для машинобудування" },
    { id: 2, img: g2, title: "Металеві каркаси та рами" },
    { id: 3, img: g3, title: "Складні профільні конструкції" },
    { id: 4, img: g4, title: "Зварювання нержавійки" },
    { id: 5, img: g5, title: "Алюмінієві конструкції" },
    { id: 6, img: g6, title: "Декоративні зварні елементи" },
  ];

  const weldingTypes = [
    { value: 'tig', label: 'TIG (аргонове)' },
    { value: 'mig', label: 'MIG/MAG (напівавтоматичне)' },
    { value: 'manual', label: 'Ручне дугове' },
    { value: 'spot', label: 'Точкове контактне' }
  ];

  const materials = [
    { value: 'steel', label: 'Сталь' },
    { value: 'stainless', label: 'Нержавійка' },
    { value: 'aluminum', label: 'Алюміній' },
    { value: 'brass', label: 'Латунь' },
    { value: 'copper', label: 'Мідь' },
  ];

  const thicknesses = [
    { value: '0.5', label: '0.5 мм' },
    { value: '1', label: '1 мм' },
    { value: '1.5', label: '1.5 мм' },
    { value: '2', label: '2 мм' },
    { value: '3', label: '3 мм' },
    { value: '4', label: '4 мм' },
    { value: '5', label: '5 мм' },
    { value: '6', label: '6 мм' },
    { value: '8', label: '8 мм' },
    { value: '10', label: '10 мм' },
    { value: '12', label: '12 мм' },
    { value: '15', label: '15 мм' },
    { value: '20', label: '20 мм' },
    { value: '25', label: '25 мм' },
    { value: '30', label: '30 мм' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.metalWelding} />
      <Header />
      
      {/* Floating Back Button */}
      <BackButton targetId="services" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="bg-gradient-laser bg-clip-text text-transparent">Зварювання</span> металу
              </h1>
              <div className="space-y-4 mb-8">
                <p className="text-white text-lg text-muted-foreground">
                  Виконуємо аргонове та напівавтоматичне зварювання сталі, нержавійки та алюмінію.
                </p>
                <p className="text-white text-lg text-muted-foreground">
                  Забезпечуємо тонкий і акуратний шов з мінімальними деформаціями деталей.
                </p>
                <p className="text-white text-lg text-muted-foreground">
                  Працюємо як з одиничними виробами, так і з серійними партіями для виробництва.
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
                  Замовити зварювання
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={weldingImg} 
                alt="Зварювання металу"
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      {/* Technical Specifications */}
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
      Технічні характеристики
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
        <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
        <div className="text-2xl font-bold text-primary mb-2">TIG/MIG</div>
        <div className="text-white font-medium mb-1">Тип зварювання</div>
        <div className="text-sm text-white/70">Аргонове та напівавтоматичне</div>
      </Card>
      <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
        <Layers className="h-8 w-8 text-primary mx-auto mb-3" />
        <div className="text-2xl font-bold text-primary mb-2">до 30 мм</div>
        <div className="text-white font-medium mb-1">Товщина металу</div>
        <div className="text-sm text-white/70">Максимальна товщина</div>
      </Card>
      <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
        <Ruler className="h-8 w-8 text-primary mx-auto mb-3" />
        <div className="text-2xl font-bold text-primary mb-2">±0.5 мм</div>
        <div className="text-white font-medium mb-1">Точність шва</div>
        <div className="text-sm text-white/70">Мінімальні деформації</div>
      </Card>
      <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
        <Repeat className="h-8 w-8 text-primary mx-auto mb-3" />
        <div className="text-2xl font-bold text-primary mb-2">від 1 виробу</div>
        <div className="text-white font-medium mb-1">Мінімальна партія</div>
        <div className="text-sm text-white/70">Без мінімальних обмежень</div>
      </Card>
    </div>
  </div>
</section>

      {/* Advantages & Why Us */}
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
            {/* Переваги зварювання */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Переваги зварювання
              </h3>
              <div className="space-y-3">
                {[
                  "Тонкий і акуратний зварювальний шов",
                  "Мінімальні деформації деталей",
                  "Контроль якості кожного шва",
                  "Робота з різними типами металу",
                  "Серійне та одиничне виробництво"
                ].map((advantage, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-white">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Чому клієнти працюють з нами */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Чому клієнти працюють з нами
              </h3>
              <div className="space-y-3">
                {[
                  "Досвідчені зварювальники з багаторічним стажем",
                  "Сучасне зварювальне обладнання",
                  "Робота з різними типами металу",
                  "Контроль якості кожного шва",
                  "Можливість комплексної обробки"
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-white">{reason}</span>
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
            Приклади виробів, виготовлених за допомогою зварювання
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

      {/* Applications */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Сфери застосування
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Cog className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Машинобудування</h3>
              <p className="text-muted-foreground text-sm">Зварні конструкції, рами, каркаси</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Будівництво</h3>
              <p className="text-muted-foreground text-sm">Металоконструкції, сходи, огорожі</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <ShipIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Суднобудування</h3>
              <p className="text-muted-foreground text-sm">Корпусні деталі, кріплення</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Ремонт</h3>
              <p className="text-muted-foreground text-sm">Відновлення деталей, наплавлення</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Виробництво</h3>
              <p className="text-muted-foreground text-sm">Серійні зварні вузли</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Спецтехніка</h3>
              <p className="text-muted-foreground text-sm">Захисні конструкції, кузови</p>
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
              <h3 className="text-lg font-bold text-white mb-2">Які метали ви зварюєте?</h3>
              <p className="text-white/80">Ми працюємо зі сталлю, нержавійкою та алюмінієм різної товщини.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Чи можна замовити зварювання окремо?</h3>
              <p className="text-white/80">Так, ви можете замовити тільки зварювання готових деталей.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Які терміни виконання?</h3>
              <p className="text-white/80">Від 1 до 5 робочих днів залежно від складності та обсягу.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Чи виконуєте зварювання на виїзді?</h3>
              <p className="text-white/80">Ні, всі роботи виконуються на нашому виробництві для забезпечення максимальної якості.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Order Form */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Замовте зварювання металу
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Заповніть форму нижче. Ми проаналізуємо ваше замовлення і підготуємо 
              комерційну пропозицію протягом 30 хвилин
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 shadow-2xl border-primary/20 bg-gradient-to-br from-card to-background">
              {/* Індикатори процесу */}
              <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <span className="ml-2 text-sm font-medium text-foreground">Дані клієнта</span>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-border">
                  <div className="h-full w-1/3 bg-primary"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <span className="ml-2 text-sm font-medium text-foreground">Параметри</span>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-border"></div>
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

                {/* Параметри зварювання */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Тип зварювання <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="weldingType"
                      value={formData.weldingType}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.weldingType ? 'border-destructive' : 'border-border'
                      } text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    >
                      <option value="">Оберіть тип</option>
                      {weldingTypes.map(w => (
                        <option key={w.value} value={w.value}>{w.label}</option>
                      ))}
                    </select>
                    {errors.weldingType && (
                      <p className="text-sm text-destructive">{errors.weldingType}</p>
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
                      {materials.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                    {errors.material && (
                      <p className="text-sm text-destructive">{errors.material}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Товщина <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="thickness"
                      value={formData.thickness}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.thickness ? 'border-destructive' : 'border-border'
                      } text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    >
                      <option value="">Оберіть товщину</option>
                      {thicknesses.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    {errors.thickness && (
                      <p className="text-sm text-destructive">{errors.thickness}</p>
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
                      placeholder="100 шт"
                    />
                    {errors.quantity && (
                      <p className="text-sm text-destructive">{errors.quantity}</p>
                    )}
                  </div>
                </div>

                {/* Опис замовлення */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Опис замовлення <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full p-3 rounded-lg bg-background border ${
                      errors.description ? 'border-destructive' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none`}
                    placeholder="Опишіть деталі, тип з'єднання, вимоги до шва..."
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
                    <FileUp className="h-4 w-4 text-primary" />
                    Креслення або ескіз
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
                        accept=".dwg,.dxf,.cdw,.pdf,.jpg,.jpeg,.png,.step,.stp"
                        onChange={handleFileChange}
                      />
                      <div className="text-center">
                        <Image className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-foreground mb-1">
                          <span className="text-primary">Натисніть для завантаження</span> або перетягніть файл
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Підтримуються: DWG, DXF, PDF, STEP, JPG, PNG (макс. 10 MB)
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
                        Форму успішно відправлено!
                      </p>
                      <p className="text-sm text-green-600/70 dark:text-green-400/70">
                        Ми зв'яжемося з вами найближчим часом
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
                      <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Отримати розрахунок
                    </>
                  )}
                </Button>

                {/* Додаткова інформація */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Відповідь протягом 30 хвилин</span>
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

export default MetalWelding;