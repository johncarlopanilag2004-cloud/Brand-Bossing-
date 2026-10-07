import React from 'react';
import gentlemanLogoImg from '../assets/images/gentleman_bossing_clean_1791287840092.jpg';

interface BossingLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BossingLogo: React.FC<BossingLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
}) => {
  // Dimension tokens
  const iconDimensions = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const logoSrc = gentlemanLogoImg || '/images/gentleman_bossing_clean_1791287840092.jpg';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Clean Half-Body Gentleman Bossing Emblem (No Words Inside) */}
      <div
        className={`relative ${iconDimensions} shrink-0 rounded-2xl bg-gradient-to-br from-amber-400/30 via-amber-500/10 to-[#0e1014] p-0.5 border border-amber-400/50 shadow-lg shadow-amber-400/15 flex items-center justify-center overflow-hidden`}
        title="Brand|Bossing - Gentleman Bossing Pose"
      >
        <img
          src={logoSrc}
          alt="Brand|Bossing Gentleman Logo"
          className="h-full w-full object-cover object-top rounded-[14px] scale-[1.05] transition-transform duration-300 hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/bossing_logo_clean.jpg';
          }}
        />
      </div>

      {/* Typography: Brand|Bossing */}
      {!iconOnly && (
        <span className={`${textSizes} font-extrabold tracking-tight text-white font-display flex items-center leading-none`}>
          <span>Brand</span>
          <span className="text-amber-400 mx-0.5">|</span>
          <span className="text-amber-400">Bossing</span>
        </span>
      )}
    </div>
  );
};



