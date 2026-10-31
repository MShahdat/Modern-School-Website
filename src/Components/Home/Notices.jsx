

const Notices = () => {

  return (
    <section className="w-full bg-black">

      <div className="max-w-7xl mx-auto flex items-stretch">

        <div className="bg-white px-2 sm:px-4 py-2 flex items-center shrink-0">
          <span className="text-sm text-black/70 sm:text-[16px] font-bold">Latest Notice</span>
        </div>


        <div

          className="relative overflow-hidden flex-1 h-[44px] flex items-center"
          aria-label="Latest notices"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#063a63] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#063a63] to-transparent" />


          {/* Pause marquee on hover/focus */}
          <style>{`
            [aria-label="Latest notices"]:hover > div[style],
            [aria-label="Latest notices"]:focus-within > div[style] {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Notices;
