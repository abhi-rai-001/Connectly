import {
  MessageCircle, 
  Video,
  Mic,
  Headphones,
  Users,
  Wifi
} from "lucide-react";
import { useTheme } from "../store/useTheme"
import { useState, useEffect } from "react"

const PageLoader = () => {
  const { theme } = useTheme();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  
 const phases = [
  {
    icon: MessageCircle,
    color: "text-sky-600",
    bg: "from-sky-50 via-cyan-50 to-blue-50 dark:from-sky-950 dark:via-cyan-950 dark:to-blue-950",
    textColor: "text-sky-800 dark:text-sky-200"
  },
  {
    icon: Video,
    color: "text-rose-600",
    bg: "from-rose-50 via-pink-50 to-fuchsia-50 dark:from-rose-950 dark:via-pink-950 dark:to-fuchsia-950",
    textColor: "text-rose-800 dark:text-rose-200"
  },
  {
    icon: Mic,
    color: "text-emerald-600",
    bg: "from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950",
    textColor: "text-emerald-800 dark:text-emerald-200"
  },
  {
    icon: Headphones,
    color: "text-purple-600",
    bg: "from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950",
    textColor: "text-purple-800 dark:text-purple-200"
  },
  {
    icon: Users,
    color: "text-amber-600",
    bg: "from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950",
    textColor: "text-amber-800 dark:text-amber-200"
  },
  {
    icon: Wifi,
    color: "text-lime-600",
    bg: "from-lime-50 via-green-50 to-emerald-50 dark:from-lime-950 dark:via-green-950 dark:to-emerald-950",
    textColor: "text-lime-800 dark:text-lime-200"
  }
];

 const funnyQuotes = [
  {
    main: "Warming up the microphones…",
    sub: "Please stand by for spontaneous karaoke."
  },
  {
    main: "Polishing the camera lenses…",
    sub: "We promise the HD shows only your good side."
  },
  {
    main: "Untangling virtual headphone wires…",
    sub: "Left channel, meet right channel."
  },
  {
    main: "Convincing servers to use their inside voice…",
    sub: "Shh, packets are sleeping."
  },
  {
    main: "Brewing fresh chat bubbles…",
    sub: "Steam-powered emojis coming right up."
  },
  {
    main: "Adjusting the ring light…",
    sub: "Dramatic glow level set to influencer."
  }
];

 const wittyStatuses = [
  "Synchronizing wave-forms… testing, testing, 1-2-3.",
  "Deploying anti-awkward-silence algorithm…",
  "Buffering witty comeback generator…",
  "Upgrading dad-joke firmware… please hold.",
  "Locating that one coworker still on mute…",
  "Negotiating with bandwidth trolls…",
  "Aligning pixels for picture-perfect smiles…",
  "Inflating digital whoopee cushion… just in case."
];
  
  const [currentStatus, setCurrentStatus] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
      setCurrentQuote((prev) => (prev + 1) % funnyQuotes.length);
    }, 2000);
    
    const statusInterval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % wittyStatuses.length);
    }, 2000);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + Math.random() * 15));
    }, 300);
    
    return () => {
      clearInterval(phaseInterval);
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, []);
  
  const currentPhaseData = phases[currentPhase];
  const currentQuoteData = funnyQuotes[currentQuote];
  const CurrentIcon = currentPhaseData.icon;
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8" data-theme={theme}>
      {/* Dynamic animated background */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-2000`}></div>
      
      {/* Floating elements - responsive count */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(window.innerWidth > 768 ? 25 : 15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 sm:w-2 sm:h-2 ${currentPhaseData.color} opacity-30 rounded-full animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Pulsing rings - responsive sizing */}
      <div className="absolute">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border-2 border-current opacity-10 rounded-full animate-ping" style={{ color: currentPhaseData.color.replace('text-', '') }}></div>
        <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border border-current opacity-20 rounded-full animate-ping" style={{ animationDelay: '1s', color: currentPhaseData.color.replace('text-', '') }}></div>
      </div>
      
      {/* Main loader content - responsive layout */}
      <div className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-md sm:max-w-lg lg:max-w-xl mx-auto text-center">
        
        {/* Icon container with morphing animation - responsive sizing */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 shadow-2xl backdrop-blur-sm border-2 border-white/40 dark:border-gray-700/40 transition-all duration-500 ring-4 ring-white/20 dark:ring-gray-600/20">
            <CurrentIcon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${currentPhaseData.color} animate-spin transition-colors duration-500 drop-shadow-lg`} />
          </div>
          
          {/* Rotating orbit - responsive */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative">
              <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${currentPhaseData.color} rounded-full opacity-60`}></div>
              <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${currentPhaseData.color} rounded-full opacity-60`}></div>
              <div className={`absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 ${currentPhaseData.color} rounded-full opacity-60`}></div>
              <div className={`absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 ${currentPhaseData.color} rounded-full opacity-60`}></div>
            </div>
          </div>
        </div>
        
        {/* Main quote with emoji - responsive text */}
        <div className="space-y-2 sm:space-y-3 transition-all duration-500">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">

            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black animate-fade-in tracking-tight font-serif drop-shadow-lg`} style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
              {currentQuoteData.main}
            </h2>
          </div>
          <p className={`text-sm sm:text-base lg:text-lg  opacity-80 animate-fade-in font-bold font-sans tracking-wide drop-shadow-sm`} style={{ fontFamily: '"Inter", "Helvetica", sans-serif' }}>
            {currentQuoteData.sub}
          </p>
        </div>
        
        {/* Witty status - responsive text */}
        <div className="h-6 sm:h-8">
          <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 animate-pulse italic">
            {wittyStatuses[currentStatus]}
          </p>
        </div>
        
        {/* Progress bar - responsive width */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${currentPhaseData.color.replace('text-', 'bg-')} rounded-full transition-all duration-300 ease-out relative overflow-hidden`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Floating dots - responsive spacing */}
        <div className="flex space-x-1 sm:space-x-2 lg:space-x-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 sm:w-3 sm:h-3 ${currentPhaseData.color.replace('text-', 'bg-')} rounded-full animate-bounce transition-colors duration-500`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        
        {/* Fun footer message - responsive text */}
        <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg">
          <p className={`text-xs sm:text-sm font-semibold`} style={{ fontFamily: '"Inter", "Helvetica", sans-serif' }}>
            <span className="font-black">Pro tip:</span> This is the perfect time to grab a coffee ☕
          </p>
        </div>
      </div>
      
      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px) scale(0.95) }
          100% { opacity: 1; transform: translateY(0) scale(1) }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-spin,
          .animate-bounce,
          .animate-ping,
          .animate-pulse {
            animation: none;
          }
        }
        
        .transition-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  )
}

export default PageLoader