import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '../utils/cn';

const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-4 py-3 transition-colors duration-200 group",
        isActive 
          ? "text-primary dark:text-inverse-primary font-bold border-r-2 border-primary dark:border-inverse-primary translate-x-1" 
          : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary"
      )
    }
  >
    {({ isActive }) => (
      <>
        <span 
          className={cn("material-symbols-outlined transition-transform", !isActive && "group-hover:scale-110")}
          style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {icon}
        </span>
        <span className="text-label-sm font-label-sm uppercase tracking-widest">{label}</span>
      </>
    )}
  </NavLink>
);

const MobileNavItem = ({ to, icon }: { to: string; icon: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex flex-col items-center justify-center w-full h-full",
        isActive ? "text-primary" : "text-on-surface-variant"
      )
    }
  >
    {({ isActive }) => (
      <span 
        className="material-symbols-outlined" 
        style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        {icon}
      </span>
    )}
  </NavLink>
);

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md antialiased selection:bg-primary-fixed-dim selection:text-on-primary-fixed overflow-x-hidden">
      {/* SideNavBar Desktop */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-surface dark:bg-inverse-surface border-r border-outline-variant dark:border-outline fixed left-0 py-margin-desktop px-8 z-50">
        <div className="mb-stack-lg">
          <div className="text-headline-md font-headline-md text-primary dark:text-inverse-primary italic mb-2">TaskFlow</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant dark:text-surface-variant uppercase tracking-widest">Academic & Career</div>
        </div>
        
        <nav className="flex-1 space-y-stack-sm flex flex-col mt-stack-md">
          <NavItem to="/" icon="dashboard" label="대시보드" />
          <NavItem to="/activities" icon="list_alt" label="활동 목록" />
          <NavItem to="/deadlines" icon="calendar_today" label="마감 일정" />
          <NavItem to="/create" icon="add_circle" label="활동 추가" />
        </nav>
        
        <div className="mt-auto pt-stack-md border-t border-outline-variant/30 flex items-center gap-4">
          <img 
            alt="User Profile" 
            className="w-10 h-10 rounded-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARi30nspvsbjFqzcvCGndHQGt6CYra2bTw7Z0xIFTjBFg9O0JV7oRW1I5KSpVIND1s5JdG3g2uaDqpvvNPsZ2jwWAax6yVUxU4zfPE7Hr2qtWzv_7MRKKMnJ7N5gpVCG1g2ooJN_AA8lxmFPxJ5NcFhWNAU7uFU1Z8Cxjo_CkX-YqjU8l0w-90IraI8OyXLg9zwJoOYfr3ej4Umm1bZ1KwUZdAru2QmkNwb0Fxtnb65iTPRfpSejerJk4NFis6v965NvLL56dQ4g"
          />
          <div>
            <div className="text-label-sm font-label-sm text-on-surface">Minji Kim</div>
            <div className="text-xs text-on-surface-variant">Profile</div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 w-full flex flex-col min-w-0">
        {/* TopNavBar Mobile */}
        <header className="md:hidden flex justify-between items-center w-full px-margin-mobile h-20 z-40 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md sticky top-0 border-b border-outline-variant/20">
          <div className="text-headline-lg-mobile font-headline-lg-mobile text-primary dark:text-inverse-primary italic">TaskFlow</div>
          <div className="flex items-center gap-4 text-primary dark:text-inverse-primary">
            <button className="hover:opacity-70 transition-opacity"><span className="material-symbols-outlined">notifications</span></button>
            <button className="hover:opacity-70 transition-opacity"><span className="material-symbols-outlined">settings</span></button>
          </div>
        </header>

        {/* Desktop Top Actions */}
        <div className="hidden md:flex justify-end items-center px-margin-desktop py-6 gap-6 w-full max-w-container-max mx-auto">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input 
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-label-sm font-label-sm focus:ring-0 focus:border-b focus:border-primary transition-all outline-none" 
              placeholder="Search tasks..." 
              type="text"
            />
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop pb-24 md:pb-stack-lg w-full max-w-container-max mx-auto">
          <Outlet />
        </div>
      </main>

      {/* BottomNavBar Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md flex justify-around items-center h-16 border-t border-outline-variant/20 z-50 pb-safe">
        <MobileNavItem to="/" icon="dashboard" />
        <MobileNavItem to="/activities" icon="list_alt" />
        <MobileNavItem to="/deadlines" icon="calendar_today" />
        <MobileNavItem to="/create" icon="add_circle" />
      </nav>
    </div>
  );
};
