export default function ZenIllustration() {
  return (
    <div className="h-[180px] flex items-center justify-center mb-6 relative">
      {/* Background cards */}
      <div className="absolute w-[140px] h-[140px] bg-white/40 rounded-[40px] -rotate-[10deg] shadow-[var(--shadow-ambient)]" />
      <div className="absolute w-[140px] h-[140px] bg-white/60 rounded-[40px] rotate-[5deg] shadow-[var(--shadow-ambient)]" />

      {/* Zen stones */}
      <div className="relative z-[2] flex flex-col items-center justify-end h-[120px]">
        {/* Sparkles */}
        <div
          className="absolute top-5 left-[30px] w-3 h-3 bg-[var(--card-bg)] rounded-full scale-[0.6]"
          style={{
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            animation: 'pulse-sparkle 3s infinite alternate 1s',
          }}
        />
        <div
          className="absolute top-[60px] right-5 w-3 h-3 bg-[var(--card-bg)] rounded-full scale-[0.8]"
          style={{
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            animation: 'pulse-sparkle 3s infinite alternate',
          }}
        />

        <div
          className="w-12 h-6 bg-[var(--stone-3)] -mb-2 z-[3]"
          style={{
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
            boxShadow: 'var(--shadow-clay-inset), var(--shadow-contact)',
            animation: 'float 6s ease-in-out infinite 0.4s',
          }}
        />
        <div
          className="w-[76px] h-9 bg-[var(--stone-2)] -mb-3 z-[2]"
          style={{
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
            boxShadow: 'var(--shadow-clay-inset), var(--shadow-contact)',
            animation: 'float 6s ease-in-out infinite 0.2s',
          }}
        />
        <div
          className="w-[110px] h-12 bg-[var(--stone-1)] z-[1]"
          style={{
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
            boxShadow: 'var(--shadow-clay-inset), var(--shadow-contact)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
