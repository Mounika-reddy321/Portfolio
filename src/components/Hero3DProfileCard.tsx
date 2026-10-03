import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Camera, RefreshCw, CheckCircle2, Upload } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PROFILE_AVATAR } from '../data/imageAssets';
import { Card3D } from './Card3D';
import { playWowSound, playNavClickSound } from '../utils/soundEffects';
import { triggerCyberBurst } from '../utils/burstEffect';

export const Hero3DProfileCard: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string>(PROFILE_AVATAR);
  const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved custom photo from localStorage if user previously set it
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mounika_custom_photo_url');
      if (saved) {
        setPhotoSrc(saved);
        setIsCustomPhoto(true);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const handlePhotoFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotoSrc(result);
        setIsCustomPhoto(true);
        try {
          localStorage.setItem('mounika_custom_photo_url', result);
        } catch (err) {
          console.warn('Could not save to localStorage', err);
        }
        playWowSound();
        triggerCyberBurst();
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handlePhotoFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleTriggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    playNavClickSound();
    fileInputRef.current?.click();
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    playNavClickSound();
    setPhotoSrc(PROFILE_AVATAR);
    setIsCustomPhoto(false);
    try {
      localStorage.removeItem('mounika_custom_photo_url');
    } catch (err) {
      // Ignore
    }
  };

  return (
    <Card3D maxTilt={7} glowColor="rgba(0, 242, 254, 0.3)" className="w-full max-w-[320px] sm:max-w-[340px] mx-auto">
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
        
        {/* Main Card Shell - Compact & Sleek */}
        <div className="relative rounded-[14px] bg-[#0A0E23]/95 backdrop-blur-2xl p-4 overflow-hidden border border-white/10">
          
          {/* Subtle cyber background grid */}
          <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

          {/* Header Row: Minimal & Clean */}
          <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                {PERSONAL_INFO.currentStatus}
              </span>
            </div>
            
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-mono font-bold text-cyan-300">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              <span>AI & DATA SCIENCE</span>
            </div>
          </div>

          {/* Notification Toast when custom photo loaded */}
          {showNotification && (
            <div className="relative z-20 my-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-[11px] font-mono flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Photo updated successfully!</span>
            </div>
          )}

          {/* Compact Photo Container (Decreased size as requested) */}
          <div className="relative my-3 flex justify-center">
            
            {/* Glowing Aura Halo */}
            <div className="absolute inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-lg group-hover:scale-105 transition-transform duration-300" />

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCustomPhotoUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Decreased Size Photo Frame (w-48 h-60 sm:w-52 sm:h-64) */}
            <div
              onClick={handleTriggerUpload}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{ transform: 'translateZ(20px)' }}
              title="Click or drop your image.png file to use as it is"
              className={`relative w-44 h-56 sm:w-48 sm:h-60 rounded-xl p-1 shadow-xl overflow-hidden cursor-pointer group/photo transition-all duration-300 ${
                isDragOver
                  ? 'bg-cyan-400 ring-2 ring-cyan-300 scale-102'
                  : 'bg-gradient-to-b from-cyan-400/70 via-indigo-500/50 to-fuchsia-500/70'
              }`}
            >
              <img
                src={photoSrc}
                alt="Borapureddy Mounika"
                className="w-full h-full object-cover object-top rounded-[10px] transition-transform duration-300 group-hover/photo:scale-103"
              />

              {/* Holographic scanning laser line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-12 w-full animate-bounce pointer-events-none opacity-40" />

              {/* Bottom Quick-Action Hover Bar */}
              <div className="absolute bottom-1.5 inset-x-1.5 z-20 flex items-center justify-between px-2 py-1 rounded-lg bg-slate-950/90 border border-white/10 backdrop-blur-md opacity-90 group-hover/photo:opacity-100 transition-opacity">
                <span className="text-[9px] font-mono text-cyan-300 font-semibold flex items-center gap-1">
                  <Camera className="w-2.5 h-2.5 text-cyan-400" />
                  <span>{isCustomPhoto ? 'Custom' : 'Upload image.png'}</span>
                </span>

                {isCustomPhoto && (
                  <button
                    onClick={handleResetPhoto}
                    title="Reset to default"
                    className="p-0.5 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Identity Title & Institution (Clean & Compact) */}
          <div className="relative z-10 text-center pt-0.5">
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase mt-0.5">
              Satya Institute of Technology & Management
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              B.Tech Artificial Intelligence & Data Science
            </p>
          </div>

        </div>
      </div>
    </Card3D>
  );
};
