import React, { useState, useEffect } from 'react';
import { Building2, ArrowLeft, Plus, X, Calendar } from 'lucide-react';
import { DatePicker } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";

interface GetQuoteProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you', params?: any) => void;
  params?: {
    location?: string;
    phone?: string;
    countryCode?: string;
  };
}

// Define the form data interface with proper typing
interface FormData {
  contactName: string;
  email: string;
  phone: string;
  countryCode: string;
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

const GetQuote: React.FC<GetQuoteProps> = ({ onNavigate, params }) => {
  const [step, setStep] = useState(1);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(-1);
  const [activeInputIndex, setActiveInputIndex] = useState<number>(-1);
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    eventType: 'wedding',
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
        setFormData(prev => ({
          ...prev,
          locations: [params.location || '']
        }));
      }
      
      // Set phone if provided
      if (params.phone && params.phone.trim() !== '') {
        setFormData(prev => ({
          ...prev,
          phone: params.phone || ''
        }));
      }
      
      // Set countryCode if provided
      if (params.countryCode && params.countryCode.trim() !== '') {
        setFormData(prev => ({
          ...prev,
          countryCode: params.countryCode || '+91'
        }));
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
          phone: `${formData.countryCode} ${formData.phone}`,
          eventType: formData.eventType === 'other' ? formData.otherEventType : formData.eventType,
          adults: `${formData.adults} ± ${formData.variation}`,
          dateType: formData.dateType,
          startDate: formData.dateType === 'specific' ? new Date(formData.startDate).toLocaleDateString() : '',
          endDate: formData.dateType === 'specific' ? new Date(formData.endDate).toLocaleDateString() : '',
          flexibleMonth: formData.dateType === 'flexible' ? formData.flexibleMonth : '',
          locations: formData.locations.join(', '),
          roomsNeeded: `${formData.roomsNeeded} ± ${formData.roomsVariation}`,
          additionalRequirements: formData.additionalRequirements,
          timestamp: new Date().toISOString(),
          ipAddress: locationInfo?.ip || 'Unknown'
        };

        console.log('Submitting data:', submissionData);

        // Send data to Google Sheets
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxS6tna_aXRBRHEcGszzKbknkEpaL9MG9nW2GRhW_AgsVf8a0QzgXAALRY5bvUf1cTW/exec';
        
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

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newLocations = [...formData.locations];
    newLocations[index] = value;
    setFormData({
      ...formData,
      locations: newLocations
    });

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

  const handleSuggestionClick = (suggestion: LocationSuggestion, index: number) => {
    const newLocations = [...formData.locations];
    newLocations[index] = suggestion.entity_name;
    setFormData({
      ...formData,
      locations: newLocations
    });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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
      handleSuggestionClick(suggestions[activeLocationIndex], index);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
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

  const countryCodes = [
    { code: '+1', label: 'US/Canada (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+91', label: 'India (+91)' },
    { code: '+61', label: 'Australia (+61)' },
    { code: '+81', label: 'Japan (+81)' },
    { code: '+49', label: 'Germany (+49)' },
    { code: '+33', label: 'France (+33)' },
    { code: '+971', label: 'UAE (+971)' },
    { code: '+65', label: 'Singapore (+65)' },
    { code: '+86', label: 'China (+86)' },
    // Add more as needed
  ];

  const renderStep1 = () => (
    <>
      <div className="form-group">
        <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
          Phone Number
          <span className="text-gray-500 text-sm block mt-1">Please enter your phone number (with country code if outside India)</span>
        </label>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <select
            name="countryCode"
            id="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="px-3 py-3 bg-white border-0 focus:ring-0 text-sm w-28"
            required
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 px-3 py-3 border-0 focus:ring-0 text-sm sm:text-base bg-white"
            required
            placeholder="Enter your phone number"
            style={{ minWidth: 0 }}
          />
        </div>
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
            <div key={index} className="flex items-center gap-2 relative">
              <input
                type="text"
                name={`location-${index}`}
                value={location}
                onChange={(e) => handleLocationChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => {
                  setShowSuggestions(true);
                  setActiveInputIndex(index);
                  handleLocationFocus();
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSuggestions(false);
                    setActiveInputIndex(-1);
                  }, 200);
                }}
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
              {showSuggestions && suggestions.length > 0 && activeInputIndex === index && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden" style={{ top: 'calc(100% + 4px)' }}>
                  {suggestions.map((suggestion, idx) => {
                    const hierarchyParts = suggestion.hierarchy.split('|');
                    const subtitle = hierarchyParts.filter(part => part !== suggestion.entity_name).join(', ');
                    
                    return (
                      <div
                        key={suggestion.entity_id}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-start gap-3 ${
                          idx === activeLocationIndex ? 'bg-gray-50' : ''
                        } ${idx !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
                        onClick={() => handleSuggestionClick(suggestion, index)}
                      >
                        <div className="text-gray-400 mt-1">
                          {suggestion.type === 'city' && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 20V4C4 3.45 4.196 2.979 4.588 2.587C4.98 2.195 5.45067 1.99934 6 2H18C18.55 2 19.021 2.196 19.413 2.588C19.805 2.98 20.0007 3.45067 20 4V20H4ZM6 18H18V4H6V18ZM8 17H10V15H8V17ZM8 13H10V11H8V13ZM8 9H10V7H8V9ZM12 17H14V15H12V17ZM12 13H14V11H12V13ZM12 9H14V7H12V9ZM16 17H18V15H16V17ZM16 13H18V11H16V13ZM16 9H18V7H16V9Z" fill="currentColor"/>
                            </svg>
                          )}
                          {suggestion.type === 'airport' && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L4 12H7L9 22H11L13 12L15 22H17L19 12H22L14 2H12Z" fill="currentColor"/>
                            </svg>
                          )}
                          {suggestion.type === 'hotel' && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 14C8.1 14 9 13.1 9 12C9 10.9 8.1 10 7 10C5.9 10 5 10.9 5 12C5 13.1 5.9 14 7 14ZM12.5 3H2V21H4V19H20V21H22V8C22 5.24 19.76 3 17 3H12.5ZM4 17V5H12.5V17H4ZM20 17H14.5V5H17C18.66 5 20 6.34 20 8V17Z" fill="currentColor"/>
                            </svg>
                          )}
                          {!['city', 'airport', 'hotel'].includes(suggestion.type) && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12ZM12 4C16.2 4 20 7.22 20 11.2C20 16.19 12 24 12 24C12 24 4 16.19 4 11.2C4 7.22 7.8 4 12 4Z" fill="currentColor"/>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{suggestion.entity_name}</div>
                          {subtitle && (
                            <div className="text-sm text-gray-500">{subtitle}</div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 self-center uppercase whitespace-nowrap">
                          {suggestion.type.replace('-', ' ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                    if (step !== 2 && formData.phone && dateRange?.from && dateRange?.to) {
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