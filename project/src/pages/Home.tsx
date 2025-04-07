import React, { useEffect, useState } from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users, Zap, List, Tag } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import BookingTypesSection from '../components/BookingTypesSection';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';
import { World } from '../components/ui/globe';

// Sample globe data
const sampleGlobeData = [
  {
    order: 1,
    startLat: 40.7128,
    startLng: -74.0060,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.4,
    color: '#0077CC'
  },
  {
    order: 2,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.3,
    color: '#0077CC'
  },
  {
    order: 3,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 41.9028,
    endLng: 12.4964,
    arcAlt: 0.3,
    color: '#0077CC'
  },
  {
    order: 4,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.4,
    color: '#00AAFF'
  },
  {
    order: 5,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.3,
    color: '#00AAFF'
  },
  {
    order: 6,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 40.7128,
    endLng: -74.0060,
    arcAlt: 0.8,
    color: '#00CCAA'
  },
  {
    order: 7,
    startLat: 19.0760,
    startLng: 72.8777,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.6,
    color: '#FF5500'
  },
  {
    order: 8,
    startLat: 19.0760,
    startLng: 72.8777,
    endLat: 25.2048,
    endLng: 55.2708,
    arcAlt: 0.3,
    color: '#FF5500'
  },
  {
    order: 9,
    startLat: 25.2048,
    startLng: 55.2708,
    endLat: 41.9028,
    endLng: 12.4964,
    arcAlt: 0.5,
    color: '#9933FF'
  },
  {
    order: 10,
    startLat: 55.7558,
    startLng: 37.6173,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.4,
    color: '#9933FF'
  },
  // New data points
  {
    order: 11,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 40.7128,
    endLng: -74.0060,
    arcAlt: 0.7,
    color: '#FF3366'
  },
  {
    order: 12,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.3,
    color: '#FF3366'
  },
  {
    order: 13,
    startLat: 13.7563,
    startLng: 100.5018,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: '#33CCFF'
  },
  {
    order: 14,
    startLat: 31.2304,
    startLng: 121.4737,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.4,
    color: '#66DD00'
  },
  {
    order: 15,
    startLat: 31.2304,
    startLng: 121.4737,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: '#66DD00'
  },
  {
    order: 16,
    startLat: 28.6139,
    startLng: 77.2090,
    endLat: 19.0760,
    endLng: 72.8777,
    arcAlt: 0.2,
    color: '#FF8800'
  },
  {
    order: 17,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 40.7128,
    endLng: -74.0060,
    arcAlt: 0.3,
    color: '#8844FF'
  },
  {
    order: 18,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.9,
    color: '#8844FF'
  },
  {
    order: 19,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.2,
    color: '#FF5500'
  },
  {
    order: 20,
    startLat: 52.5200,
    startLng: 13.4050,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.2,
    color: '#9933FF'
  },
  {
    order: 21,
    startLat: 52.5200,
    startLng: 13.4050,
    endLat: 55.7558,
    endLng: 37.6173,
    arcAlt: 0.3,
    color: '#9933FF'
  },
  {
    order: 22,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 40.4168,
    endLng: -3.7038,
    arcAlt: 0.2,
    color: '#33AACC'
  },
  {
    order: 23,
    startLat: 40.4168,
    startLng: -3.7038,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.3,
    color: '#33AACC'
  },
  {
    order: 24,
    startLat: -37.8136,
    startLng: 144.9631,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: '#00CCAA'
  },
  {
    order: 25,
    startLat: -37.8136,
    startLng: 144.9631,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.7,
    color: '#00CCAA'
  },
  // Additional Indian connections
  {
    order: 26,
    startLat: 19.0760, // Mumbai
    startLng: 72.8777,
    endLat: 12.9716, // Bangalore
    endLng: 77.5946,
    arcAlt: 0.2,
    color: '#FF7700'
  },
  {
    order: 27,
    startLat: 28.6139, // Delhi
    startLng: 77.2090,
    endLat: 22.5726, // Kolkata
    endLng: 88.3639,
    arcAlt: 0.25,
    color: '#FF7700'
  },
  {
    order: 28,
    startLat: 12.9716, // Bangalore
    startLng: 77.5946,
    endLat: 13.0827, // Chennai
    endLng: 80.2707,
    arcAlt: 0.15,
    color: '#FF7700'
  },
  {
    order: 29,
    startLat: 17.3850, // Hyderabad
    startLng: 78.4867,
    endLat: 28.6139, // Delhi
    endLng: 77.2090,
    arcAlt: 0.3,
    color: '#FF7700'
  },
  {
    order: 30,
    startLat: 13.0827, // Chennai
    startLng: 80.2707,
    endLat: 7.8731, // Colombo
    endLng: 80.7718,
    arcAlt: 0.3,
    color: '#FF5500'
  },
  {
    order: 31,
    startLat: 19.0760, // Mumbai
    startLng: 72.8777,
    endLat: 3.1390, // Singapore
    endLng: 101.6869,
    arcAlt: 0.5,
    color: '#FF5500'
  },
  {
    order: 32,
    startLat: 28.6139, // Delhi
    startLng: 77.2090,
    endLat: 25.2048, // Dubai
    endLng: 55.2708,
    arcAlt: 0.4,
    color: '#FF5500'
  },
  {
    order: 33,
    startLat: 19.0760, // Mumbai
    startLng: 72.8777,
    endLat: -1.2921, // Nairobi
    endLng: 36.8219,
    arcAlt: 0.6,
    color: '#FF3366'
  },
  {
    order: 34,
    startLat: 28.6139, // Delhi
    startLng: 77.2090,
    endLat: 51.5074, // London
    endLng: -0.1278,
    arcAlt: 0.7,
    color: '#9933FF'
  },
  {
    order: 35,
    startLat: 28.6139, // Delhi
    startLng: 77.2090,
    endLat: 35.6762, // Tokyo
    endLng: 139.6503,
    arcAlt: 0.6,
    color: '#33CCFF'
  },
  // Additional data points for more highlights
  {
    order: 36,
    startLat: 40.7128, // New York
    startLng: -74.0060,
    endLat: 32.7767, // San Diego
    endLng: -117.2346,
    arcAlt: 0.35,
    color: '#66DD00'
  },
  {
    order: 37,
    startLat: 35.6762, // Tokyo
    startLng: 139.6503,
    endLat: 37.5665, // Seoul
    endLng: 126.9780,
    arcAlt: 0.25,
    color: '#33CCFF'
  },
  {
    order: 38,
    startLat: 55.7558, // Moscow
    startLng: 37.6173,
    endLat: 59.9343, // Oslo
    endLng: 10.6450,
    arcAlt: 0.35,
    color: '#9933FF'
  },
  {
    order: 39,
    startLat: -33.8688, // Sydney
    startLng: 151.2093,
    endLat: -41.2865, // Wellington
    endLng: 174.7762,
    arcAlt: 0.3,
    color: '#00CCAA'
  },
  {
    order: 40,
    startLat: 25.2048, // Dubai
    startLng: 55.2708,
    endLat: 24.4539, // Doha
    endLng: 54.3773,
    arcAlt: 0.15,
    color: '#FF5500'
  },
  {
    order: 41,
    startLat: 48.8566, // Paris
    startLng: 2.3522,
    endLat: 45.4642, // Milan
    endLng: 9.1900,
    arcAlt: 0.2,
    color: '#33AACC'
  },
  {
    order: 42,
    startLat: -22.9068, // Rio
    startLng: -43.1729,
    endLat: -15.7801, // Salvador
    endLng: -47.9292,
    arcAlt: 0.25,
    color: '#FF3366'
  },
  {
    order: 43,
    startLat: 51.5074, // London
    startLng: -0.1278,
    endLat: 55.9533, // Edinburgh
    endLng: -3.1883,
    arcAlt: 0.18,
    color: '#33AACC'
  },
  {
    order: 44,
    startLat: 12.9716, // Bangalore
    startLng: 77.5946,
    endLat: 28.7041, // Delhi
    endLng: 77.1025,
    arcAlt: 0.3,
    color: '#FF7700'
  },
  {
    order: 45,
    startLat: 1.3521, // Singapore
    startLng: 103.8198,
    endLat: 3.1390, // Kuala Lumpur
    endLng: 101.6869,
    arcAlt: 0.15,
    color: '#33CCFF'
  }
];

