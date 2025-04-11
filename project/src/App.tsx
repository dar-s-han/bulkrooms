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
  const [navigationHistory, setNavigationHistory] = useState<Array<{page: string, params: any}>>([]);

  const navigateTo = (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you' | 'contact-us-thank-you' | 'privacy-policy' | 'cookie-policy' | 'careers', params?: any) => {
    console.log("App: Navigating to", page, "with params:", params);
    
    // Add current page to history before navigating
    setNavigationHistory(prev => [...prev, { page: currentPage, params: pageParams }]);
    
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

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (navigationHistory.length > 0) {
        const previousPage = navigationHistory[navigationHistory.length - 1];
        setNavigationHistory(prev => prev.slice(0, -1));
        setCurrentPage(previousPage.page as any);
        setPageParams(previousPage.params);
      } else {
        // If no history, go to home
        setCurrentPage('home');
        setPageParams(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationHistory]);

  // Update browser history when page changes
  useEffect(() => {
    window.history.pushState({ page: currentPage, params: pageParams }, '', `/${currentPage}`);
  }, [currentPage, pageParams]);

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

    console.log("App: Current page is", currentPage);

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