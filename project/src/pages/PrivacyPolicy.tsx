import React, { useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy') => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Privacy Policy</h1>
        <p className="text-gray-600 mb-8 fade-in">Last updated: March 2025</p>

        <div className="space-y-8">
          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              At BulkRooms, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect several types of information from and about users of our service, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Booking information (dates, number of guests, room preferences)</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Usage data (how you interact with our website)</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Process and manage your bookings</li>
              <li>Communicate with you about your bookings and our services</li>
              <li>Improve our website and services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Hotel partners to fulfill your bookings</li>
              <li>Payment processors to handle transactions</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section className="fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy; 