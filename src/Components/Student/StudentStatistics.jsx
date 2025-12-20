import React, { useEffect, useRef, useState } from 'react';

/* ---------- Reusable Counter ---------- */
const CountUp = ({
  end,
  duration = 5500,
  decimals = 0,
  formatter,
  prefix = "",
  suffix = "",
  easing = true,
}) => {
  const [display, setDisplay] = React.useState(
    prefix + (formatter ? formatter(0) : (0).toFixed(decimals)) + suffix
  );
  const rafRef = React.useRef();

  React.useEffect(() => {
    const start = performance.now();
    const from = 0;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const p = easing ? easeOutCubic(t) : t;
      const value = from + (end - from) * p;

      let text;
      if (formatter) {
        text = formatter(value);
      } else {
        const fixed = value.toFixed(decimals);
        const [i, d] = fixed.split(".");
        text = Number(i).toLocaleString() + (d ? "." + d : "");
      }
      setDisplay(prefix + text + suffix);

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, decimals, formatter, prefix, suffix, easing]);

  return <>{display}</>;
};

/* ---------- Student Statistics ---------- */
const StudentStatistics = () => {
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState([]);

  const stats = [
    { number: '350+', label: 'Six' },
    { number: '300+', label: 'Seven' },
    { number: '280+', label: 'Eight' },
    { number: '250+', label: 'Nine' },
    { number: '250+', label: 'Ten (New)' },
    { number: '240+', label: 'Ten (Old)' },
  ];

  // parse "350+" -> { end: 350, suffix: "+" }
  const parsed = stats.map((s) => {
    const m = String(s.number).match(/^(\d+)(.*)$/);
    return {
      end: m ? parseInt(m[1], 10) : 0,
      suffix: m ? m[2] : '',
    };
  });

  useEffect(() => {
    setVisible(Array(stats.length).fill(false));

    const io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ss-bounce-in');
            const idx = Number(entry.target.getAttribute('data-idx'));
            setVisible((prev) => {
              const next = prev.slice();
              next[idx] = true; // mount CountUp once visible
              return next;
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [stats.length]);

  return (
    <div className='text-white bg-white dark:bg-black/80'>
      <div className=' px-4 py-8 mx-auto max-w-7xl'>

      <h2 className='text-3xl md:text-4xl font-bold text-center dark:text-white/90 mb-4 text-blue-900'>
        Student Statistics
      </h2>
      <hr className='border-t border-2 border-black/10 dark:border-white/20 mt-2 mb-12' />

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center mb-16'>
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-idx={index}
            className='ss-hidden flex flex-col items-center justify-center hover:scale-115 duration-500 bg-blue-950 rounded-full w-36 h-36 sm:w-32 sm:h-32 md:h-40 md:w-40 lg:w-36 lg:h-36 ring-2 ring-cyan-500'
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            <p className='text-3xl font-bold'>
              {visible[index] ? (
                <CountUp
                  end={parsed[index].end}
                  duration={1500 + index * 150} // slight stagger
                  suffix={parsed[index].suffix}
                />
              ) : (
                <>0{parsed[index].suffix}</>
              )}
            </p>
            <p className='text-xl font-semibold mt-1 sm:mt-2'>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default StudentStatistics;
