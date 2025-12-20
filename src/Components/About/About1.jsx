import React, { useEffect, useRef, useState } from "react";

/* ---------- Reusable Counter ---------- */
const CountUp = ({
  end,
  duration = 4500,
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
/* ------------------------------------- */

const About1 = () => {
  const stats = [
    { img: image14, number: 1400, label: "Students", suffix: "+" },
    { img: image12, number: 40, label: "Teachers", suffix: "+" },
    { img: image17, number: 10, label: "Staffs", suffix: "+" },
    { img: image15, number: 30, label: "Classes", suffix: "+" },
  ];

  // Start CountUp when cards enter the viewport (works on refresh and when navigating to the page)
  const cardRefs = useRef([]);
  const [started, setStarted] = useState(Array(stats.length).fill(false));

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-idx"));
          setStarted((prev) => {
            if (prev[idx]) return prev;
            const next = prev.slice();
            next[idx] = true; // trigger CountUp for this card
            return next;
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-blue-950 text-white ">
      <div className="max-w-7xl px-4 py-12 xl:px-30 mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">
        Statistics
      </h2>
      <hr className="border-t border-2 border-gray-200 mt-2 mb-16" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-idx={index}
            className="flex flex-col items-center justify-center hover:scale-110 duration-500"
          >
            <img
              className="size-30 rounded-full object-cover"
              src={stat.img}
              alt={stat.label}
            />
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
              {started[index] ? (
                <CountUp
                  end={stat.number}
                  duration={1200}
                  suffix={stat.suffix}
                  formatter={(v) => Math.round(v).toLocaleString()}
                />
              ) : (
                <>0{stat.suffix}</>
              )}
            </p>
            <p className="text-lg  font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default About1;
