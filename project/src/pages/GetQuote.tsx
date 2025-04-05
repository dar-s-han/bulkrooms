import React, { useState } from 'react';
import { Building2, ArrowLeft } from 'lucide-react';

interface GetQuoteProps {
  onNavigate: (page: 'home' | 'contact-us' | 'get-quote' | 'thank-you') => void;
}

const GetQuote: React.FC<GetQuoteProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    eventType: '',
    attendees: '',
    startDate: '',
    endDate: '',
    location: '',
    roomsNeeded: '',
    budget: '',
    additionalRequirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Quote requested:', formData);
      onNavigate('thank-you');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStep1 = () => (
    <>
      <div className="form-group">
        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-6">
          Event Type
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
          placeholder="City or region"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="form-group">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Check in
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            Check out
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="form-group">
          <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Attendees
          </label>
          <input
            type="number"
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomsNeeded" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rooms Needed
          </label>
          <input
            type="number"
            id="roomsNeeded"
            name="roomsNeeded"
            value={formData.roomsNeeded}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
          Budget (USD)
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="$1000 - $50000"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
          <span className="text-gray-500 text-xs block mt-1">If you're not booking for corporate, put your personal email</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Requirements
        </label>
        <textarea
          id="additionalRequirements"
          name="additionalRequirements"
          value={formData.additionalRequirements}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Please specify any additional requirements, such as catering, AV equipment, meeting room layouts, etc."
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
              <Building2 className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Request a Quote
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {step === 1 
                ? "Let's start with your basic information"
                : "Now, tell us more about your event requirements"}
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {step === 1 ? renderStep1() : renderStep2()}
            </div>

            <div className="flex justify-between">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`${step === 1 ? 'ml-auto' : ''} bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl`}
              >
                {step === 1 ? 'Continue' : 'Request Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuote; 