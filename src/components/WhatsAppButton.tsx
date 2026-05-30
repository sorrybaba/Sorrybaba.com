/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { trackFloatingWhatsAppClick } from '../lib/analytics';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    trackFloatingWhatsAppClick();
    window.open('https://wa.me/94776826937?text=Hi%20SorryBaba,%20I%20would%20like%20to%20get%20assistance%20with%20choosing%20an%20apology%20gift.', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group pointer-events-none">
      
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="pointer-events-auto bg-white border border-brand-pink-soft text-brand-pink shadow-cute-hover rounded-2xl px-4 py-2.5 text-xs font-semibold relative animate-float-slow transition-all duration-300 max-w-[200px] text-center flex items-center gap-1.5">
          <span>Need help apologizing? Chat now! 🌸</span>
          <button
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="text-gray-400 hover:text-gray-700 font-bold ml-1.5 text-[11px]"
            title="Dismiss"
          >
            ×
          </button>
          
          {/* Bubble tail decoration */}
          <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-brand-pink-soft rotate-45"></div>
        </div>
      )}

      {/* Main floating circle button */}
      <button
        onClick={handleClick}
        className="pointer-events-auto p-4 rounded-full bg-green-500 hover:bg-green-600 hover:scale-110 active:scale-95 text-white shadow-cute-hover transition-all duration-300 flex items-center justify-center animate-pulse-custom group cursor-pointer border-2 border-white"
        aria-label="Direct WhatsApp Concierge support"
        id="whatsapp-floating-btn"
      >
        {/* Custom highly polished SVG WhatsApp style logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.208 1.57 5.416 1.572 5.495.002 9.969-4.471 9.972-9.969.002-2.645-1.026-5.132-2.894-7.004C17.279 1.88 14.793.856 12.012.855c-5.462 0-9.943 4.477-9.946 9.941-.001 2.115.541 4.185 1.57 5.952l-1.03 3.762 3.841-1.006zM17.842 14.62c-.319-.16-1.89-.933-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-.1.144-.32-.214-.64-.53-.746-.723-.11-.19-.012-.293.083-.387.086-.085.19-.22.285-.33.094-.11.127-.19.19-.32.063-.13.032-.24-.015-.35-.047-.11-.413-1.01-.565-1.375-.15-.356-.312-.308-.423-.314-.11-.006-.235-.006-.36-.006-.124 0-.327.047-.497.234-.17.187-.65.635-.65 1.55 0 .913.664 1.796.756 1.918.093.123 1.306 1.994 3.165 2.798.442.19.787.305 1.056.39.444.14.848.12 1.168.073.356-.052 1.89-.773 2.157-1.482.268-.71.268-1.32.188-1.448-.079-.12-.293-.18-.612-.34z" />
        </svg>
      </button>
    </div>
  );
};
