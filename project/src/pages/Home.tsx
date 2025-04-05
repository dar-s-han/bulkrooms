import React from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users } from 'lucide-react';
import BookingTypesSection from '../components/BookingTypesSection';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';

interface HomeProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[85vh] mb-[-200px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
            alt="Business meeting room"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-1000 ease-in-out fade-in-image"
            style={{ maxWidth: '1500px', maxHeight: '900px', margin: '0 auto' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <nav className="relative z-10 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Planning a stay for 10+ guests?
          </h1>
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
                icon={<Building2 className="h-6 w-6" />}
                title="Bulk Discounts"
                description="Access special rates for booking 10+ rooms that aren't available elsewhere."
              />
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '400ms' }}>
              <ServiceCard
                icon={<Clock className="h-6 w-6" />}
                title="Time Saving"
                description="Request quotes from multiple hotels with a single submission."
              />
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '600ms' }}>
              <ServiceCard
                icon={<MessageSquareQuote className="h-6 w-6" />}
                title="Guaranteed Best Rates"
                description="We work directly with hotels to ensure you get the best possible group rates."
              />
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '800ms' }}>
              <ServiceCard
                icon={<Users className="h-6 w-6" />}
                title="Dedicated Support"
                description="Personal assistance from experts who specialize in group bookings."
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
                    <span className="text-blue-600 font-bold">V</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vaishnavi</h4>
                    <p className="text-sm text-gray-500">Trip Planner</p>
                  </div>
                </div>
                <p className="text-gray-600">"I was able to find the perfect accommodation for my trip with BulkRooms. The team was very helpful and the rates were great."</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '400ms' }}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-indigo-500 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">K</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Krisha</h4>
                    <p className="text-sm text-gray-500">Wedding Coordinator</p>
                  </div>
                </div>
                <p className="text-gray-600">"Booking rooms for our destination wedding was seamless. The team helped us get the perfect accommodations for all our guests."</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '600ms' }}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 mr-4 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">DW</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">David Wilson</h4>
                    <p className="text-sm text-gray-500">Sports Team Manager</p>
                  </div>
                </div>
                <p className="text-gray-600">"As a sports team manager, I need reliable group bookings. BulkRooms delivered great rates and excellent service for our team travels."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 