// Globe config
const globeConfig = {
  globeColor: '#1d072e',
  atmosphereColor: '#ffffff',
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  autoRotate: true,
  autoRotateSpeed: 0.7,
  atmosphereAltitude: 0.18
};

interface HomeProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [hours, setHours] = useState(Number(localStorage.getItem('totalHours') || '100'));
  const [savings, setSavings] = useState(Number(localStorage.getItem('totalSavings') || '50000'));
  const [initialAnimation, setInitialAnimation] = useState(!localStorage.getItem('initialAnimationCompleted'));
  const [animatedHours, setAnimatedHours] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Business meeting room"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-1000 ease-in-out fade-in-image"
            style={{ maxWidth: '1600px', maxHeight: '900px', margin: '0 auto' }}
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
              Get Quick Quote
            </button>
            <button 
              onClick={() => onNavigate('contact-us')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Contact Us
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col md:flex-row items-center h-full px-4 pt-16 md:pt-2 max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className="text-center md:text-left md:w-2/5 md:mr-8">
            <p className="text-white text-2xl mb-6 font-semibold">
              Planning a stay for 10+ guests?
            </p>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-relaxed">
              Get 5+ quotes within <span className="relative">
                <span className="line-through opacity-70">weeks</span>
                <span className="text-blue-400 absolute -right-2 transform translate-x-full">hours</span>
              </span>
            </h1>
            <button 
              onClick={() => onNavigate('get-quote')}
              className="bg-blue-600 text-white px-7 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Get Quick Quote
            </button>
          </div>
          
          {/* Right side - Globe visualization */}
          <div className="w-full md:w-3/5 h-[450px] md:h-[750px] relative md:-mt-16 md:absolute md:right-0 md:top-0 md:pt-24">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="w-full h-full overflow-hidden md:translate-x-40">
              <World globeConfig={globeConfig} data={sampleGlobeData} />
            </div>
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
          }
        `}
      </style>
    </div>
  );
};

export default Home; 