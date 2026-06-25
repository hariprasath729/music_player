import React from 'react';

/**
 * AppSkeleton — Lightweight skeleton UI displayed during startup when
 * authentication verification outlasts the splash screen.
 *
 * Mirrors the PlayerShell layout structure with shimmer placeholders.
 * Contains zero real data — only communicates page structure.
 */

/* ── Reusable shimmer block ── */
const Shimmer: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div className={`skeleton-shimmer ${className}`} style={style} />
);

/* ── Sidebar skeleton (desktop only) ── */
const SidebarSkeleton: React.FC = () => (
  <aside className="hidden md:flex h-full w-64 flex-col gap-2 bg-[#121212] p-2 shrink-0">
    {/* Top nav block */}
    <div className="rounded-lg px-2 py-2 flex flex-col gap-1">
      <div className="flex items-center gap-4 px-3 py-3">
        <Shimmer className="w-6 h-6 shrink-0 !rounded-md" />
        <Shimmer className="h-4 flex-1 max-w-[80px]" />
      </div>
      <div className="flex items-center gap-4 px-3 py-3">
        <Shimmer className="w-6 h-6 shrink-0 !rounded-md" />
        <Shimmer className="h-4 flex-1 max-w-[80px]" />
      </div>
    </div>

    {/* Library block */}
    <div className="rounded-lg flex-1 flex flex-col overflow-hidden">
      <div className="px-3 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shimmer className="w-6 h-6 shrink-0 !rounded-md" />
          <Shimmer className="h-4 w-24" />
        </div>
      </div>

      {/* Filter pills */}
      <div className="px-4 py-2 flex gap-2">
        <Shimmer className="h-6 w-16 !rounded-full" />
        <Shimmer className="h-6 w-14 !rounded-full" />
      </div>

      {/* Playlist items */}
      <div className="flex-1 px-2 py-2 space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-1.5">
            <Shimmer className="w-12 h-12 shrink-0 !rounded-md" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Shimmer className="h-3.5 w-3/4" />
              <Shimmer className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

/* ── Navbar skeleton ── */
const NavbarSkeleton: React.FC = () => (
  <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 sm:px-6 md:h-16">
    {/* Mobile nav */}
    <div className="flex w-full items-center justify-between md:hidden">
      <div className="flex items-center gap-3">
        <Shimmer className="h-8 w-8 !rounded-full" />
        <Shimmer className="h-6 w-12 !rounded-full" />
        <Shimmer className="h-6 w-14 !rounded-full" />
      </div>
      <div className="flex items-center gap-4">
        <Shimmer className="h-5 w-5 !rounded-full" />
        <Shimmer className="h-5 w-5 !rounded-full" />
      </div>
    </div>

    {/* Desktop nav */}
    <div className="hidden w-full items-center justify-between md:flex">
      <div />
      <div className="flex items-center gap-3">
        <Shimmer className="h-8 w-24 !rounded-full" />
        <Shimmer className="h-8 w-8 !rounded-full" />
        <Shimmer className="h-8 w-8 !rounded-full" />
        <Shimmer className="h-8 w-8 !rounded-full" />
      </div>
    </div>
  </header>
);

/* ── Main content area skeleton ── */
const ContentSkeleton: React.FC = () => (
  <main className="flex-1 overflow-hidden bg-[#121212] p-4 sm:p-6">
    {/* Section heading */}
    <Shimmer className="h-6 w-48 mb-6" />

    {/* Content blocks grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Shimmer className="w-full aspect-square !rounded-md" />
          <Shimmer className="h-3.5 w-3/4" />
          <Shimmer className="h-3 w-1/2" />
        </div>
      ))}
    </div>

    {/* Second section heading */}
    <Shimmer className="h-6 w-40 mb-6" />

    {/* Horizontal row of items */}
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 shrink-0 w-64">
          <Shimmer className="w-12 h-12 shrink-0 !rounded-md" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Shimmer className="h-3.5 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </main>
);

/* ── Player bar skeleton (desktop only) ── */
const PlayerBarSkeleton: React.FC = () => (
  <footer className="hidden md:flex h-[90px] items-center justify-between border-t border-[#282828] bg-black px-4">
    {/* Left — track info */}
    <div className="flex w-[30%] min-w-[180px] items-center gap-3.5">
      <Shimmer className="h-14 w-14 shrink-0 !rounded-md" />
      <div className="flex flex-col gap-1.5">
        <Shimmer className="h-3.5 w-28" />
        <Shimmer className="h-3 w-20" />
      </div>
    </div>

    {/* Center — controls */}
    <div className="flex max-w-[722px] flex-1 flex-col items-center gap-2">
      <div className="flex items-center gap-5">
        <Shimmer className="h-4 w-4 !rounded-full" />
        <Shimmer className="h-4 w-4 !rounded-full" />
        <Shimmer className="h-8 w-8 !rounded-full" />
        <Shimmer className="h-4 w-4 !rounded-full" />
        <Shimmer className="h-4 w-4 !rounded-full" />
      </div>
      <div className="flex w-full items-center gap-2">
        <Shimmer className="h-3 w-10" />
        <Shimmer className="h-1 flex-1 !rounded-full" />
        <Shimmer className="h-3 w-10" />
      </div>
    </div>

    {/* Right — volume etc */}
    <div className="flex w-[30%] min-w-[180px] items-center justify-end gap-3">
      <Shimmer className="h-4 w-4 !rounded-full" />
      <Shimmer className="h-4 w-4 !rounded-full" />
      <Shimmer className="h-4 w-4 !rounded-full" />
      <Shimmer className="h-1 w-[93px] !rounded-full" />
    </div>
  </footer>
);

/* ── Mobile bottom nav skeleton ── */
const MobileNavSkeleton: React.FC = () => (
  <nav className="flex border-t border-[#282828] bg-gradient-to-t from-black to-[#121212] md:hidden">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5">
        <Shimmer className="h-6 w-6 !rounded-md" />
        <Shimmer className="h-2.5 w-8" />
      </div>
    ))}
  </nav>
);

/* ── Combined skeleton shell ── */
export const AppSkeleton: React.FC = () => (
  <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-black font-sans antialiased select-none">
    <div className="relative flex flex-1 overflow-hidden">
      <SidebarSkeleton />
      <div className="relative flex flex-1 flex-col overflow-hidden bg-[#121212] md:my-2 md:mr-2 md:rounded-lg">
        <NavbarSkeleton />
        <ContentSkeleton />
      </div>
    </div>
    {/* Mobile mini-player placeholder */}
    <div className="flex md:hidden items-center gap-3 px-4 py-2 bg-[#181818] border-t border-[#282828]">
      <Shimmer className="h-10 w-10 shrink-0 !rounded-md" />
      <div className="flex flex-col gap-1 flex-1">
        <Shimmer className="h-3 w-32" />
        <Shimmer className="h-2.5 w-20" />
      </div>
      <Shimmer className="h-6 w-6 !rounded-full" />
    </div>
    <MobileNavSkeleton />
    <PlayerBarSkeleton />
  </div>
);
