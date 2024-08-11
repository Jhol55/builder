'use client'

import React, { useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const OpenTabContext = createContext<{
  openTab: boolean;
  setOpenTab: (open: boolean) => void;
} | null>(null);

const modeContext = createContext<{
  mode: string | undefined;
} | undefined>(undefined);

export const Navbar: React.FC<{ mode: string | undefined, children: React.ReactNode, className?: string, style?: object }> = ({
  mode,
  children,
  className,
  style
}) => {
  return (
    <modeContext.Provider value={{ mode }}>
      <div
        style={style}
        className={cn(
          'flex p-2 gap-1',
          mode === 'expand'
            ? 'flex-col justify-start h-[calc(100vh-8rem)] overflow-scroll'
            : 'flex-row justify-end h-auto',
          className)}
      >
        {children}
      </div>
    </modeContext.Provider>
  )
}

export const Dropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openTab, setOpenTab] = useState<boolean>(false);
  const { mode } = useContext(modeContext)!;

  return (
    <OpenTabContext.Provider value={{ openTab, setOpenTab }}>
      <div
        onMouseLeave={() => mode === 'overlay' && setOpenTab(false)}
        className={'relative flex flex-col'}
      >
        {children}
      </div>
    </OpenTabContext.Provider>
  );
};

export const Trigger: React.FC<{ 
  children: React.ReactNode, style?: { color: string, hoverColor: string, hoverBackgroundColor: string, backgroundColor: string } 
}> = ({
  children,
  style
}) => {
  const { openTab, setOpenTab } = useContext(OpenTabContext)!;
  const { mode } = useContext(modeContext)!;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => setOpenTab(mode === 'expand' && openTab ? false : true)}
      className={cn(
        'flex h-10 items-center gap-0.5 rounded-md px-4 py-2 text-sm font-medium text-neutral-950 transition-colors dark:text-white',
        openTab && 'bg-neutral-100 dark:bg-neutral-800 [&>svg]:rotate-180'
      )}
      style={{
        ...style,
        color: isHovered ? style?.hoverColor : style?.color,
        backgroundColor: isHovered ? style?.hoverBackgroundColor : style?.backgroundColor
      }}
      onMouseEnter={() => { mode === 'overlay' && setOpenTab(true); setIsHovered(true) }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200 "
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
};


export const Tab: React.FC<{ children: React.ReactNode; className?: string, style?: object }> = ({
  children,
  className,
  style
}) => {
  const { openTab } = useContext(OpenTabContext)!;
  const { mode } = useContext(modeContext)!;
  return (
    mode === 'expand' ?
      <div
        className="relative w-full mt-1"
        style={style}
      >
        <AnimatePresence initial={false}>
          {openTab && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'flex flex-col gap-2 p-2 rounded-md border border-neutral-200 backdrop-blur-xl transition-all duration-300 dark:border-neutral-800',
                  className
                )}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      :
      <motion.div
        id="overlay-content"
        className="absolute left-0 top-[calc(100%_+_6px)] w-auto"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={openTab ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}>
        <div className="absolute -top-[6px] left-0 right-0 h-[6px]" />
        <div
          className={cn(
            'rounded-md border border-neutral-200 backdrop-blur-xl transition-all duration-300 dark:border-neutral-800',
            className
          )}
          style={style}
        >
          <div className="overflow-hidden">
            <AnimatePresence>
              {openTab && (
                <motion.div
                  exit={{ opacity: 0 }}>

                  <motion.div
                    className='flex flex-col gap-2 p-2'
                    initial={{
                      opacity: 0,
                      x: 0
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}>
                    {children}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
  );
};

export const Link: React.FC<{ 
  children: React.ReactNode, href: string, style?: { color: string, hoverColor: string, hoverBackgroundColor: string, backgroundColor: string } 
}> = ({
  children,
  href,
  style
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className='px-2 py-1 text-sm decoration-none rounded-md text-sm font-medium'
      style={{
        ...style,
        color: isHovered ? style?.hoverColor : style?.color,
        backgroundColor: isHovered ? style?.hoverBackgroundColor : style?.backgroundColor
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  )
};

export const Button: React.FC<{ 
  children: React.ReactNode, href: string, style?: { color: string, hoverColor: string, hoverBackgroundColor: string, backgroundColor: string } 
}> = ({
  children,
  href,
  style
}) => {
  const { mode } = useContext(modeContext)!;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={cn(
        mode === 'expand' ? 'w-full' : 'w-auto items-center justify-center',
        'inline-flex h-10 rounded-md bg-background px-4 py-2 text-sm font-medium no-underline')}
      style={{
        ...style,
        color: isHovered ? style?.hoverColor : style?.color,
        backgroundColor: isHovered ? style?.hoverBackgroundColor : style?.backgroundColor
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  )
}