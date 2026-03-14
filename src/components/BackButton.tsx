import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  targetId?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ targetId = 'services' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Повернутись назад"
      className="fixed top-14 left-6 z-50 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-md hover:scale-105 transform-gpu transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
  );
};

export default BackButton;