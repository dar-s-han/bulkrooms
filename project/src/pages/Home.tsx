import React from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users, Zap, List, Tag } from 'lucide-react';
import BookingTypesSection from '../components/BookingTypesSection';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';

interface HomeProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[85vh] mb-[-200px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Business meeting room"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-1000 ease-in-out fade-in-image"
            style={{ maxWidth: '1500px', maxHeight: '900px', margin: '0 auto' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <nav className="relative z-10 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            BulkRooms
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('get-quote')}
              className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Get Instant Quote
            </button>
            <button 
              onClick={() => onNavigate('contact-us')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Contact Us
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-start h-full text-center px-4 pt-40">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-relaxed">
            Get quotes within hours <br />
            with a single request! 
          </h1>
          <p className="text-white text-xl mb-8">
            Planning a stay for 10+ guests?
          </p>
          <button 
            onClick={() => onNavigate('get-quote')}
            className="bg-blue-600 text-white px-7 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Get Instant Quote
          </button>
        </div>
      </header>

      {/* Booking Types Section */}
      <div className="relative z-10">
        <BookingTypesSection />
      </div>

      {/* Why Book With Us Section */}
      <section id="why-book" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 fade-in text-blue-900">Why Book With Us</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto fade-in">
            BulkRooms simplifies the complex process of booking multiple hotel rooms, saving you time and money.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
              <ServiceCard
                icon={<Zap className="h-6 w-6" />}
                title="Instant Quotes"
                description="Receive instant quotes from hotels within hours"
              />
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '400ms' }}>
              <ServiceCard
                icon={<Clock className="h-6 w-6" />}
                title="Time Saving"
                description="Get quotes from multiple hotels with a single request"
              />
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '600ms' }}>
              <ServiceCard
                icon={<List className="h-6 w-6" />}
                title="Plenty of Options"
                description="Wide selection of hotels across your destination"
              />
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '800ms' }}>
              <ServiceCard
                icon={<Tag className="h-6 w-6" />}
                title="Best Rates"
                description="Access special rates that aren't available elsewhere"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section id="process" className="bg-gradient-to-b from-blue-50 to-indigo-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 fade-in text-indigo-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
              <div className="bg-white p-8 rounded-2xl text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquareQuote className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Send Request</h3>
                <p className="text-gray-600">Tell us your requirements and we'll start working on finding the perfect venues for you</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '400ms' }}>
              <div className="bg-white p-8 rounded-2xl text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">Get Quotes</h3>
                <p className="text-gray-600">Receive competitive quotes from multiple hotels tailored to your needs</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '600ms' }}>
              <div className="bg-white p-8 rounded-2xl text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Hotel className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-pink-900 mb-4">Book & Save</h3>
                <p className="text-gray-600">Secure your booking and enjoy exclusive savings on your group stay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 fade-in text-indigo-900">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto fade-in">
            Join thousands of satisfied customers who have simplified their group booking experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">VS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vaishnavi Somani</h4>
                    <p className="text-sm text-gray-500">Founder, Local Narratives</p>
                  </div>
                </div>
                <p className="text-gray-600">"I was able to find the perfect accommodation for my trip with BulkRooms. The team was very helpful and the rates were great."</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '400ms' }}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-indigo-500 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">AS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Adithyaa Sriram</h4>
                    <p className="text-sm text-gray-500">Founder, The Unbored Club</p>
                  </div>
                </div>
                <p className="text-gray-600">"I received the quotes instantly. The team helped us get the perfect accommodations for all our guests."</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '600ms' }}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 mr-4 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">PG</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Parth Garg</h4>
                    <p className="text-sm text-gray-500">CEO, Aspora</p>
                  </div>
                </div>
                <p className="text-gray-600">"The experience was seamless. We had multiple location options within hours, and everything was handled with utmost professionalism"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            {/* <div className="text-3xl font-bold flex items-center gap-3">
              <Building2 className="h-10 w-10" />
              BulkRooms
            </div>
            <p className="text-gray-300 text-center max-w-2xl">
              Simplify your group booking experience with BulkRooms. Get the best rates for 10+ rooms and enjoy dedicated support throughout your booking journey.
            </p> */}
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

export default Home; 