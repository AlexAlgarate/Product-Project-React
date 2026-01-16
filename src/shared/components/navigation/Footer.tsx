import React from 'react';
import githubWhite from '@assets/githubWhite.svg';
import linkedin from '@assets/linkedin.svg';

import { cn } from '@shared/utils/cn';

export const Footer: React.FC = () => {
  const socialLinkClass = cn(
    'flex grayscale opacity-60',
    'transition-all duration-300 ease-in-out',
    'hover:grayscale-0 hover:opacity-100',
    'hover:-translate-y-[3px]'
  );

  return (
    <footer className="mt-auto py-8 px-4 border-t border-t-white/5 bg-[#121212]">
      <div className="max-w-275 mx-auto flex flex-col items-center gap-4 sm:flex sm:justify-between sm:flex-row">
        <span className="text-gray-400 tracking-wide">
          © {new Date().getFullYear()} — Developed by{' '}
          <strong className="font-semibold text-white tracking-wider">
            Álex Algarate
          </strong>
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/AlexAlgarate/product-project"
            className={socialLinkClass}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github repository"
          >
            <img src={githubWhite} className="w-8 h-8" alt="Github logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/alex-algarate/"
            className={socialLinkClass}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin profile"
          >
            <img src={linkedin} className="w-8 h-8" alt="Linkedin logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};
