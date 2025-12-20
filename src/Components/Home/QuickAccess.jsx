import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaUsers } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { ImManWoman } from "react-icons/im";
const QuickAccess = () => {
  // 🔧 change this to whatever you want (e.g., 170, 180, 200, etc.)
  const DISC_SIZE = 120; // px

  const items = [
    {
      title: "Students",
      number: 1400,
      to: "/student-list",
      icon: <FaUsers size={60} className="text-white" />,
    },
    {
      title: "Teachers",
      number: 40,
      to: "/our-teachers",
      icon: <FaUserGraduate size={60} className="text-white" />,
    },
    {
      title: "Staffs",
      number: 10,
      to: "/our-staffs",
      icon: <ImManWoman size={60} className="text-white" />,
    },
    {
      title: "Classes",
      number: 30,
      to: "/",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M3 22h18M6 22V9h12v13M4 9h16l-8-6-8 6Z" />
        </svg>
      ),
    },
  ];

  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("qa-hidden");
            e.target.classList.add("qa-pop");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white dark:bg-black/80 dark:text-white bg-center bg-no-repeat">
      <style>{`
        @keyframes qaPop {
          0% { opacity: 0; transform: translateY(24px) scale(.96); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        .qa-hidden { opacity: 0; transform: translateY(24px) scale(.96); }
        .qa-pop { animation: qaPop .7s ease forwards; }

        .rings::before, .rings::after {
          content:"";
          position:absolute; inset:14px; border-radius:9999px;
          border:3px solid #f6f4fb; pointer-events:none;
        }
        .rings::after { inset:8px; opacity:.5; }
        .ring-third {
          position:absolute; inset:42px; border-radius:9999px;
          border:3px solid #f6f4fb; pointer-events:none;
        }

        .inner-disc {
          background:#1f2837;
          box-shadow: inset 0 10px 26px rgba(0,0,0,.38), 0 6px 14px rgba(0,0,0,.12);
        }

        /* ✅ disc now uses a CSS variable for size */
        .deck { position:relative; width: var(--disc); height: var(--disc); }
        .back, .front {
          position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
          width: 100%; height: 100%; border-radius:9999px;
        }
        .front {
          background:#16005a;
          border:3px solid #ffffff;
          box-shadow: 0 10px 24px rgba(0,0,0,.18);
          z-index: 10;
          transition: transform 1s ease, box-shadow 1s ease;
        }
        .deck:hover .front,
        .deck:focus-within .front {
          transform: translate(-50%, calc(-90% - 46%));
          box-shadow: 0 18px 32px rgba(0,0,0,.24);
        }

        .front-content { display:grid; place-items:center; height:100%; }
        .deck:hover .back-scale { transform: scale(1.02); }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 justify-items-center">
          {items.map((it, i) => (
            <div key={it.title} ref={(el) => (refs.current[i] = el)} className="qa-hidden">
              {/* pass the disc size via CSS var so BOTH front/back follow it */}
              <div className="deck group" style={{ "--disc": `${DISC_SIZE}px` }}>
                {/* BACK (stays put) */}
                <div className="back bg-[#4f3892] rings">
                  <span className="ring-third" />
                  {/* fill back disc 100% (no hardcoded 200px anymore) */}
                  <Link
                    to={it.to}
                    className="absolute inset-0 rounded-full inner-disc grid place-items-center
                               text-white text-3xl font-bold"
                  >
                    {it.number}+
                  </Link>
                </div>

                {/* FRONT (same size, moves up on hover) */}
                <div className="front">
                  <div className="front-content">{it.icon}</div>
                </div>
              </div>

              {/* Label below */}
              <div className="mt-2 text-center">
                <Link
                  to={it.to}
                  className="inline-flex items-center gap-2 text-blue-900 dark:text-white font-bold tracking-wide"
                >
                  <span className="uppercase">{it.title}</span>
                  {/* <span aria-hidden><FaArrowRightLong /></span> */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
