import { Card } from "@/components/ui/card";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gallery1 from "@/assets/for-gallery-1.jpg";
import gallery2 from "@/assets/for-gallery-2.jpg";
import gallery3 from "@/assets/for-gallery-3.jpg";
import gallery4 from "@/assets/for-gallery-4.jpg";
import gallery5 from "@/assets/for-gallery-5.jpg";
import gallery6 from "@/assets/for-gallery-6.jpg";


interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: gallery1,
      alt: "Фото 1"
    },
    {
      id: 2,
      src: gallery2,
      alt: "Фото 2"
    },
    {
      id: 3,
      src: gallery3,
      alt: "Фото 3"
    },
    {
      id: 4,
      src: gallery4,
      alt: "Фото 4"
    },
    {
      id: 5,
      src: gallery5,
      alt: "Фото 5"
    },
    {
      id: 6,
      src: gallery6,
      alt: "Фото 6"
    }
  ];

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === "next") {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(images[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Галерея <span className="bg-gradient-laser bg-clip-text text-transparent">робіт</span>
          </h2>
          <p className="text-white text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Приклади наших робіт
          </p>
        </div>

        {/* Gallery grid - збільшені картки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-[380px] mx-auto" // Збільшено з 320px до 380px
            >
              <Card 
                className="group relative overflow-hidden bg-card border-border shadow-card hover:shadow-glow transition-all duration-500 cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative" style={{ paddingBottom: '75%' }}> {/* Співвідношення 4:3 */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-contain p-3 bg-black/5" // Збільшено p-2 до p-3
                    loading="lazy"
                  />
                  
                  {/* Zoom icon overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-orange-500 rounded-full p-3 md:p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <ZoomIn className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 transition-all z-10"
                aria-label="Закрити"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 transition-all z-10"
                aria-label="Попереднє"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 transition-all z-10"
                aria-label="Наступне"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Image container */}
              <motion.div
                key={selectedImage.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-7xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-lg shadow-2xl p-3">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[70vh] md:max-h-[80vh] w-auto h-auto object-contain"
                  />
                </div>
              </motion.div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;