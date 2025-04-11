import React, { useState, useEffect } from 'react';
import { Building2, Clock, Hotel, MessageSquareQuote, PhoneCall, Users, Mail, MapPin } from 'lucide-react';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import GetQuote from './pages/GetQuote';
import QuoteThankYou from './pages/QuoteThankYou';
import ContactUsThankYou from './pages/ContactUsThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Careers from './pages/Careers';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact-us' | 'get-quote' | 'thank-you' | 'contact-us-thank-you' | 'privacy-policy' | 'cookie-policy' | 'careers'>('home');
  const [pageParams, setPageParams] = useState<any>(null);

  const navigateTo = (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you' | 'contact-us-thank-you' | 'privacy-policy' | 'cookie-policy' | 'careers', params?: any) => {
    console.log("App: Navigating to", page, "with params:", params);
    setCurrentPage(page);
    if (params) {
      setPageParams(params);
    } else {
      setPageParams(null);
    }
    
    if (page === 'home' || page === 'contact-us') {
      // Reset scroll position when returning to home or navigating to contact us
      window.scrollTo(0, 0);
      // Add a small delay to ensure elements are in the viewport before triggering animations
      setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
          el.classList.remove('visible');
          void (el as HTMLElement).offsetHeight; // Force reflow
          el.classList.add('visible');
        });
      }, 100);
    }
  };

  useEffect(() => {
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
  }, [currentPage]); // Re-run when page changes

  switch (currentPage) {
    case 'home':
      return <Home onNavigate={navigateTo} />;
    case 'contact-us':
      return <ContactUs onNavigate={navigateTo} />;
    case 'get-quote':
      return <GetQuote onNavigate={navigateTo} params={pageParams} />;
    case 'thank-you':
      return <QuoteThankYou onNavigate={navigateTo} />;
    case 'contact-us-thank-you':
      return <ContactUsThankYou onNavigate={navigateTo} />;
    case 'privacy-policy':
      return <PrivacyPolicy onNavigate={navigateTo} />;
    case 'cookie-policy':
      return <CookiePolicy onNavigate={navigateTo} />;
    case 'careers':
      return <Careers onNavigate={navigateTo} />;
    default:
      return <Home onNavigate={navigateTo} />;
  }
}

export default App;