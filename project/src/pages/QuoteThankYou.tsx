import React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';

interface QuoteThankYouProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you') => void;
}

const QuoteThankYou: React.FC<QuoteThankYouProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer w-fit"
          >
            <Building2 className="h-8 w-8 text-blue-600" />
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
            Your quote request has been received. Our team will review your requirements and get back to you shortly with a customized quote.
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

export default QuoteThankYou; 