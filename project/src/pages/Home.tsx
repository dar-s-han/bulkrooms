import React, { useEffect, useState, useMemo, memo } from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users, Zap, List, Tag, X, ChevronRight, BrainCircuit } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import BookingTypesSection from '../components/BookingTypesSection';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';
import { siteConfig } from '../metadata';
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface HomeProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'privacy-policy' | 'cookie-policy' | 'careers' | 'terms-of-service', params?: any) => void;
}

interface LocationInfo {
  ip: string;
  country: string;
  countryCode: string;
}

interface LocationSuggestion {
  entity_name: string;
  type: string;
  hierarchy: string;
  entity_id: string;
  location: string;
  class: string;
}

// Create a separate NumbersSection component
const NumbersSection = memo(() => {
  const [hours, setHours] = useState(1620000);
  const [savings, setSavings] = useState(13550000);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize values from localStorage first
  useEffect(() => {
    const storedHours = Number(localStorage.getItem('totalHours') || '1620000');
    const storedSavings = Number(localStorage.getItem('totalSavings') || '13550000');
    setHours(storedHours);
    setSavings(storedSavings);
    setIsInitialized(true);
  }, []);

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    if (!isInitialized) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('numbers-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    // Normal incremental counting with smoother transitions
    const interval = setInterval(() => {
      const hoursIncrement = Math.random() < 0.03 ? 1 : 0;
      const savingsIncrement = Math.floor(Math.random() * 6) + 10;
      
      const newHours = hours + hoursIncrement;
      const newSavings = savings + savingsIncrement;
      
      // Smooth transition for hours
      const hoursTransition = setInterval(() => {
        setHours(prev => {
          const diff = newHours - prev;
          return prev + Math.sign(diff) * Math.min(Math.abs(diff), 10);
        });
      }, 50);
      
      // Smooth transition for savings
      const savingsTransition = setInterval(() => {
        setSavings(prev => {
          const diff = newSavings - prev;
          return prev + Math.sign(diff) * Math.min(Math.abs(diff), 100);
        });
      }, 50);
      
      setTimeout(() => {
        clearInterval(hoursTransition);
        clearInterval(savingsTransition);
      }, 1000);
      
      localStorage.setItem('totalHours', newHours.toString());
      localStorage.setItem('totalSavings', newSavings.toString());
    }, 15000);

    return () => clearInterval(interval);
  }, [hours, savings, isInitialized]);

  if (!isInitialized) {
    return (
      <section 
        id="numbers-section"
        className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-50 z-10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="backdrop-blur-sm rounded-3xl p-8">
                <h3 className="text-4xl font-bold text-blue-900 mb-2">
                  {hours.toLocaleString()}+
                </h3>
                <p className="text-xl text-gray-600">Hours Saved on Research</p>
              </div>
            </div>
            <div className="text-center">
              <div className="backdrop-blur-sm rounded-3xl p-8">
                <h3 className="text-4xl font-bold text-blue-900 mb-2">
                  ${savings.toLocaleString()}+
                </h3>
                <p className="text-xl text-gray-600">Saved on Bulk Bookings</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="numbers-section"
      className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-50 z-10 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-4xl font-bold text-blue-900 mb-2">
                <CountUp 
                  end={hours} 
                  duration={1.5}
                  separator=","
                  formattingFn={(value) => Math.floor(value).toLocaleString()}
                />+
              </h3>
              <p className="text-xl text-gray-600">Hours Saved on Research</p>
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-4xl font-bold text-blue-900 mb-2">
                <CountUp 
                  end={savings} 
                  duration={1.5}
                  separator=","
                  formattingFn={(value) => `$ ${Math.floor(value).toLocaleString()}+`}
                />
              </h3>
              <p className="text-xl text-gray-600">Saved on Bulk Bookings</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

NumbersSection.displayName = 'NumbersSection';

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [hours, setHours] = useState(1620000);
  const [savings, setSavings] = useState(13550000);
  const [searchLocation, setSearchLocation] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(-1);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchCountryCode, setSearchCountryCode] = useState('+91');

  useEffect(() => {
    // Set document metadata
    document.title = siteConfig.name;
    
    // Ensure meta description exists
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', siteConfig.description);
    
    // Add canonical tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', siteConfig.url);
    
    // Ensure meta keywords exists
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', siteConfig.keywords.join(', '));
    
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
      
      localStorage.setItem('totalHours', newHours.toString());
      localStorage.setItem('totalSavings', newSavings.toString());
    }, 15000);

    return () => clearInterval(interval);
  }, [hours, savings]);

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

  const handleQuickQuote = async () => {
    // Track Google Analytics event
    if (window.gtag) {
      window.gtag('config', 'G-9N08T76Q5G');
      window.gtag('event', 'hero_section_button_click', {
        'event_category': 'Hero Section',
        'event_label': 'Get Quick Quote',
        'value': 1
      });
    }

    try {
      // Prepare the data to send to Google Sheets
      const submissionData = {
        sheetName: 'frontPageLeads',
        location: searchLocation || '',
        phone: searchPhone || '',
        countryCode: searchCountryCode || '+91',
        timestamp: new Date().toISOString(),
        ipAddress: locationInfo?.ip || ''
      };

      // Send data to Google Sheets
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxS6tna_aXRBRHEcGszzKbknkEpaL9MG9nW2GRhW_AgsVf8a0QzgXAALRY5bvUf1cTW/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      // Pass location and phone values to the GetQuote page
      const params = {
        location: searchLocation || '',
        phone: searchPhone || '',
        countryCode: searchCountryCode || '+91'
      };
      onNavigate('get-quote', params);
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      // Still navigate to GetQuote page even if Google Sheets submission fails
      const params = {
        location: searchLocation || '',
        phone: searchPhone || '',
        countryCode: searchCountryCode || '+91'
      };
      onNavigate('get-quote', params);
    }
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
    if (window.gtag) {
      window.gtag('config', 'G-9N08T76Q5G');
      window.gtag('event', 'FAQ_opened', {
        'event_category': 'Home Page',
        'event_label': 'FAQ Check',
        'value': 1
      });
    }
  };

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

  const fetchLocationSuggestions = async (query: string, countryCode: string) => {
    try {
      const response = await fetch(
        `https://www.skyscanner.net/g/autosuggest-search/api/v1/search-hotel/${countryCode}/en-GB/${query}?rf=map&vrows=10`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data.map((place: any) => ({
          entity_name: place.entity_name,
          type: place.type,
          hierarchy: place.hierarchy,
          entity_id: place.entity_id,
          location: place.location,
          class: place.class
        })));
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchLocation(value);

    if (locationInfo?.countryCode) {
      fetchLocationSuggestions(value, locationInfo.countryCode);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationFocus = () => {
    setShowSuggestions(true);
    if (locationInfo?.countryCode) {
      fetchLocationSuggestions('', locationInfo.countryCode);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setSearchLocation(suggestion.entity_name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveLocationIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveLocationIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && activeLocationIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeLocationIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
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
                  if (window.gtag) {
                    window.gtag('config', 'G-9N08T76Q5G');
                    window.gtag('event', 'social_media_button_clicked', {
                      'event_category': 'Home Page',
                      'event_label': 'Social Media Footer Section',
                      'value': 1
                    });
                  }
                  onNavigate('home');
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
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
          if (window.gtag) {
            window.gtag('config', 'G-9N08T76Q5G');
            window.gtag('event', 'hero_section_nav_bar_opened', {
              'event_category': 'Hero Section',
              'event_label': 'Nav Bar Button',
              'value': 1
            });
          }
        }}
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

        <div className="relative z-10 flex items-center justify-center h-full px-4 -mt-16 sm:-mt-20 md:-mt-24 max-w-7xl mx-auto">
          {/* Centered Text content */}
          <div className="text-center w-full max-w-3xl relative flex flex-col items-center justify-center">
            <ShimmerButton className="shadow-2xl mb-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-2">
                <span className="whitespace-pre-wrap text-center text-sm font-normal leading-none tracking-wider text-white lg:text-base flex items-center">
                  Powered by
                  <span className="ml-3 font-bold tracking-widest text-green-400 text-xl lg:text-2xl">
                    AI
                  </span>
                </span>
              </div>
            </ShimmerButton>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-normal text-white mb-4 leading-tight sm:leading-relaxed">
              Get Quotes within{" "}
              <span className="line-through">weeks</span>
              <span className="text-green-400 ml-2 sm:ml-4">hours</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 sm:mb-2">
              Let AI streamline your bulk hotel bookings saving you time, money, and hassle on group bookings.
            </p>
            {/* Search Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-1 mb-4 sm:mb-6 shadow-lg mx-auto max-w-4xl mt-4 sm:mt-5 relative z-50">
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
                    onChange={handleLocationChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleLocationFocus}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowSuggestions(false);
                      }, 200);
                    }}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute inset-x-0 z-[100]">
                      <div className="mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[200px] overflow-y-auto">
                        {suggestions.map((suggestion, idx) => {
                          const hierarchyParts = suggestion.hierarchy.split('|');
                          const subtitle = hierarchyParts.filter(part => part !== suggestion.entity_name).join(', ');
                          
                          return (
                            <div
                              key={suggestion.entity_id}
                              className={`px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-start gap-2 ${
                                idx === activeLocationIndex ? 'bg-gray-50' : ''
                              } ${idx !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <div className="text-gray-400 mt-0.5">
                                {suggestion.type === 'city' && (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 20V4C4 3.45 4.196 2.979 4.588 2.587C4.98 2.195 5.45067 1.99934 6 2H18C18.55 2 19.021 2.196 19.413 2.588C19.805 2.98 20.0007 3.45067 20 4V20H4ZM6 18H18V4H6V18ZM8 17H10V15H8V17ZM8 13H10V11H8V13ZM8 9H10V7H8V9ZM12 17H14V15H12V17ZM12 13H14V11H12V13ZM12 9H14V7H12V9ZM16 17H18V15H16V17ZM16 13H18V11H16V13ZM16 9H18V7H16V9Z" fill="currentColor"/>
                                  </svg>
                                )}
                                {suggestion.type === 'airport' && (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L4 12H7L9 22H11L13 12L15 22H17L19 12H22L14 2H12Z" fill="currentColor"/>
                                  </svg>
                                )}
                                {suggestion.type === 'hotel' && (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 14C8.1 14 9 13.1 9 12C9 10.9 8.1 10 7 10C5.9 10 5 10.9 5 12C5 13.1 5.9 14 7 14ZM12.5 3H2V21H4V19H20V21H22V8C22 5.24 19.76 3 17 3H12.5ZM4 17V5H12.5V17H4ZM20 17H14.5V5H17C18.66 5 20 6.34 20 8V17Z" fill="currentColor"/>
                                  </svg>
                                )}
                                {!['city', 'airport', 'hotel'].includes(suggestion.type) && (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12ZM12 4C16.2 4 20 7.22 20 11.2C20 16.19 12 24 12 24C12 24 4 16.19 4 11.2C4 7.22 7.8 4 12 4Z" fill="currentColor"/>
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">{suggestion.entity_name}</div>
                                {subtitle && (
                                  <div className="text-xs text-gray-500">{subtitle}</div>
                                )}
                              </div>
                              <div className="text-[10px] text-gray-400 self-center uppercase whitespace-nowrap">
                                {suggestion.type.replace('-', ' ')}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                    <select
                      id="countryCode"
                      value={searchCountryCode}
                      onChange={e => setSearchCountryCode(e.target.value)}
                      className="px-3 py-3 bg-white border-0 focus:ring-0 text-sm w-28"
                      required
                    >
                      <option value="+1">US/Canada (+1)</option>
                      <option value="+44">UK (+44)</option>
                      <option value="+91">India (+91)</option>
                      <option value="+61">Australia (+61)</option>
                      <option value="+81">Japan (+81)</option>
                      <option value="+49">Germany (+49)</option>
                      <option value="+33">France (+33)</option>
                      <option value="+971">UAE (+971)</option>
                      <option value="+65">Singapore (+65)</option>
                      <option value="+86">China (+86)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone number"
                      className="flex-1 px-3 py-3 border-0 focus:ring-0 text-sm sm:text-base bg-white"
                      value={searchPhone}
                      onChange={e => setSearchPhone(e.target.value)}
                      required
                      style={{ minWidth: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleQuickQuote}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition relative z-40 shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              Get Quick Quote
            </button>
          </div>
        </div>
      </header>

      {/* Replace the old Numbers Section with the new memoized component */}
      <NumbersSection />

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
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('config', 'G-9N08T76Q5G');
                        window.gtag('event', 'testimonials_checked', {
                          'event_category': 'Home Page',
                          'event_label': 'Testimonials Check',
                          'value': 1
                        });
                      }
                    }}
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
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('config', 'G-9N08T76Q5G');
                        window.gtag('event', 'testimonials_checked', {
                          'event_category': 'Home Page',
                          'event_label': 'Testimonials Check',
                          'value': 1
                        });
                      }
                    }}
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
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('config', 'G-9N08T76Q5G');
                        window.gtag('event', 'testimonials_checked', {
                          'event_category': 'Home Page',
                          'event_label': 'Testimonials Check',
                          'value': 1
                        });
                      }
                    }}
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
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Find answers to common questions about our group booking services.
            </motion.p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How quickly can I get quotes for my group booking?",
                answer: "We typically provide quotes within 24 hours of receiving your request. For urgent requests, we can often provide initial quotes within 4-6 hours. Our AI-powered system processes your requirements instantly and matches them with our extensive network of hotels. We understand that time is of the essence for group bookings, which is why we've optimized our process to deliver quick, accurate quotes while ensuring you get the best possible rates for your group."
              },
              {
                question: "What types of group bookings do you handle?",
                answer: "We handle all types of group bookings including corporate events, weddings, conferences, sports teams, family reunions, and more. Our network includes hotels suitable for any group size or event type. Whether you're planning a small corporate retreat for 20 people or a large conference for 500 attendees, we have the expertise and connections to find the perfect accommodations. We also specialize in handling special requirements such as accessibility needs, dietary restrictions, and specific room configurations."
              },
              {
                question: "What information do I need to provide for a group booking request?",
                answer: "To get the most accurate quotes, please provide: number of rooms needed, dates of stay, preferred location, room type preferences, any special requirements, and your contact information. Additionally, it's helpful to know your budget range, any specific amenities you require (like meeting rooms, dining facilities, or recreational areas), and whether you need transportation services. The more details you provide, the better we can match you with the perfect hotel options that meet all your group's needs."
              },
              {
                question: "Is there a minimum number of rooms required for group bookings?",
                answer: "While we can assist with bookings of any size, our best rates typically start with a minimum of 10 rooms. However, we can still help with smaller groups and will do our best to secure competitive rates. For groups of 5-9 rooms, we can often negotiate special rates, and for larger groups of 20+ rooms, we can provide additional benefits like complimentary upgrades, meeting space, or welcome amenities. Our flexible approach ensures that groups of all sizes can benefit from our booking services."
              },
              {
                question: "What happens after I receive the quotes?",
                answer: "Once you receive the quotes, you can review them and ask any questions. When you're ready to proceed, we'll help you finalize the booking and handle all the necessary arrangements with the hotel. Our team will guide you through the entire process, from reviewing the terms and conditions to arranging special requests and managing the payment process. We'll also provide you with a detailed booking confirmation and stay in touch to ensure everything is perfect for your group's stay."
              },
              {
                question: "How do you ensure the best rates for group bookings?",
                answer: "We leverage our extensive network of hotel partnerships and our AI-powered pricing system to secure the best possible rates for your group. Our system analyzes multiple factors including seasonal demand, hotel occupancy rates, and special promotions to find the most competitive prices. Additionally, we have direct relationships with many hotels, allowing us to bypass third-party booking fees and pass those savings directly to you. We also monitor market rates and can help you time your booking for optimal pricing."
              },
              {
                question: "What if I need to make changes to my group booking?",
                answer: "We understand that plans can change, and we're here to help you manage any modifications to your booking. Whether you need to adjust the number of rooms, change dates, or modify special requirements, our team will work with the hotel to accommodate your needs. We'll help you understand any potential impact on rates or availability and ensure a smooth transition. Our flexible booking policies are designed to make group travel planning as stress-free as possible."
              },
              {
                question: "Do you offer any additional services for group bookings?",
                answer: "We specialize exclusively in hotel booking services for groups. Our focus is on securing the best possible rates and accommodations for your group. We work directly with hotels to negotiate special group rates and ensure smooth booking processes. While we don't provide additional services like transportation or event planning, we excel at what we do best - finding and securing the perfect hotel accommodations for your group."
              },
              {
                question: "What are the best hotels in Jaipur for destination weddings?",
                answer: "Jaipur offers numerous luxury hotels perfect for destination weddings. We can help you find the best venues like the Rambagh Palace, Oberoi Rajvilas, or ITC Rajputana that offer stunning palace-like settings, spacious banquet halls, and excellent accommodation for your guests. Our team can negotiate special wedding packages that include room blocks, catering services, and venue decoration. We'll ensure you get the best rates for your wedding party while maintaining the royal Rajasthani experience."
              },
              {
                question: "How far in advance should I book hotels for a Goa destination wedding?",
                answer: "For Goa destination weddings, we recommend booking at least 6-12 months in advance, especially if your wedding is during peak season (October to March). Popular beachfront properties like Taj Exotica, Grand Hyatt Goa, and Leela Goa get booked quickly. We can help secure room blocks at these premium properties and negotiate special wedding rates. Our team will also ensure you get the best beach-facing rooms for your guests and coordinate with the hotel for wedding-related arrangements."
              },
              {
                question: "What are the accommodation options for a destination wedding in Rishikesh?",
                answer: "Rishikesh offers unique wedding venues ranging from luxury riverside resorts to spiritual retreat centers. We can help you find the perfect accommodation at properties like Ananda in the Himalayas, Aloha on the Ganges, or The Glasshouse on the Ganges. These venues offer stunning views of the Ganges and Himalayas, perfect for both intimate and grand celebrations. We'll handle room blocks for your guests and ensure special rates for extended stays, including pre and post-wedding activities."
              },
              {
                question: "Can you help with group bookings for a Delhi destination wedding?",
                answer: "Absolutely! Delhi has excellent wedding venues like The Leela Palace, The Oberoi, and The Taj Palace. We can help you secure room blocks at these luxury properties and negotiate special wedding rates. Our team will coordinate with multiple hotels to accommodate your guest list, arrange airport transfers, and handle special requests. We'll ensure your guests have comfortable stays while maintaining the grandeur of your Delhi wedding celebration."
              },
              {
                question: "What are the best months for destination weddings in Udaipur?",
                answer: "The best months for Udaipur destination weddings are October to March, when the weather is pleasant. We can help you find the perfect venue at iconic properties like The Oberoi Udaivilas, Taj Lake Palace, or Leela Palace Udaipur. These hotels offer stunning lake views and palace-like settings. We'll negotiate special wedding packages that include room blocks, venue decoration, and catering services. Our team will ensure your guests have a magical experience in the City of Lakes."
              },
              {
                question: "How can I get the best rates for a destination wedding in Kerala?",
                answer: "For Kerala destination weddings, we can help you secure the best rates at luxury properties like Kumarakom Lake Resort, Vivanta by Taj Bekal, or The Leela Kovalam. We'll negotiate special wedding packages that include room blocks, traditional Kerala wedding ceremonies, and ayurvedic spa treatments for your guests. Our team will coordinate with multiple hotels to accommodate your guest list and ensure everyone experiences the best of God's Own Country."
              },
              {
                question: "What are the accommodation options for a destination wedding in Jodhpur?",
                answer: "Jodhpur offers magnificent wedding venues like Umaid Bhawan Palace, Taj Hari Mahal, and RAAS. We can help you secure room blocks at these heritage properties and negotiate special wedding rates. Our team will coordinate with the hotels to arrange traditional Rajasthani wedding ceremonies, cultural performances, and local experiences for your guests. We'll ensure your guests have a royal experience in the Blue City while maintaining the best possible rates."
              },
              {
                question: "Can you help with group bookings for a destination wedding in Agra?",
                answer: "Yes! Agra has beautiful wedding venues like The Oberoi Amarvilas, ITC Mughal, and Jaypee Palace. We can help you secure room blocks at these luxury properties with views of the Taj Mahal. Our team will negotiate special wedding packages that include room blocks, venue decoration, and catering services. We'll coordinate with multiple hotels to accommodate your guest list and ensure everyone has a memorable experience in the City of Love."
              },
              {
                question: "What are the best hotels for a destination wedding in Varanasi?",
                answer: "Varanasi offers unique wedding venues like BrijRama Palace, Taj Nadesar Palace, and Radisson Hotel. We can help you find the perfect accommodation for your spiritual wedding celebration. We'll negotiate special wedding packages that include room blocks, traditional ceremonies, and boat rides on the Ganges. Our team will coordinate with multiple hotels to accommodate your guest list and ensure everyone experiences the spiritual essence of the city while maintaining the best possible rates."
              },
              {
                question: "How can I get the best rates for a destination wedding in Shimla?",
                answer: "For Shimla destination weddings, we can help you secure the best rates at luxury properties like The Oberoi Cecil, Wildflower Hall, or Radisson Hotel. We'll negotiate special wedding packages that include room blocks, mountain-view venues, and local experiences for your guests. Our team will coordinate with multiple hotels to accommodate your guest list and ensure everyone enjoys the scenic beauty of the Queen of Hills while maintaining competitive rates."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold text-indigo-900 group-hover:text-indigo-700 transition-colors">
                    {faq.question}
                  </h3>
                  <button 
                    className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
                    aria-label={expandedFaqs.includes(index) ? "Collapse answer" : "Expand answer"}
                  >
                    <motion.svg 
                      className="w-5 h-5 text-indigo-600"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ rotate: expandedFaqs.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                </div>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: expandedFaqs.includes(index) ? "auto" : 0,
                    opacity: expandedFaqs.includes(index) ? 1 : 0,
                    marginTop: expandedFaqs.includes(index) ? "1rem" : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button 
              onClick={() => onNavigate('contact-us')}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
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
                <button onClick={() => {
                  if (window.gtag) {
                    window.gtag('config', 'G-9N08T76Q5G');
                    window.gtag('event', 'social_media_button_clicked', {
                      'event_category': 'Home Page',
                      'event_label': 'Social Media Footer Section',
                      'value': 1
                    });
                  }
                  onNavigate('home');
                }} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
                <button onClick={() => {
                  if (window.gtag) {
                    window.gtag('config', 'G-9N08T76Q5G');
                    window.gtag('event', 'social_media_button_clicked', {
                      'event_category': 'Home Page',
                      'event_label': 'Social Media Footer Section',
                      'value': 1
                    });
                  }
                  onNavigate('home');
                }} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <a href="https://wa.me/917425875024?text=Hello%20BulkRooms%2C%20I%20would%20like%20to%20inquire%20about%20your%20services" onClick={() => {
                  if (window.gtag) {
                    window.gtag('config', 'G-9N08T76Q5G');
                    window.gtag('event', 'social_media_button_clicked', {
                      'event_category': 'Home Page',
                      'event_label': 'Social Media Footer Section',
                      'value': 1
                    });
                  }
                }} className="text-gray-400 hover:text-white transition-colors">
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
                  <button onClick={() => {
                    if (window.gtag) {
                      window.gtag('config', 'G-9N08T76Q5G');
                      window.gtag('event', 'features', {
                        'event_category': 'Home Page',
                        'event_label': 'Features Footer Section',
                        'value': 1
                      });
                    }
                    scrollToSection('why-book');
                  }} className="text-gray-400 hover:text-white transition-colors">Features</button>
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
                  <button onClick={() => {
                    if (window.gtag) {
                      window.gtag('config', 'G-9N08T76Q5G');
                      window.gtag('event', 'careers_opened', {
                        'event_category': 'Home Page',
                        'event_label': 'Careers Footer Section',
                        'value': 1
                      });
                    }
                    onNavigate('careers');
                  }} className="text-gray-400 hover:text-white transition-colors">Careers</button>
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
                  <p>Bangalore, India | New York, US</p>
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