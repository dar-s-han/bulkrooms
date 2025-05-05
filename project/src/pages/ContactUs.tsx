import React, { useState, useEffect } from 'react';
import { Building2, MapPin, PhoneCall, Mail, ArrowUpRight, ArrowLeft } from 'lucide-react';

interface ContactUsProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you' | 'contact-us-thank-you' | 'privacy-policy' | 'cookie-policy') => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [locationInfo, setLocationInfo] = useState<{ ip: string; country: string; countryCode: string } | null>(null);

  // Fetch IP and country information
  useEffect(() => {
    const fetchLocationInfo = () => {
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          setLocationInfo({
            ip: data.ip,
            country: data.country_name,
            countryCode: data.country_code
          });
        })
        .catch(error => {
          console.error('Error fetching location info:', error);
        });
    };

    fetchLocationInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Track Google Analytics event
      if (window.gtag) {
        window.gtag('config', 'G-9N08T76Q5G');
        window.gtag('event', 'contact_us_submit_button_clicked', {
          'event_category': 'Contact Us Section',
          'event_label': 'Contact Us Page',
          'value': 1
        });
      }

      // Prepare the data to send to Google Sheets
      const submissionData = {
        sheetName: 'ContactUsSubmission',
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        ipAddress: locationInfo?.ip || 'Unknown'
      };

      console.log('Submitting data:', submissionData);

      // Send data to Google Sheets
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxS6tna_aXRBRHEcGszzKbknkEpaL9MG9nW2GRhW_AgsVf8a0QzgXAALRY5bvUf1cTW/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      // Since 'no-cors' mode doesn't give us access to response details,
      // we'll assume success if no error is thrown
      console.log('Form submitted successfully');
      onNavigate('contact-us-thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/80 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer w-fit hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">BulkRooms</span>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {submitError && (
              <div className="mt-4 bg-red-50 text-red-700 px-4 py-3 rounded-md">
                {submitError}
              </div>
            )}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Looking to book instead?</p>
              <button
                onClick={() => onNavigate('get-quote')}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Get an Instant Quote
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Office Location</h3>
                  <p className="text-gray-600 mt-1">
                    Bengaluru, India | New York, United States
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <PhoneCall className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">WhatsApp</h3>
                  <p className="text-gray-900 mt-1">+91 7425875024</p>
                  <a 
                    href="https://wa.me/917425875024?text=Hello%20BulkRooms%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                  >
                    Chat on WhatsApp <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-1">info@bulkrooms.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl">
              <div className="flex flex-col items-center text-center gap-4">
                <h3 className="text-xl font-semibold">Need Quick Pricing?</h3>
                <p className="text-gray-300 mb-2">Get instant quotes for your group booking in minutes. Compare rates from multiple hotels.</p>
                <button 
                  onClick={() => onNavigate('get-quote')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-200 transition text-lg font-semibold"
                >
                  Get Instant Quote
                </button>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <h3 className="text-xl font-semibold">Looking for something else?</h3>
                <p className="text-gray-300 mb-2">Speak with our group booking specialists who can help plan your perfect stay.</p>
                <button 
                  onClick={() => onNavigate('contact-us')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="w-full border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <div className="flex justify-center gap-6 mb-4">
                <button 
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => onNavigate('cookie-policy')}
                  className="hover:text-white transition"
                >
                  Cookie Policy
                </button>
              </div>
              © 2025 BulkRooms. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs; 