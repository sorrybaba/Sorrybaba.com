/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const StoryAnimation: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-6 shadow-cute relative overflow-hidden h-[300px] md:h-[360px] flex items-center justify-center border border-brand-pink-soft/40">
      
      {/* Absolute Decorative Floating Items */}
      <div className="absolute top-4 left-4 text-brand-pink/30 animate-pulse-custom">✨</div>
      <div className="absolute bottom-4 right-4 text-brand-blue/30 animate-float-slow">💖</div>
      <div className="absolute top-8 right-12 text-brand-purple/20 animate-wiggle">🌸</div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        className="w-full h-full"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="angerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="loveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF1A75" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF1A75" stopOpacity="0" />
          </radialGradient>

          {/* Styles for animation timing based on a 5 second infinite sequence */}
          <style>
            {`
              /* BOY ANIMATIONS */
              @keyframes boyMove {
                0%, 15% { transform: translate(0, 0); }
                30% { transform: translate(15px, 0); }
                45%, 90% { transform: translate(75px, 0); }
                95%, 100% { transform: translate(0, 0); }
              }
              .anim-boy {
                animation: boyMove 6s infinite ease-in-out;
              }

              /* ANGRY GLOW (Scene 2) */
              @keyframes angerReveal {
                0%, 10% { opacity: 0; transform: scale(0.5); }
                15%, 40% { opacity: 1; transform: scale(1.1); }
                45%, 100% { opacity: 0; transform: scale(0.5); }
              }
              .anim-anger-glow {
                animation: angerReveal 6s infinite ease-in-out;
                transform-origin: 280px 140px;
              }

              /* LOVE GLOW (Scene 5) */
              @keyframes loveReveal {
                0%, 55% { opacity: 0; transform: scale(0.4); }
                65%, 90% { opacity: 1; transform: scale(1.3); }
                95%, 100% { opacity: 0; transform: scale(0.4); }
              }
              .anim-love-glow {
                animation: loveReveal 6s infinite ease-in-out;
                transform-origin: 220px 140px;
              }

              /* GIRL ARM SWAP (Scene 2: crossed; Scene 4: open; Scene 5: hugging) */
              @keyframes girlArmRotate {
                0%, 10% { transform: rotate(0deg); }
                15%, 40% { transform: rotate(-10deg); }
                45%, 55% { transform: rotate(15deg); }
                65%, 90% { transform: rotate(45deg); }
                95%, 100% { transform: rotate(0deg); }
              }
              .anim-girl-arm-left {
                animation: girlArmRotate 6s infinite ease-in-out;
                transform-origin: 265px 150px;
              }

              /* BOY ARM SWAP (Scene 3 - hands out gift) */
              @keyframes boyArmOffer {
                0%, 25% { transform: rotate(0deg); }
                40%, 90% { transform: rotate(-30deg); }
                95%, 100% { transform: rotate(0deg); }
              }
              .anim-boy-arm-right {
                animation: boyArmOffer 6s infinite ease-in-out;
                transform-origin: 135px 150px;
              }

              /* GIFT VISIBILITY & SLIDE */
              @keyframes giftSlide {
                0%, 15% { transform: translate(0, 0) scale(1); opacity: 1; }
                40% { transform: translate(15px, -5px) scale(1); opacity: 1; }
                45%, 60% { transform: translate(45px, -5px) scale(1.1); opacity: 1; }
                65%, 90% { transform: translate(45px, 15px) scale(0.9); opacity: 0.8; }
                95%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
              }
              .anim-gift {
                animation: giftSlide 6s infinite ease-in-out;
                transform-origin: 130px 155px;
              }

              /* EMOTION FACES FOR GIRL */
              @keyframes girlMood {
                0%, 10% { opacity: 1; } /* neutral */
                15%, 40% { opacity: 0; } /* angry placeholder takes over */
                45%, 100% { opacity: 1; } /* returns smiling/happy */
              }
              .girl-face-happy {
                animation: girlMood 6s infinite ease-in-out;
              }

              @keyframes girlAngryMood {
                0%, 10% { opacity: 0; }
                15%, 40% { opacity: 1; }
                45%, 100% { opacity: 0; }
              }
              .girl-face-angry {
                animation: girlAngryMood 6s infinite ease-in-out;
              }

              /* FLOATING HEARTS (Scene 5) */
              @keyframes floatHeartsUp {
                0%, 55% { transform: translateY(30px) scale(0); opacity: 0; }
                65% { opacity: 1; }
                85%, 90% { transform: translateY(-70px) scale(1.5); opacity: 0; }
                95%, 100% { transform: translateY(30px) scale(0); opacity: 0; }
              }
              .heart-grp-1 { animation: floatHeartsUp 6s infinite ease-in-out 0.1s; transform-origin: 220px 100px; }
              .heart-grp-2 { animation: floatHeartsUp 6s infinite ease-in-out 0.4s; transform-origin: 200px 90px; }
              .heart-grp-3 { animation: floatHeartsUp 6s infinite ease-in-out 0.7s; transform-origin: 240px 110px; }
            `}
          </style>
        </defs>

        {/* Backdrop Floor */}
        <ellipse cx="200" cy="240" rx="160" ry="25" fill="#FFE6F0" opacity="0.3" />
        <ellipse cx="200" cy="240" rx="120" ry="15" fill="#E6F7FF" opacity="0.4" />

        {/* SCENE GLOW EFFECTS */}
        {/* Angry Red Glow */}
        <circle cx="280" cy="140" r="90" fill="url(#angerGlow)" className="anim-anger-glow" />
        {/* Pink Love Glow */}
        <circle cx="220" cy="140" r="100" fill="url(#loveGlow)" className="anim-love-glow" />

        {/* LITTLE BOY ON THE LEFT (Group anim-boy) */}
        <g className="anim-boy">
          {/* Shadow */}
          <ellipse cx="110" cy="235" rx="30" ry="8" fill="#1F2937" opacity="0.1" />
          
          {/* Boy Body */}
          <path d="M 90 230 L 130 230 L 125 160 L 95 160 Z" fill="#00B2FF" />
          {/* Trouser legs */}
          <rect x="96" y="225" width="10" height="10" fill="#1F2937" opacity="0.8" />
          <rect x="114" y="225" width="10" height="10" fill="#1F2937" opacity="0.8" />
          <ellipse cx="101" cy="236" rx="6" ry="3" fill="#1F2937" />
          <ellipse cx="119" cy="236" rx="6" ry="3" fill="#1F2937" />

          {/* Boy Left Arm (Holds gift close / down) */}
          <path d="M 92 165 C 80 175 80 195 85 205" fill="none" stroke="#FF1A75" strokeWidth="8" strokeLinecap="round" />

          {/* Boy Head */}
          <circle cx="110" cy="120" r="28" fill="#FFF2EA" />
          {/* Hair */}
          <path d="M 81 120 C 80 100 95 90 110 92 C 125 90 140 100 139 120 C 120 105 100 105 81 120 Z" fill="#4B5563" />
          
          {/* Boy Face Features */}
          <circle cx="102" cy="122" r="2.5" fill="#1F2937" />
          <circle cx="118" cy="122" r="2.5" fill="#1F2937" />
          {/* Shy blush */}
          <circle cx="97" cy="128" r="3" fill="#FF1A75" opacity="0.4" />
          <circle cx="123" cy="128" r="3" fill="#FF1A75" opacity="0.4" />
          {/* Shy smiled mouth */}
          <path d="M 107 130 Q 110 133 113 130" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

          {/* Boy Right Arm (Offering gift) */}
          <path d="M 128 165 C 138 175 145 185 145 195" fill="none" stroke="#FFF2EA" strokeWidth="8" strokeLinecap="round" className="anim-boy-arm-right" />
        </g>

        {/* THE APOLOGY GIFT (Labeled SorryBaba.com) */}
        <g className="anim-gift">
          {/* Box shadow */}
          <rect x="120" y="188" width="40" height="30" rx="4" fill="#1F2937" opacity="0.1" />
          {/* Box body */}
          <rect x="120" y="185" width="40" height="30" rx="4" fill="#FF1A75" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Ribbon */}
          <rect x="137" y="185" width="6" height="30" fill="#FFE6F0" />
          <rect x="120" y="197" width="40" height="6" fill="#FFE6F0" />
          {/* Ribbon knot */}
          <path d="M 134 180 C 130 172 138 172 140 185 C 142 172 150 172 146 180 Z" fill="#FFE6F0" />
          {/* Label Card */}
          <rect x="124" y="205" width="32" height="8" rx="2" fill="#FFFFFF" />
          <text x="140" y="211" fontSize="4.5" fill="#FF1A75" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SorryBaba</text>
        </g>

        {/* ANGRY / HAPPY GIRLFRIEND ON THE RIGHT */}
        <g>
          {/* Shadow */}
          <ellipse cx="280" cy="235" rx="30" ry="8" fill="#1F2937" opacity="0.1" />

          {/* Girl Body */}
          <path d="M 260 230 L 300 230 L 295 160 L 265 160 Z" fill="#9B66FF" />
          {/* Shoes */}
          <ellipse cx="272" cy="233" rx="6" ry="3.5" fill="#1F2937" />
          <ellipse cx="288" cy="233" rx="6" ry="3.5" fill="#1F2937" />

          {/* Girl Left Arm - interactive rotative movement */}
          <path d="M 265 165 C 255 178 250 190 258 200" fill="none" stroke="#FFF2EA" strokeWidth="7.5" strokeLinecap="round" className="anim-girl-arm-left" />

          {/* Girl Right Arm (holding side or hugging) */}
          <path d="M 293 165 C 305 175 310 185 305 198" fill="none" stroke="#FFF2EA" strokeWidth="7.5" strokeLinecap="round" />

          {/* Girl Head */}
          <circle cx="280" cy="120" r="28" fill="#FFF2EA" />
          
          {/* Hair (Beautiful ponytail/bob) */}
          <path d="M 252 120 C 252 85 308 85 308 116 C 314 125 312 145 305 140 C 300 135 298 120 298 115" fill="#1F2937" />
          <circle cx="310" cy="128" r="8" fill="#1F2937" /> {/* Ponytail */}

          {/* MOOD 1: HAPPY GIRL (Fades in over scenes 4 & 5) */}
          <g className="girl-face-happy">
            {/* Blushing pink cheeks */}
            <circle cx="266" cy="127" r="4" fill="#FF1A75" opacity="0.6" />
            <circle cx="294" cy="127" r="4" fill="#FF1A75" opacity="0.6" />
            {/* Smiling happy eyes */}
            <path d="M 266 120 Q 270 116 274 120" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 286 120 Q 290 116 294 120" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            {/* BIG Smile mouth */}
            <path d="M 274 129 Q 280 135 286 129" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* MOOD 2: ANGRY GIRL (Fades in over scene 2) */}
          <g className="girl-face-angry">
            {/* Angry veins / irritation lines */}
            <path d="M 298 102 L 304 98" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <path d="M 302 104 L 300 98" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            
            {/* Angry red cheeks */}
            <circle cx="266" cy="127" r="5" fill="#ef4444" opacity="0.7" />
            <circle cx="294" cy="127" r="5" fill="#ef4444" opacity="0.7" />
            
            {/* Slanted angry eyes */}
            <path d="M 265 119 L 273 121" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
            <path d="M 287 121 L 295 119" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
            
            {/* Sad / angry down turned mouth */}
            <path d="M 275 133 Q 280 128 285 133" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>

        {/* FLOATING HEARTS IN HUGGING PHASE (Scene 5) */}
        <g className="heart-grp-1">
          <path d="M 210 100 C 205 90 195 90 190 100 C 185 110 195 125 210 135 C 225 125 235 110 230 100 C 225 90 215 90 210 100 Z" fill="#FF1A75" />
        </g>
        <g className="heart-grp-2">
          <path d="M 190 80 C 187 72 178 72 174 80 C 170 88 178 100 190 108 C 202 100 210 88 206 80 C 202 72 193 72 190 80 Z" fill="#9B66FF" transform="scale(0.8) translate(50, 10)" />
        </g>
        <g className="heart-grp-3">
          <path d="M 240 120 C 237 114 231 114 228 120 C 225 126 231 135 240 141 C 249 135 255 126 252 120 C 249 114 243 114 240 120 Z" fill="#FF1A75" transform="scale(0.6) translate(150, 40)" />
        </g>
      </svg>
    </div>
  );
};
