import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';

interface ContactUsThankYouProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you' | 'contact-us-thank-you') => void;
}

const ContactUsThankYou: React.FC<ContactUsThankYouProps> = ({ onNavigate }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onNavigate('home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer w-fit"
          >
            <span className="text-2xl font-bold">BulkRooms</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Your message has been received. Our team will get back to you shortly.
          </p>
          <p className="text-gray-500 mb-8">
            Redirecting to home page in {countdown} seconds...
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsThankYou; 