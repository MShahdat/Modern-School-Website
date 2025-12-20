import React, { useEffect, useRef, useState } from "react";
import image1 from "/Images/14.jpg";
import image2 from "/Images/12.jpg";
import image3 from "/Images/17.jpg";
import image4 from "/Images/45.jpg";

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

const Stat = () => {
  const stats = [
    { img: image1, number: 1400, label: "Students", suffix: "+" },
    { img: image2, number: 40, label: "Teachers", suffix: "+" },
    { img: image3, number: 10, label: "Staffs", suffix: "+" },
    { img: image4, number: 30, label: "Classes", suffix: "+" },
  ];

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
            next[idx] = true;
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
    <div className="bg-blue-950 text-white">
      <div className=" -mt-1.5 px-4 py-6 xl:px-30 mx-auto max-w-7xl">
      {/* ✅ Added divide-x for vertical lines */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center mb-0 divide-x divide-white/50">
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-idx={index}
            className="flex flex-col items-center justify-center hover:scale-110 duration-500 px-4"
          >
            <img
              className="size-20 rounded-full object-cover mb-2"
              src={stat.img}
              alt={stat.label}
            />
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
              <p className="text-xl font-bold">
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
              <p className="text-lg -mt-1.5 sm:mt-0 font-semibold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Stat;
