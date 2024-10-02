import React from 'react';

interface ToastProps {
  title: string;
  description: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, description }) => {
  return (
    <div className="fixed bottom-4 w-96 right-4 shadow-lg rounded-lg p-4 z-50 bg-green-200">
      <h4 className="font-bold text-md">{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Toast;
