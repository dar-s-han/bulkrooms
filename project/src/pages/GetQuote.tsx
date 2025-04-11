import React, { useState, useEffect } from 'react';
import { Building2, ArrowLeft, Plus, X, Calendar } from 'lucide-react';
import { DatePicker } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";

interface GetQuoteProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you', params?: any) => void;
  params?: {
    location?: string;
    eventType?: string;
  };
}

// Define the form data interface with proper typing
interface FormData {
  contactName: string;
  email: string;
  phone: string;
  eventType: string;
  otherEventType: string;
  adults: string;
  variation: string;
  dateType: 'specific' | 'flexible';
  startDate: string;
  endDate: string;
  flexibleMonth: string;
  locations: string[];
  roomsNeeded: string;
  roomsVariation: string;
  additionalRequirements: string;
}

interface LocationInfo {
  ip: string;
  country: string;
}

const GetQuote: React.FC<GetQuoteProps> = ({ onNavigate, params }) => {
  const [step, setStep] = useState(1);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    email: '',
    phone: '',
    eventType: '',
    otherEventType: '',
    adults: '25',
    variation: '2',
    dateType: 'specific',
    startDate: '',
    endDate: '',
    flexibleMonth: '',
    locations: [''],
    roomsNeeded: '13',
    roomsVariation: '2',
    additionalRequirements: ''
  });

  // Use params from navigation if available
  useEffect(() => {
    console.log("GetQuote: Received params:", params);
    console.log("GetQuote: Current formData:", formData);
    
    if (params) {
      // Set location if provided
      if (params.location && params.location.trim() !== '') {
        console.log("GetQuote: Setting location:", params.location);
        setFormData(prev => {
          const newData = {
            ...prev,
            locations: [params.location || '']
          };
          console.log("GetQuote: Updated formData with location:", newData);
          return newData;
        });
      }
      
      // Set event type if provided and valid
      if (params.eventType && params.eventType.trim() !== '') {
        const validEventTypes = ['wedding', 'corporate-stay', 'trip', 'conference', 'sports-event', 
                               'family-reunion', 'birthday', 'anniversary', 'other'];
        if (validEventTypes.includes(params.eventType)) {
          console.log("GetQuote: Setting event type:", params.eventType);
          setFormData(prev => {
            const newData = {
              ...prev,
              eventType: params.eventType || ''
            };
            console.log("GetQuote: Updated formData with event type:", newData);
            return newData;
          });
        }
      }
    }
  }, [params]);

  // Fetch IP and country information
  useEffect(() => {
    const fetchLocationInfo = () => {
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          setLocationInfo({
            ip: data.ip,
            country: data.country_name
          });
        })
        .catch(error => {
          console.error('Error fetching location info:', error);
        });
    };

    fetchLocationInfo();
  }, []);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dateError, setDateError] = useState<string>('');
  const [daysCount, setDaysCount] = useState<number>(0);

  // Generate next 12 months for flexible date selection
  const getNextTwelveMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push({
        value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
        label: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
      });
    }
    return months;
  };

  const calculateDays = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const diffTime = Math.abs(range.to.getTime() - range.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(diffDays);
    } else {
      setDaysCount(0);
    }
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    calculateDays(range);
    // Clear date error if a valid range is selected
    if (range?.from && range?.to) {
      setDateError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.dateType === 'specific') {
        if (!dateRange?.from || !dateRange?.to) {
          setDateError('Please select a date range');
          return;
        }
        if (dateRange.from.getTime() === dateRange.to.getTime()) {
          setDateError('Start and end dates cannot be the same');
          return;
        }
      }
      if (formData.dateType === 'flexible' && !formData.flexibleMonth) {
        setDateError('Please select a month');
        return;
      }
      // Clear any existing date error since validation passed
      setDateError('');
      if (formData.dateType === 'specific' && dateRange?.from && dateRange?.to) {
        setFormData({
          ...formData,
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString()
        });
      }
      setStep(2);
    } else {
      try {
        setIsSubmitting(true);
        setSubmitError('');
        
        // Prepare the data to send to Google Sheets
        const submissionData = {
          sheetName: 'GetQuoteSubmission',
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType === 'other' ? formData.otherEventType : formData.eventType,
          adults: `${formData.adults} ± ${formData.variation}`,
          dateType: formData.dateType,
          startDate: formData.dateType === 'specific' ? new Date(formData.startDate).toLocaleDateString() : '',
          endDate: formData.dateType === 'specific' ? new Date(formData.endDate).toLocaleDateString() : '',
          flexibleMonth: formData.dateType === 'flexible' ? formData.flexibleMonth : '',
          locations: formData.locations.join(', '),
          roomsNeeded: `${formData.roomsNeeded} ± ${formData.roomsVariation}`,
          additionalRequirements: formData.additionalRequirements,
          timestamp: new Date().toISOString()
        };

        console.log('Submitting data:', submissionData);

        // Send data to Google Sheets
        const scriptURL = 'https://script.google.com/macros/s/AKfycbx_nYCWFAHc5HlZTl5rNO9ISRqV7STIEbxF3yqAvK9nEgHOf2UhcrDbhSmD5AdMGVdI/exec';
        
        const response = await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
        
        // Since 'no-cors' mode doesn't give us access to response details,
        // we'll assume success if no error is thrown
        console.log('Form submitted successfully');
        onNavigate('thank-you');
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Failed to submit form. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (typeof name === 'string' && name.startsWith('location-')) {
      const index = parseInt(name.split('-')[1]);
      const newLocations = [...formData.locations];
      newLocations[index] = value;
      setFormData({
        ...formData,
        locations: newLocations
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addLocation = () => {
    setFormData({
      ...formData,
      locations: [...formData.locations, '']
    });
  };

  const removeLocation = (index: number) => {
    if (formData.locations.length > 1) {
      const newLocations = formData.locations.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        locations: newLocations
      });
    }
  };

  const getEventTypeStats = (eventType: string) => {
    const stats = {
      'wedding': 'Helped plan 1,000+ dream weddings',
      'corporate-stay': 'Organized 850+ successful corporate stays',
      'trip': 'Arranged 500+ memorable trips',
      'conference': 'Hosted 1,000+ professional conferences',
      'sports-event': 'Managed 1,00+ exciting sports events',
      'family-reunion': 'Coordinated 100+ family reunions',
      'birthday': 'Celebrated 800+ special birthdays',
      'anniversary': 'Commemorated 500+ anniversaries',
      'other': 'Created countless memorable events'
    };
    return stats[eventType as keyof typeof stats] || 'Helped plan countless successful events';
  };

  const renderStep1 = () => (
    <>
      <div className="form-group">
        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
          Email Address
          <span className="text-gray-500 text-sm block mt-1">If you're not booking for corporate, put your personal email</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
          required
          placeholder="Enter your email address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="form-group">
          <label htmlFor="eventType" className="block text-base font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
            required
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
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-700">
                When would you like to stay?
              </h3>
            </div>

            <div>
              <div className="w-full">
                <DatePicker
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  required
                  error={dateError}
                  dateType={formData.dateType}
                  onDateTypeChange={(type) => {
                    setFormData({ ...formData, dateType: type });
                    setShowMonthPicker(type === 'flexible');
                  }}
                  flexibleMonth={formData.flexibleMonth}
                  onFlexibleMonthChange={(month) => {
                    setFormData({ ...formData, flexibleMonth: month });
                    setDateError('');
                    setShowMonthPicker(false);
                  }}
                  showMonthPicker={showMonthPicker}
                  onShowMonthPickerChange={setShowMonthPicker}
                  nextTwelveMonths={getNextTwelveMonths()}
                />
              </div>
              {daysCount > 0 && formData.dateType === 'specific' && (
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mt-2">
                  {daysCount} {daysCount === 1 ? 'night' : 'nights'} selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {formData.eventType === 'other' && (
        <div className="form-group">
          <label htmlFor="otherEventType" className="block text-base font-medium text-gray-700 mb-2">
            Please help us understand your event
          </label>
          <input
            type="text"
            id="otherEventType"
            name="otherEventType"
            value={formData.otherEventType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
            required
            placeholder="Enter your event details"
          />
        </div>
      )}

      <div className="form-group">
        <label className="block text-base font-medium text-gray-700 mb-2">
          Location/s
          <span className="text-gray-500 text-sm block mt-1">Add one or more cities/regions</span>
        </label>
        <div className="space-y-3">
          {formData.locations.map((location, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name={`location-${index}`}
                value={location}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                required
                placeholder="City or region"
              />
              {formData.locations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove location"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addLocation}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add another location</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="form-group">
          <label htmlFor="attendees" className="block text-base font-medium text-gray-700 mb-2">
            Number of Attendees
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  required
                  min="1"
                />
                <span className="text-base text-gray-600 whitespace-nowrap">Fixed</span>
              </div>
            </div>
            <span className="text-gray-600 font-bold text-lg">±</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="variation"
                  name="variation"
                  value={formData.variation}
                  onChange={handleChange}
                  className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="roomsNeeded" className="block text-base font-medium text-gray-700 mb-2">
            Number of Rooms Needed
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="roomsNeeded"
                  name="roomsNeeded"
                  value={formData.roomsNeeded}
                  onChange={handleChange}
                  className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  required
                  min="1"
                />
                <span className="text-base text-gray-600 whitespace-nowrap">Fixed</span>
              </div>
            </div>
            <span className="text-gray-600 font-bold text-lg">±</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="roomsVariation"
                  name="roomsVariation"
                  value={formData.roomsVariation}
                  onChange={handleChange}
                  className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="additionalRequirements" className="block text-base font-medium text-gray-700 mb-2">
          Additional Requirements
        </label>
        <textarea
          id="additionalRequirements"
          name="additionalRequirements"
          value={formData.additionalRequirements}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
          placeholder="Please specify any additional requirements, such as room preferences, meal options, dietary restrictions, etc"
        ></textarea>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer w-fit group"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BulkRooms
              </span>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              {formData.eventType ? `Requesting a Quote for ${formData.eventType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}` : 'Request a Quote'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {step === 1 
                ? formData.eventType 
                  ? getEventTypeStats(formData.eventType)
                  : "Let's start with your basic information"
                : "Now, tell us more about your event requirements"}
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (step !== 1) {
                      setStep(1);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    step === 1 
                      ? 'bg-blue-600 cursor-default' 
                      : 'bg-gray-300 hover:bg-blue-400 cursor-pointer'
                  }`}
                  aria-label="Go to step 1"
                />
                <button
                  onClick={() => {
                    if (step !== 2 && formData.email && dateRange?.from && dateRange?.to) {
                      setDateError('');
                      setFormData({
                        ...formData,
                        startDate: dateRange.from.toISOString(),
                        endDate: dateRange.to.toISOString()
                      });
                      setStep(2);
                    } else if (step !== 2 && (!dateRange?.from || !dateRange?.to)) {
                      setDateError('Please select a date range');
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    step === 2 
                      ? 'bg-blue-600 cursor-default' 
                      : 'bg-gray-300 hover:bg-blue-400 cursor-pointer'
                  }`}
                  aria-label="Go to step 2"
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {step === 1 ? renderStep1() : renderStep2()}
            </div>

            {submitError && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
                {submitError}
              </div>
            )}

            {locationInfo && (
              <div className="text-sm text-gray-500 text-center mt-4">
                <p>Your IP: {locationInfo.ip} | Country: {locationInfo.country}</p>
              </div>
            )}

            <div className="flex justify-between">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 text-gray-600 hover:text-blue-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${step === 1 ? 'ml-auto' : ''} bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : (step === 1 ? 'Continue' : 'Request Quote')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuote; 