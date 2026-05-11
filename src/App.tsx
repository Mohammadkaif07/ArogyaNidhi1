/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Home,
  ShieldCheck,
  Phone,
  FileText
} from 'lucide-react';
import { SCHEMES, HOSPITALS, Scheme } from './data';

type View = 'welcome' | 'quiz' | 'results' | 'hospitals' | 'scheme-detail';

interface QuizState {
  income: number;
  isBPL: boolean;
  occupation: string;
  isRural: boolean;
  familySize: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizState>({
    income: 0,
    isBPL: false,
    occupation: 'Other',
    isRural: false,
    familySize: 1
  });
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [searchDistrict, setSearchDistrict] = useState('');

  const eligibleSchemes = useMemo(() => {
    return SCHEMES.filter(scheme => {
      const { eligibility } = scheme;
      
      // BPL Check
      if (eligibility.requiresBPL && !quizData.isBPL) return false;
      
      // Income Check
      if (eligibility.maxIncome && quizData.income > eligibility.maxIncome) return false;
      
      // Occupation Check
      if (eligibility.occupations && !eligibility.occupations.includes(quizData.occupation)) return false;
      
      // Rural Check
      if (eligibility.isRuralOnly && !quizData.isRural) return false;

      return true;
    });
  }, [quizData]);

  const quizQuestions = [
    {
      id: 'income',
      question: "What is your annual family income?",
      type: 'range',
      min: 0,
      max: 1000000,
      step: 10000,
      format: (val: number) => `₹${val.toLocaleString()}`
    },
    {
      id: 'isBPL',
      question: "Do you have a BPL (Below Poverty Line) card?",
      type: 'boolean'
    },
    {
      id: 'occupation',
      question: "What is the primary occupation of the head of family?",
      type: 'choice',
      options: ['Farmer', 'Agricultural Worker', 'Construction Worker', 'Small Business', 'Other']
    },
    {
      id: 'isRural',
      question: "Do you live in a rural area (Village)?",
      type: 'boolean'
    },
    {
      id: 'familySize',
      question: "How many members are in your family?",
      type: 'number',
      min: 1,
      max: 15
    }
  ];

