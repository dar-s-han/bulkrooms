import React, { useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface CookiePolicyProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy') => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add fade-in animation to elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
      // Immediately show elements that are already in view
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Building2 className="h-8 w-8" />
              BulkRooms
            </div>
            <button 
              onClick={() => onNavigate('home')}
              className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Cookie Policy</h1>
        <p className="text-gray-600 mb-8 fade-in">Last updated: March 2025</p>

        <div className="space-y-8">
          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience and allow certain features to work properly.
            </p>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            <p className="text-gray-600 mb-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Essential Cookies: Required for the website to function properly</li>
              <li>Analytics Cookies: Help us understand how visitors use our website</li>
              <li>Functionality Cookies: Remember your preferences and settings</li>
              <li>Marketing Cookies: Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">We use cookies to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve our website's functionality</li>
              <li>Personalize your experience</li>
              <li>Show relevant advertisements</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-600 mb-4">
              Some cookies are placed by third-party services that appear on our pages. These include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Social media platforms for sharing features</li>
              <li>Advertising networks for relevant ads</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.
            </p>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: info@bulkrooms.com<br />
              Address: BulkRooms Headquarters, Bengaluru, India
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center fade-in">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-semibold"
          >
            Back to Home
          </button>
        </div>
      </main>

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

export default CookiePolicy; 