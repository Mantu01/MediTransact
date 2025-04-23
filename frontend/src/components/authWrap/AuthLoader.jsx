import React, { useEffect, useState } from 'react';
import Logo from '../logo/Logo';

export default function AuthLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 99) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-md px-8 py-12 flex flex-col items-center">
        {/* Logo with pulsing effect */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
            <div className="relative w-24 h-24 flex items-center justify-center">
              <Logo className="w-full h-full text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* App Title with improved typography */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">Medical Portal</h1>
        <p className="text-gray-500 text-sm mb-10">Secure patient transactions management system</p>
        
        {/* Enhanced Progress Container */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-600">Loading your secure environment</span>
            <span className="text-blue-600 font-semibold">{progress}%</span>
          </div>
          
          {/* Improved Progress Bar */}
          <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          
          {/* Status Message */}
          <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2 text-blue-500 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            {progress < 30 && "Initializing secure connection..."}
            {progress >= 30 && progress < 60 && "Verifying credentials..."}
            {progress >= 60 && progress < 90 && "Loading patient data..."}
            {progress >= 90 && "Finalizing setup..."}
          </div>
        </div>
        
        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 mt-2">
          <div className="flex items-center text-xs text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-1"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            HIPAA Compliant
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-1"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            End-to-End Encrypted
          </div>
        </div>
      </div>
      
      {/* Footer Note */}
      <div className="absolute bottom-6 text-xs text-gray-400 text-center">
        <p>&copy; 2025 Medical Portal | Securely connecting healthcare professionals</p>
      </div>
    </div>
  );
}