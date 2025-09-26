'use client';

import { websiteConfig } from '@/config/website';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center', className)}>
      <svg 
        width="60" 
        height="24" 
        viewBox="0 0 120 48" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-6"
      >
        <defs>
          <style>
            {`.logo-primary { fill: var(--primary, oklch(0.6271 0.1699 149.2138)); }
            .logo-text { fill: var(--foreground, oklch(0.1448 0 0)); }
            .logo-text-white { fill: var(--primary-foreground, oklch(0.9851 0 0)); }`}
          </style>
        </defs>
        
        {/* Circle with primary color */}
        <circle cx="24" cy="24" r="18" className="logo-primary" />
        
        {/* Letter W inside the circle */}
        <text x="24" y="30" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" className="logo-text-white" textAnchor="middle">W</text>
        
        {/* Lab text */}
        <text x="50" y="30" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" className="logo-primary" dominantBaseline="middle">Lab</text>
      </svg>
    </div>
  );
}
