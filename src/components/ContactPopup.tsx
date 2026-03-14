import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";

const ContactPopup = () => {
  const { isOpen, closePopup } = useContactPopup();
  const navigate = useNavigate();
  const isManualRedirectRef = useRef(false);

  useEffect(() => {
    // Якщо контекст намагається відкрити попап, перенаправляємо на сторінку контакту
    if (isOpen) {
      isManualRedirectRef.current = true; // Позначаємо, що це ручне перенаправлення
      closePopup();
      navigate('/contact?source=popup-redirect');
    }
  }, [isOpen, closePopup, navigate]);



  // Компонент не рендерить нічого
  return null;
};

export default ContactPopup;