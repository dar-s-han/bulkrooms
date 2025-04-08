import React, { useEffect, useState } from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users, Zap, List, Tag } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import BookingTypesSection from '../components/BookingTypesSection';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';

interface HomeProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy', params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [hours, setHours] = useState(Number(localStorage.getItem('totalHours') || '100'));
  const [savings, setSavings] = useState(Number(localStorage.getItem('totalSavings') || '50000'));
  const [initialAnimation, setInitialAnimation] = useState(!localStorage.getItem('initialAnimationCompleted'));
  const [animatedHours, setAnimatedHours] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchEventType, setSearchEventType] = useState('');

  useEffect(() => {
    // Initialize values from localStorage
    const storedHours = Number(localStorage.getItem('totalHours') || '162000');
    const storedSavings = Number(localStorage.getItem('totalSavings') || '1355000');
    setHours(storedHours);
    setSavings(storedSavings);
    setAnimatedHours(storedHours % 10);
    setAnimatedSavings(storedSavings % 100);

    // Initial fast animation (only runs once)
    if (initialAnimation && !localStorage.getItem('initialAnimationCompleted')) {
      const animationInterval = setInterval(() => {
        const newHours = hours + 10;
        const newSavings = savings + 100;
        
        setHours(newHours);
        setSavings(newSavings);
        setAnimatedHours(newHours % 10);
        setAnimatedSavings(newSavings % 100);
        
        localStorage.setItem('totalHours', newHours.toString());
        localStorage.setItem('totalSavings', newSavings.toString());
      }, 100);

      // Stop initial animation after 2 seconds and mark it as completed
      setTimeout(() => {
        clearInterval(animationInterval);
        setInitialAnimation(false);
        localStorage.setItem('initialAnimationCompleted', 'true');
      }, 2000);
    } else {
      // Normal incremental counting
      const interval = setInterval(() => {
        // Hours increment once every few minutes (random between 3-5 minutes)
        const hoursIncrement = Math.random() < 0.03 ? 1 : 0; // 3% chance to increment every 5 seconds
        
        // Savings increment randomly between 10-15 dollars every 15 seconds
        const savingsIncrement = Math.floor(Math.random() * 6) + 10; // Random between 10-15
        
        const newHours = hours + hoursIncrement;
        const newSavings = savings + savingsIncrement;
        
        setHours(newHours);
        setSavings(newSavings);
        setAnimatedHours(newHours % 10);
        setAnimatedSavings(newSavings % 100);
        
        localStorage.setItem('totalHours', newHours.toString());
        localStorage.setItem('totalSavings', newSavings.toString());
      }, 15000); // Check every 15 seconds

      return () => clearInterval(interval);
    }
  }, [hours, savings, initialAnimation]);

  // Helper function to format numbers with animated parts
  const formatNumber = (number: number, animatedPart: number, digits: number) => {
    const staticPart = Math.floor(number / Math.pow(10, digits));
    const animatedStr = animatedPart.toString();
    let padding = '';
    for (let i = 0; i < digits - animatedStr.length; i++) {
      padding += '0';
    }
    return `${staticPart}${padding}${animatedStr}`;
  };

  const handleQuickQuote = () => {
    // Pass location and eventType values to the GetQuote page
    const params = { 
      location: searchLocation || '', 
      eventType: searchEventType || '' 
    };
    console.log("Home: Passing params to GetQuote:", {
      searchLocation,
      searchEventType,
      params
    });
    onNavigate('get-quote', params);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564469780933-37609ec45780?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Business meeting room"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-1000 ease-in-out fade-in-image"
            style={{ maxWidth: '2500px', maxHeight: '2000px', margin: '0 auto' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
        </div>
        
        <nav className="relative z-10 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            BulkRooms
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleQuickQuote}
              className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition relative z-30"
            >
              Get Quick Quote
            </button>
            <button 
              onClick={() => onNavigate('contact-us')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition relative z-30"
            >
              Contact Us
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex items-center justify-center h-full px-4 pt-16 md:pt-2 max-w-7xl mx-auto">
          {/* Centered Text content */}
          <div className="text-center w-full max-w-3xl">
            <p className="text-white text-2xl mb-6 font-semibold">
              Tired of endless follow-ups?
            </p>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-relaxed">
              {/* <br /> */}
              Get Quotes within{" "}
              <span className="line-through">weeks</span>
              <span className="text-green-400 ml-4">hours</span>,
              <span className="mt-2 inline-block text-6xl">without any Follow-Ups</span>
            </h1>
            {/* Search Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 mb-8 shadow-lg mx-auto max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="relative">
                  <label htmlFor="location" className="sr-only">Location</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    id="location" 
                    placeholder="Country, city, or region" 
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 bg-transparent"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="eventType" className="sr-only">Event Type</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <select 
                    id="eventType" 
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-transparent"
                    value={searchEventType}
                    onChange={(e) => setSearchEventType(e.target.value)}
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate-stay">Corporate Stay</option>
                    <option value="trip">Trip</option>
                    <option value="conference">Conference</option>
                    <option value="sports-event">Sports Event</option>
                    <option value="family-reunion">Family Reunion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleQuickQuote}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition relative z-20 shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              Get Quick Quote
            </button>
          </div>
        </div>
      </header>

      {/* Numbers Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-900 mb-2">
                <CountUp 
                  end={hours} 
                  duration={2} 
                  separator=","
                />+
              </h3>
              <p className="text-xl text-gray-600">Hours Saved on Research</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-900 mb-2">
                <CountUp 
                  end={savings} 
                  duration={2} 
                  separator=","
                />
              </h3>
              <p className="text-xl text-gray-600">Saved on Bulk Bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Types Section */}
      <div className="relative z-10 bg-white">
        <BookingTypesSection />
      </div>

      {/* Why Book With Us Section */}
      <section id="why-book" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Description */}
            <div className="fade-in flex flex-col justify-center h-full">
              <h2 className="text-4xl font-bold mb-8 text-blue-900">Why Book With Us</h2>
              <p className="text-lg text-gray-600">
                BulkRooms simplifies the complex process of booking multiple hotel rooms, saving you time and money.
              </p>
            </div>

            {/* Right Side - Feature Blocks */}
            <div className="grid grid-cols-2 gap-6">
              {/* Instant Quotes Block with Animation */}
              <div className="relative overflow-hidden bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-start text-center hover:shadow-xl transition-shadow duration-300">
                {/* Speed Lines Animation */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-24 h-1 bg-white opacity-30 rounded"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{
                      x: -200,
                      opacity: 0,
                      scaleX: 0.5,
                    }}
                    animate={{
                      x: '110vw',
                      opacity: [0, 0.8, 0],
                      scaleX: [0.5, 1.2],
                    }}
                    transition={{
                      duration: Math.random() * 1 + 0.8,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: 'easeIn',
                    }}
                  />
                ))}
                <div className="relative z-10 w-full">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Instant Quotes</h3>
                  <p className="text-gray-300 text-sm">Receive instant quotes from hotels within hours</p>
                </div>
              </div>

              {/* Other Feature Blocks */}
              {[
                
                {
                  icon: <DotLottieReact
                    src="https://lottie.host/37715cdb-4baf-4fbe-b7fd-f2d61f0f0edd/TzsE0TYdA1.lottie"
                    loop
                    autoplay
                    style={{ width: '50px', height: '50px' }}
                  />,
                  title: "Plenty of Options",
                  description: "Wide selection of hotels across your destination"
                },
                {
                  icon: <Tag className="h-8 w-8" />,
                  title: "Best Rates",
                  description: "Access special rates that aren't available elsewhere"
                  
                },
                {
                  icon: <DotLottieReact
                    src="https://lottie.host/4a5e8473-056c-4e41-882f-bb63d66c7ef7/c6iHMIu1wA.lottie"
                    loop
                    autoplay
                    style={{ width: '50px', height: '50px' }}
                  />,
                  title: "Time Saving",
                  description: "Get quotes from multiple hotels with a single request",
                  bgColor: "bg-gray-800"
                },
                
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300 ${feature.bgColor || 'bg-white'}`}
                >
                  <div className={`${feature.bgColor ? 'bg-gray-700' : 'bg-blue-100'} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${feature.bgColor ? 'text-white' : 'text-blue-900'} mb-2`}>{feature.title}</h3>
                  <p className={`${feature.bgColor ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section id="process" className="bg-gradient-to-b from-blue-50 to-indigo-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 fade-in text-indigo-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="fade-in transform hover:scale-105 transition-transform duration-300 flex flex-col" style={{ transitionDelay: '200ms' }}>
              <div className="text-4xl font-bold text-purple-600 mb-4 text-center">1</div>
              <div className="bg-white p-8 rounded-2xl text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquareQuote className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Send Request</h3>
                <p className="text-gray-600">Tell us your requirements and we'll start working on finding the perfect venues for you</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300 flex flex-col" style={{ transitionDelay: '400ms' }}>
              <div className="text-4xl font-bold text-indigo-600 mb-4 text-center">2</div>
              <div className="bg-white p-8 rounded-2xl text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">Get Quotes</h3>
                <p className="text-gray-600">Receive competitive quotes from multiple hotels tailored to your needs</p>
              </div>
            </div>
            <div className="fade-in transform hover:scale-105 transition-transform duration-300 flex flex-col" style={{ transitionDelay: '600ms' }}>
              <div className="text-4xl font-bold text-pink-600 mb-4 text-center">3</div>
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

      <style>
        {`
          @keyframes slideInOut {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            5% {
              transform: translateX(0);
              opacity: 1;
            }
            75% {
              transform: translateX(0);
              opacity: 1;
            }
            80% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(-100%);
              opacity: 0;
            }
          }a
        `}
      </style>
    </div>
  );
};

export default Home; 