  const handleNext = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setCurrentView('results');
    }
  };

  const handleBack = () => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    } else {
      setCurrentView('welcome');
    }
  };

  const [selectedHospitalForMap, setSelectedHospitalForMap] = useState<string | null>(null);

  const filteredHospitals = HOSPITALS.filter(h => 
    h.district.toLowerCase().includes(searchDistrict.toLowerCase()) ||
    h.name.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-stone-900 selection:bg-teal-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-stone-200 z-50 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('welcome')}>
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
            <Heart size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">Arogya-Nidhi</span>
        </div>
        <div className="flex items-center gap-4 text-stone-500">
          <button onClick={() => setCurrentView('hospitals')} className={`p-2 rounded-lg transition-colors ${currentView === 'hospitals' ? 'bg-teal-50 text-teal-600' : 'hover:bg-stone-50'}`}>
            <MapPin size={22} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-24">
        <AnimatePresence mode="wait">
          {currentView === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6 py-10 max-w-2xl mx-auto"
            >
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2070&auto=format&fit=crop" 
                  alt="Helping hand" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h1 className="text-3xl font-bold mb-4 tracking-tight text-stone-900 leading-tight">
                Your Health, Our Responsibility.
              </h1>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                Many government health schemes can cover your medical costs for free. We help you find the right ones for your family.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setCurrentView('quiz');
                    setQuizStep(0);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
                >
                  Check Eligibility Quiz
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentView('hospitals')}
                  className="w-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MapPin size={20} className="text-teal-600" />
                  Find Nearest Hospital
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-teal-50 rounded-xl">
                  <ShieldCheck size={24} className="text-teal-600 mx-auto mb-2" />
                  <span className="text-xs font-medium text-stone-600 uppercase tracking-wider block">Trustworthy</span>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-xl">
                  <Heart size={24} className="text-teal-600 mx-auto mb-2" />
                  <span className="text-xs font-medium text-stone-600 uppercase tracking-wider block">Empathetic</span>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-xl">
                  <ClipboardCheck size={24} className="text-teal-600 mx-auto mb-2" />
                  <span className="text-xs font-medium text-stone-600 uppercase tracking-wider block">Verified</span>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 py-6 max-w-xl mx-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="p-2 -ml-2 text-stone-500 hover:text-stone-900 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2">
                  {quizQuestions.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= quizStep ? 'bg-teal-600' : 'bg-stone-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-400">Step {quizStep + 1}/5</span>
              </div>

              <div className="min-h-[300px]">
                <h2 className="text-2xl font-bold mb-8 text-stone-800 leading-snug">
                  {quizQuestions[quizStep].question}
                </h2>

                {quizQuestions[quizStep].type === 'range' && (
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min={quizQuestions[quizStep].min} 
                      max={quizQuestions[quizStep].max} 
                      step={quizQuestions[quizStep].step}
                      value={quizData.income}
                      onChange={(e) => setQuizData({ ...quizData, income: Number(e.target.value) })}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="text-4xl font-bold text-teal-600 text-center">
                      ₹{quizData.income.toLocaleString()}
                    </div>
                  </div>
                )}

                {quizQuestions[quizStep].type === 'boolean' && (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        const key = quizQuestions[quizStep].id as keyof QuizState;
                        setQuizData({ ...quizData, [key]: true });
                        handleNext();
                      }}
                      className="py-6 rounded-2xl border-2 border-stone-200 hover:border-teal-600 hover:bg-teal-50 transition-all flex flex-col items-center gap-2 group"
                    >
                      <CheckCircle2 size={32} className="text-stone-300 group-hover:text-teal-600" />
                      <span className="font-bold">Yes</span>
                    </button>
                    <button 
                      onClick={() => {
                        const key = quizQuestions[quizStep].id as keyof QuizState;
                        setQuizData({ ...quizData, [key]: false });
                        handleNext();
                      }}
                      className="py-6 rounded-2xl border-2 border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all flex flex-col items-center gap-2 group"
                    >
                      <AlertCircle size={32} className="text-stone-300 group-hover:text-stone-600" />
                      <span className="font-bold">No</span>
                    </button>
                  </div>
                )}

                {quizQuestions[quizStep].type === 'choice' && (
                  <div className="space-y-3">
                    {quizQuestions[quizStep].options?.map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => {
                          setQuizData({ ...quizData, occupation: opt });
                          handleNext();
                        }}
                        className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-teal-600 hover:bg-teal-50 font-medium transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {quizQuestions[quizStep].type === 'number' && (
                  <div className="flex items-center justify-center gap-8 py-10">
                    <button 
                      onClick={() => setQuizData({ ...quizData, familySize: Math.max(1, quizData.familySize - 1) })}
                      className="w-16 h-16 rounded-full border-2 border-stone-200 flex items-center justify-center text-3xl font-bold"
                    >-</button>
                    <span className="text-6xl font-bold text-teal-600">{quizData.familySize}</span>
                    <button 
                      onClick={() => setQuizData({ ...quizData, familySize: Math.min(15, quizData.familySize + 1) })}
                      className="w-16 h-16 rounded-full border-2 border-stone-200 flex items-center justify-center text-3xl font-bold"
                    >+</button>
                  </div>
                )}
              </div>

              {quizQuestions[quizStep].type !== 'boolean' && quizQuestions[quizStep].type !== 'choice' && (
                <button 
                  onClick={handleNext}
                  className="w-full mt-12 bg-stone-900 text-white font-bold py-5 rounded-2xl transition-transform active:scale-95"
                >
                  Continue
                </button>
              )}
            </motion.div>
          )}

          {currentView === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-6 max-w-xl mx-auto"
            >
              <div className="mb-8 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-inner">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-stone-500">Based on your details, here are your matched health schemes.</p>
              </div>

              {eligibleSchemes.length > 0 ? (
                <div className="space-y-4">
                  {eligibleSchemes.map(scheme => (
                    <motion.div 
                      key={scheme.id}
                      whileHover={{ y: -2 }}
                      className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm overflow-hidden relative cursor-pointer"
                      onClick={() => {
                        setSelectedScheme(scheme);
                        setCurrentView('scheme-detail');
                      }}
                    >
                      <div className="absolute top-0 right-0 p-3">
                        <ChevronRight size={20} className="text-stone-300" />
                      </div>
                      <h3 className="font-bold text-lg mb-1 pr-8 text-teal-800">{scheme.name}</h3>
                      <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                        {scheme.description}
                      </p>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                          <ClipboardCheck size={14} />
                          Checklist Ready
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 bg-stone-50 px-3 py-1 rounded-full">
                          <ShieldCheck size={14} />
                          Govt Verified
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <AlertCircle size={48} className="text-stone-300 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-1">No Matches Found</h3>
                  <p className="text-stone-500 px-8">We couldn't find a specific scheme for these details. Visit the nearest government hospital for guidance.</p>
                </div>
              )}

              <button 
                onClick={() => setCurrentView('welcome')}
                className="w-full mt-8 text-stone-500 font-bold py-4 hover:text-stone-800 transition-colors"
              >
                Go Back to Home
              </button>
            </motion.div>
          )}

          {currentView === 'scheme-detail' && selectedScheme && (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-6 max-w-xl mx-auto"
            >
              <button 
                onClick={() => setCurrentView('results')}
                className="flex items-center gap-2 text-stone-500 mb-6 hover:text-stone-900 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to Results
              </button>

              <h2 className="text-3xl font-bold mb-4 text-teal-800 leading-tight">{selectedScheme.name}</h2>
              <p className="text-stone-600 mb-8 leading-relaxed text-lg">{selectedScheme.description}</p>

              <div className="space-y-8">
                <section>
                  <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-stone-800">
                    <Info size={20} className="text-teal-600" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {selectedScheme.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-3 text-stone-600 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                        <CheckCircle2 size={20} className="text-teal-500 shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-stone-800">
                    <FileText size={20} className="text-amber-500" />
                    Required Documents Checklist
                  </h3>
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                    <p className="text-sm text-amber-800 mb-4 font-medium opacity-80 uppercase tracking-widest">Keep these ready before applying</p>
                    <ul className="space-y-4">
                      {selectedScheme.documents.map((doc, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded border-2 border-amber-300 bg-white flex items-center justify-center">
                            <div className="w-3 h-3 bg-amber-500 rounded-sm opacity-0" />
                          </div>
                          <span className="text-stone-800 font-semibold">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                
                <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-xl shadow-teal-900/20">
                  <h4 className="font-bold text-lg mb-2">Ready to apply?</h4>
                  <p className="text-teal-100/80 mb-6 font-medium">Head to the nearest empaneled hospital with these documents.</p>
                  <button 
                    onClick={() => setCurrentView('hospitals')}
                    className="w-full bg-teal-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <MapPin size={20} />
                    See Map & Hospitals
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'hospitals' && (
            <motion.div 
              key="hospitals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 py-6 max-w-xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-6">Empaneled Hospitals</h2>
              
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search by District (e.g. Pune, Mumbai)"
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-stone-100 border-none rounded-2xl focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-4">
                {filteredHospitals.map(hospital => (
                  <div key={hospital.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-stone-900">{hospital.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-stone-500">
                          <MapPin size={14} className="text-teal-600" />
                          {hospital.district}, Karnataka
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {hospital.phone && (
                          <a href={`tel:${hospital.phone}`} className="bg-teal-50 text-teal-600 p-2 rounded-lg hover:bg-teal-100 transition-colors">
                            <Phone size={18} />
                          </a>
                        )}
                        <button 
                          onClick={() => setSelectedHospitalForMap(selectedHospitalForMap === hospital.id ? null : hospital.id)}
                          className={`p-2 rounded-lg transition-colors ${selectedHospitalForMap === hospital.id ? 'bg-teal-600 text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
                        >
                          <MapPin size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {selectedHospitalForMap === hospital.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mb-4 overflow-hidden rounded-xl border border-stone-200"
                      >
                        <iframe
                          width="100%"
                          height="200"
                          title="map"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer"
                          src={`https://maps.google.com/maps?q=${hospital.lat},${hospital.lng}&z=15&output=embed`}
                        ></iframe>
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-teal-600 text-white py-3 font-bold text-sm"
                        >
                          <MapPin size={16} />
                          Get Directions in Google Maps
                        </a>
                      </motion.div>
                    )}

                    <p className="text-sm text-stone-600 mb-4">{hospital.address}</p>
                    
                    <div className="space-y-3">
                      {hospital.phone && (
                        <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                          <Phone size={14} className="text-stone-400" />
                          <span>{hospital.phone}</span>
                        </div>
                      )}
                      
                      {hospital.website && (
                        <div className="flex items-center gap-2 text-sm font-medium text-teal-600">
                          <Info size={14} className="text-teal-400" />
                          <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="hover:underline">Visit Website</a>
                        </div>
                      )}

                      {hospital.email && (
                        <div className="flex items-center gap-2 text-sm font-medium text-stone-600">
                          <FileText size={14} className="text-stone-400" />
                          <span>{hospital.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-50">
                      {hospital.specialties.map(spec => (
                        <span key={spec} className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-500 px-2.5 py-1 rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredHospitals.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-stone-400 italic">No hospitals found in this district.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Nav (Mobile Feel) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => setCurrentView('welcome')}
          className={`flex flex-col items-center gap-1 ${currentView === 'welcome' ? 'text-teal-600' : 'text-stone-400'}`}
        >
          <Home size={22} className={currentView === 'welcome' ? 'fill-teal-600/10' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => {
            setCurrentView('quiz');
            setQuizStep(0);
          }}
          className={`flex flex-col items-center gap-1 ${currentView === 'quiz' || currentView === 'results' || currentView === 'scheme-detail' ? 'text-teal-600' : 'text-stone-400'}`}
        >
          <ClipboardCheck size={22} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Checker</span>
        </button>
        <button 
          onClick={() => setCurrentView('hospitals')}
          className={`flex flex-col items-center gap-1 ${currentView === 'hospitals' ? 'text-teal-600' : 'text-stone-400'}`}
        >
          <MapPin size={22} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Hospitals</span>
        </button>
      </div>
    </div>
  );
}
