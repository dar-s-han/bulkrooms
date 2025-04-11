import React, { useEffect, useState } from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users, Zap, List, Tag, X, ChevronRight } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import BookingTypesSection from '../components/BookingTypesSection';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';
import { siteConfig } from '../metadata';

interface HomeProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy' | 'careers' | 'terms-of-service', params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [hours, setHours] = useState(1620000);
  const [savings, setSavings] = useState(13550000);
  const [initialAnimation, setInitialAnimation] = useState(!localStorage.getItem('initialAnimationCompleted'));
  const [animatedHours, setAnimatedHours] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchEventType, setSearchEventType] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  useEffect(() => {
    // Set document metadata
    document.title = siteConfig.name;
    document.querySelector('meta[name="description"]')?.setAttribute('content', siteConfig.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', siteConfig.keywords.join(', '));
    
    // Open Graph metadata
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', siteConfig.openGraph.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', siteConfig.openGraph.description);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', siteConfig.ogImage);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', siteConfig.url);
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', siteConfig.openGraph.type);
    document.querySelector('meta[property="og:site_name"]')?.setAttribute('content', siteConfig.openGraph.siteName);
    
    // Twitter metadata
    document.querySelector('meta[name="twitter:card"]')?.setAttribute('content', siteConfig.twitter.card);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', siteConfig.twitter.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', siteConfig.twitter.description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', siteConfig.twitter.images[0]);
    document.querySelector('meta[name="twitter:creator"]')?.setAttribute('content', siteConfig.twitter.creator);

    // Initialize values from localStorage
    const storedHours = Number(localStorage.getItem('totalHours') || '1620000');
    const storedSavings = Number(localStorage.getItem('totalSavings') || '13550000');
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

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');
      
      if (isSidebarOpen && 
          sidebar && 
          toggleButton && 
          !sidebar.contains(event.target as Node) && 
          !toggleButton.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsSidebarOpen(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar Navigation */}
      <div 
        id="sidebar"
        className={`fixed right-0 top-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">BulkRooms</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors pointer-events-auto"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <nav className="space-y-1 flex-1">
            <div className="space-y-1">
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left group pointer-events-auto relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors pointer-events-none">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 pointer-events-none" />
              </button>

              <button 
                onClick={() => scrollToSection('process')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left group pointer-events-auto relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors pointer-events-none">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">How to Book</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 pointer-events-none" />
              </button>

              <button 
                onClick={() => scrollToSection('why-book')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left group pointer-events-auto relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors pointer-events-none">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Why Book With Us</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 pointer-events-none" />
              </button>

              <button 
                onClick={() => scrollToSection('testimonials')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left group pointer-events-auto relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors pointer-events-none">
                    <MessageSquareQuote className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Testimonials</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 pointer-events-none" />
              </button>

              <button 
                onClick={() => {
                  onNavigate('get-quote');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-left group mt-4 pointer-events-auto relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors pointer-events-none">
                    <Tag className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">Get Quote</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/80 group-hover:text-white pointer-events-none" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        id="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed right-4 top-4 z-50 p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300"
        aria-label="Toggle sidebar"
      >
        <div className="relative w-6 h-6">
          <span 
            className={`absolute left-0 w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
              isSidebarOpen ? 'rotate-45 top-3' : 'top-1'
            }`}
          />
          <span 
            className={`absolute left-0 w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
              isSidebarOpen ? 'opacity-0' : 'top-3'
            }`}
          />
          <span 
            className={`absolute left-0 w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
              isSidebarOpen ? '-rotate-45 top-3' : 'top-5'
            }`}
          />
        </div>
      </button>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
        
        <nav className="relative z-10 flex flex-wrap justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          <div className="text-white text-xl sm:text-2xl font-bold flex items-center gap-2">
            BulkRooms
          </div>
        </nav>

        <div className="relative z-10 flex items-center justify-center h-full px-4 -mt-8 sm:-mt-12 md:-mt-16 max-w-7xl mx-auto">
          {/* Centered Text content */}
          <div className="text-center w-full max-w-3xl">
            <p className="text-white text-xl sm:text-2xl mb-2 sm:mb-4 font-semibold">
              Tired of endless follow-ups?
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-16 sm:mb-20 leading-tight sm:leading-relaxed">
              Get Quotes within{" "}
              <span className="line-through">weeks</span>
              <span className="text-green-400 ml-2 sm:ml-4">hours</span>,
              <span className="mt-2 inline-block text-3xl sm:text-4xl md:text-6xl">without any Follow-Ups</span>
            </h1>
            {/* Search Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 mb-6 sm:mb-8 shadow-lg mx-auto max-w-3xl mt-8 sm:mt-10">
              <div className="grid grid-cols-1 gap-2 sm:gap-1 sm:grid-cols-2">
                <div className="relative">
                  <label htmlFor="location" className="sr-only">Location</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    id="location" 
                    placeholder="Country, city, or region" 
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 bg-transparent text-sm sm:text-base"
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
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-transparent text-sm sm:text-base"
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
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-900 mb-2">
                <CountUp 
                  end={hours} 
                  duration={2} 
                  separator=","
                  formattingFn={(value) => Math.floor(value).toLocaleString()}
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
                  formattingFn={(value) => `$ ${Math.floor(value).toLocaleString()}`}
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
      <section id="why-book" className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - Title and Description */}
            <div className="fade-in flex flex-col justify-center h-full text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-blue-900">Why Book With Us</h2>
              <p className="text-base sm:text-lg text-gray-600">
                BulkRooms simplifies the complex process of booking multiple hotel rooms, saving you time and money.
              </p>
            </div>

            {/* Right Side - Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
      <section id="process" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our simple 3-step process makes booking group accommodations effortless</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquareQuote className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">1. Send Request</h3>
              <p className="text-gray-600 text-center">Tell us your requirements and we'll start working on finding the perfect venues for you</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-4 text-center">2. Get Quotes</h3>
              <p className="text-gray-600 text-center">Receive competitive quotes from multiple hotels tailored to your needs</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Hotel className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4 text-center">3. Book & Save</h3>
              <p className="text-gray-600 text-center">Secure your booking and enjoy exclusive savings on your group stay</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied customers who have simplified their group booking experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="/assets/images/testimonials/vaishnavi.jpg" 
                    alt="Vaishnavi Somani"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Vaishnavi Somani</h4>
                    <p className="text-sm text-gray-500">Founder, Local Narratives</p>
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/vaishnavi-somani-940276168/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-600 italic">"I was able to find the perfect accommodation for my trip with BulkRooms. The team was very helpful and the rates were great."</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="/assets/images/testimonials/adithyaa.jpg" 
                    alt="Adithyaa Sriram"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Adithyaa Sriram</h4>
                    <p className="text-sm text-gray-500">Founder, The Unbored Club</p>
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/adithyaa-sriram/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-600 italic">"I received the quotes instantly. The team helped us get the perfect accommodations for all our guests."</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="/assets/images/testimonials/parth.jpg" 
                    alt="Parth Garg"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Parth Garg</h4>
                    <p className="text-sm text-gray-500">CEO, Aspora</p>
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/parth29/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-600 italic">"The experience was seamless. We had multiple location options within hours, and everything was handled with utmost professionalism"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#f8f9ff] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48Y2lyY2xlIGZpbGw9IiNlZWVlZWUiIGZpbGwtb3BhY2l0eT0iMC4yIiBjeD0iMjAiIGN5PSIyMCIgcj0iMyIvPjwvZz48L3N2Zz4=')]"></div>
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-3 text-indigo-900">Frequently Asked Questions</h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our group booking services.
          </p>
          <div className="space-y-4">
            {[
              {
                question: "How quickly can I get quotes for my group booking?",
                answer: "We typically provide quotes within 24 hours of receiving your request. For urgent requests, we can often provide initial quotes within 4-6 hours."
              },
              {
                question: "What types of group bookings do you handle?",
                answer: "We handle all types of group bookings including corporate events, weddings, conferences, sports teams, family reunions, and more. Our network includes hotels suitable for any group size or event type."
              },
              {
                question: "What information do I need to provide for a group booking request?",
                answer: "To get the most accurate quotes, please provide: number of rooms needed, dates of stay, preferred location, room type preferences, any special requirements, and your contact information."
              },
              {
                question: "Is there a minimum number of rooms required for group bookings?",
                answer: "While we can assist with bookings of any size, our best rates typically start with a minimum of 10 rooms. However, we can still help with smaller groups and will do our best to secure competitive rates."
              },
              {
                question: "What happens after I receive the quotes?",
                answer: "Once you receive the quotes, you can review them and ask any questions. When you're ready to proceed, we'll help you finalize the booking and handle all the necessary arrangements with the hotel."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base font-semibold text-indigo-900">{faq.question}</h3>
                  <button 
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label={expandedFaqs.includes(index) ? "Collapse answer" : "Expand answer"}
                  >
                    <svg 
                      className={`w-4 h-4 text-indigo-600 transition-transform duration-300 ${
                        expandedFaqs.includes(index) ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaqs.includes(index) ? 'max-h-96 mt-3' : 'max-h-0'
                  }`}
                >
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info Column */}
            <div className="col-span-1">
              <h2 className="text-2xl font-bold mb-4">BulkRooms</h2>
              <p className="text-gray-400 mb-6">Revolutionizing group hotel bookings with a seamless and secure platform for maximizing your savings.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">PRODUCT</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('why-book')} className="text-gray-400 hover:text-white transition-colors">Features</button>
                </li>
                <li>
                  <button onClick={() => onNavigate('get-quote')} className="text-gray-400 hover:text-white transition-colors">Get Quote</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition-colors">FAQs</button>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => onNavigate('contact-us')} className="text-gray-400 hover:text-white transition-colors">Contact</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-white transition-colors">Testimonials</button>
                </li>
                <li>
                  <button onClick={() => onNavigate('careers')} className="text-gray-400 hover:text-white transition-colors">Careers</button>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-start gap-2">
                  <svg className="h-6 w-6 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p>Bangalore, India</p>
                    <p>New York, United States</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-6 w-6 shrink-0" />
                  <p>+91 7425875024</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>info@bulkrooms.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2025 BulkRooms. All rights reserved.
              </div>
              <div className="flex gap-6">
                <button onClick={() => onNavigate('privacy-policy')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </button>
                <button onClick={() => onNavigate('terms-of-service')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </button>
                <button onClick={() => onNavigate('cookie-policy')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </button>
              </div>
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