import React, { useState, useEffect } from 'react';

const BookingTypesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1708748144709-651ebdab3f96?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Wedding",
      description: "Find the perfect venue for your special day"
    },
    {
      image: "https://images.unsplash.com/photo-1645619200527-c6786729c2da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Corporate Stay",
      description: "Professional accommodations for business travelers"
    },
    {
      image: "https://images.unsplash.com/photo-1679310289994-9033a196b136?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Trip",
      description: "Perfect stays for your group trips and vacations"
    },
    {
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Conference",
      description: "Professional accommodations for business travelers"
    },
    {
      image: "https://images.unsplash.com/photo-1702303208608-fc27f8826b9a?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sports Event",
      description: "Convenient stays for teams, fans, and event attendees"
    },
    {
      image: "https://images.unsplash.com/photo-1611516818236-8faa056fb659?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Family Reunion",
      description: "Versatile venues for all types of events"
    },
    {
      image: "https://images.unsplash.com/photo-1672632381551-3e0f1252c61f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Birthday",
      description: "Fun spaces to make your birthday special"
    },
    {
      image: "https://images.unsplash.com/photo-1640162558363-88cb21a08021?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Anniversary",
      description: "Cozy spots to celebrate your love"
    },
    
  ];

  const extendedSlides = [...slides, slides[0], slides[1], slides[2], slides[3]];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentSlide === slides.length) {
      // After transition to fake slide, jump to real first slide with no animation
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 0); // match duration-700
    } else {
      // Always ensure transition is on for regular slides
      setIsTransitioning(true);
    }
  }, [currentSlide, slides.length]);

  return (
    <section className="relative h-[300px] overflow-hidden rounded-2xl mx-8">
      <div className="flex h-full transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}>
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="w-1/3 flex-shrink-0 relative px-3"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden backdrop-blur-sm bg-white/30 shadow-lg transition-all duration-300 ${
              index === currentSlide + 1 ? 'scale-110 z-10' : 'scale-90'
            }`}>
              <div className="relative h-full p-1 bg-white">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h2 className={`text-xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                    index === currentSlide + 1 ? 'text-2xl' : 'text-lg'
                  }`}>
                    {slide.title}
                  </h2>
                  <p className={`text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                    index === currentSlide + 1 ? 'text-base' : 'text-xs'
                  }`}>
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.slice(0, slides.length - 2).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BookingTypesSection; 