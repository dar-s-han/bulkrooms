import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { 
  Heart, 
  Plane, 
  Briefcase, 
  Trophy, 
  Building2,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const BookingTypesSection: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bookingTypes = [
    {
      title: "Wedding Venues",
      description: "Fast stay options for wedding planners managing large guest lists",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      features: [
        "Quickly sourced hotels near wedding venues",
        "Curated stays for different guest budgets",
        "Faster than venue sales teams",
        "Multiple options shared within hours"
      ],
      color: "from-red-50 to-red-100"
    },
    {
      title: "Group Trip Stays",
      description: "Effortless stay discovery for travel agents booking for tour groups or vacations",
      icon: <Plane className="h-8 w-8 text-blue-500" />,
      features: [
        "Stay options across cities shared quickly",
        "Great deals for bulk bookings",
        "Filtered options based on group needs",
        "One-stop sourcing instead of multiple follow-ups"
      ],
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "Corporate Travel Stays",
      description: "Stay sourcing made easy for corporate admins and travel desks",
      icon: <Briefcase className="h-8 w-8 text-purple-500" />,
      features: [
        "Hotels near offices or event venues sourced fast",
        "Multiple stay options shared in hours",
        "No back-and-forth with hotel sales teams",
        "Helps admins save hours of coordination"
      ],
      color: "from-purple-50 to-purple-100"
    },
    {
      title: "Sports Team Stays",
      description: "Quickly sourced accommodations for teams and support staff",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      features: [
        "Nearby hotel options shared rapidly",
        "Stay suggestions tailored to team size",
        "Filtered by meal/facility preferences",
        "Fast booking for tight schedules"
      ],
      color: "from-yellow-50 to-yellow-100"
    },
    {
      title: "Conference Venues",
      description: "Speedy stay sourcing for conference planners and delegate groups",
      icon: <Building2 className="h-8 w-8 text-indigo-500" />,
      features: [
        "Hotel options near venue sent within hours",
        "Filtered by budget and room count",
        "Save time chasing hotel sales teams",
        "Ideal for last-minute requirements"
      ],
      color: "from-indigo-50 to-indigo-100"
    },
    {
      title: "Celebration Venues",
      description: "Quick venue and stay sourcing for birthdays, anniversaries, and gatherings",
      icon: <Calendar className="h-8 w-8 text-pink-500" />,
      features: [
        "Options shared within hours based on guest size",
        "Helps planners avoid delays with direct venues",
        "Only celebration-friendly stays included",
        "Faster than calling hotels one by one"
      ],
      color: "from-pink-50 to-pink-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -15,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5
      }
    },
    hover: {
      y: -10,
      rotateX: 5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.5
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.3,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        mass: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0,
      x: -30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.5
          }}
          className="text-3xl font-bold text-center mb-12 text-gray-900"
        >
          Types of Bookings We Handle
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bookingTypes.map((type, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 overflow-hidden perspective-1000"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: hoveredIndex === index 
                  ? '0 25px 30px -10px rgba(0, 0, 0, 0.15)' 
                  : '0 10px 15px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 transition-opacity duration-300`}
                animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
              />
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  className={`mb-4 p-3 rounded-full transition-colors duration-300 ${
                    hoveredIndex === index ? 'bg-opacity-20' : 'bg-opacity-10'
                  } ${type.color.split(' ')[1].replace('from-', 'bg-')}`}
                  variants={iconVariants}
                  animate={hoveredIndex === index ? "hover" : "initial"}
                >
                  {type.icon}
                </motion.div>
                <motion.h3 
                  className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-blue-600' : 'text-gray-900'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5
                  }}
                >
                  {type.title}
                </motion.h3>
                <motion.p 
                  className={`transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-gray-800' : 'text-gray-600'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5,
                    delay: 0.1
                  }}
                >
                  {type.description}
                </motion.p>
                
                <motion.div
                  className="mt-4 w-full"
                  initial="hidden"
                  animate={hoveredIndex === index ? "visible" : "hidden"}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      height: 0,
                      transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    },
                    visible: { 
                      opacity: 1, 
                      height: "auto",
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        mass: 0.5
                      }
                    }
                  }}
                >
                  <div className="space-y-2 text-left">
                    {type.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-gray-600"
                        variants={featureVariants}
                        initial="hidden"
                        animate={hoveredIndex === index ? "visible" : "hidden"}
                        transition={{ 
                          delay: featureIndex * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          mass: 0.5
                        }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 0.5
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingTypesSection; 