import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { IoIosSunny } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { FiMonitor } from "react-icons/fi";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null); // For mobile only

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'system'
  )

const getThemeIcon = () => {
  if (theme === "light") return <IoIosSunny className="text-[18px]" />
  if (theme === "dark") return <IoMoonSharp className="text-[18px]" />
  return <FiMonitor className="text-[18px]" /> // system
};
  
  const option = [
    {
      icon: <IoIosSunny className='text-[18px]'/>,
      name: 'light',
      lavel: 'Light',
    },
    {
      icon: <IoMoonSharp className='text-[18px]' />,
      name: 'dark',
      lavel: "Dark",
    },
    {
      icon: <FiMonitor className='text-[18px]'/>,
      name: 'system',
      lavel: 'System',
    }
  ]

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // 🔥 fix system mode logic
  useEffect(() => {
    const handleSystemTheme = () => {
      if (darkQuery.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (theme === "system") {
      handleSystemTheme();
      localStorage.removeItem("theme");

      // listen to system changes
      darkQuery.addEventListener("change", handleSystemTheme);

      return () => {
        darkQuery.removeEventListener("change", handleSystemTheme);
      };
    }

    // theme === light or dark
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);


  // Navbar links as config for DRY
  const navItems = [
    {
      key: 'about',
      label: 'ABOUT',
      to: '/about',
      children: [
        { label: 'About Us', to: '/about' },
        { label: 'Founder & Doner List', to: '/founder&donor' },
        { label: 'History', to: '/history' },
        { label: 'Our Vision', to: '/our-vision' },
        { label: 'Campus Tour', to: '/campus-tour' },
        { label: 'Achievements', to: '/achievements' },
        { label: 'Our Principal', to: '/principal' },
        { label: 'Honerable Chairman', to: '/chairman' },
        { label: 'Governing Body', to: '/committee' },
        // { label: 'Ex-Governing Body', to: '/ex-committee'},
        { label: 'Administrator', to: '/administrator' }
      ],
    },
    {
      key: 'academic',
      label: 'ACADEMIC',
      to: '/academic',
      children: [
        { label: 'Our Teachers', to: '/our-teachers' },
        { label: 'Our Staffs', to: '/our-staffs' },
        { label: 'Academic Rules', to: '/academic-rules' },
        { label: 'Academic Calender', to: '/academic-calender' },
        // { label: 'Attendance Sheet', to: '/attendance-sheet'},
        { label: 'Leave Information', to: '/information' },
      ],
    },
    {
      key: 'admission',
      label: 'ADMISSION',
      to: '/admission',
      children: [
        // { label: 'Why Study?', to: '/study' },
        { label: 'How to Apply?', to: '/apply' },
        { label: 'Admission Test?', to: '/admission-test' },
        { label: 'Admission Policy?', to: '/admission-policy' },
        // { label: 'Registration System', to: '/registration' },
      ],
    },
    {
      key: 'student',
      label: 'STUDENT',
      to: '/student',
      children: [
        { label: 'Student List', to: '/student-list' },
        { label: 'Tution Fees', to: '/tution-fees' },
        { label: 'Mobile Banking', to: '/mobile-banking' },
        { label: 'Daily Activities', to: '/daily-activities' },
        { label: 'Exam Schedule', to: '/exam-schedule' },
        { label: 'Student Uniform', to: '/student-uniform' },
        { label: 'Exam System', to: '/exam-system' },
        { label: 'Rules & Regulation', to: '/rules&regulation' },
      ],
    },
    {
      key: 'facilities',
      label: 'FACILITIES',
      to: '/facility',
      children: [
        { label: 'Library', to: '/library' },
        { label: 'Play Ground', to: '/play-ground' },
        { label: 'Physics Lab', to: '/physics-lab' },
        { label: 'Biology Lab', to: '/biology-lab' },
        { label: 'ICT Lab', to: '/ict-lab' },
        { label: 'Chemistry Lab', to: '/chemistry-lab' },
        { label: 'Co-Curricular Activity', to: '/co-curricular-activity' },
      ],
    },
    {
      key: 'result',
      label: 'RESULT',
      to: '/result',
      children: [
        // { label: 'Result', to: '/result' },
        { label: 'Academic Result', to: '/academic-result' },
        // { label: 'Evaluation', to: '/evaluation' },
      ],
    },
    {
      key: 'others',
      label: 'OTHERS',
      to: '/others',
      children: [
        { label: 'Notice', to: '/notice' },
        { label: 'News', to: '/news' },
        { label: 'Events', to: '/events' },
        { label: 'Gallery', to: '/gallery' },
        { label: 'Videos', to: '/videos' },
        { label: 'School Schedule', to: '/school-schedule' },
        // { label: 'Routine', to: '/routine' },
      ],
    },
  ];

  return (
    <div className='bg-blue-950 sticky top-0 left-0 z-50'>
      <div className=" px-4 py-1 mx-auto max-w-7xl">
        {/* Desktop Nav */}
        <div className='flex items-center justify-between'>
          <div className='py-4 font-bold text-white'>
            <Link to="/">HOME</Link>
          </div>
          <div className="hidden lg:flex lg:gap-4 xl:gap-8 font-medium text-[15px] xl:text-[16px] items-center justify-between">

            {navItems.map(item => (
              <div
                key={item.key}
                className="relative py-4 "
                onMouseEnter={() => setOpenMenu(item.key)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link to={item.to} className="flex items-center gap-1 cursor-pointer text-white">
                  {item.label} <FaChevronDown size={12} />
                </Link>
                {openMenu === item.key && (
                  <div className="absolute left-0 bg-white dark:bg-black text-black dark:text-white shadow-lg mt-2 rounded-lg z-50 w-60">
                    {item.children.map(child => (
                      <Link key={child.label} to={child.to}
                        className="block px-4 py-2 hover:scale-102 transform duration-500 hover:rounded-lg hover:bg-blue-900 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className='py-4 text-white'>
              <Link to="/contact">CONTACT</Link>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-0 min-h-0 h-[32px] bg-white px-2 text-[15px] text-black">{getThemeIcon()}Theme</div>
              <ul tabIndex="-1" className="dropdown-content menu text-[14px] rounded-box z-1 w-36 p-2 bg-black shadow">
                {
                  option.map((item, idx) => (
                    <li key={idx} className='text-white'>
                      <a onClick={() => {
                        setTheme(item.name)
                        console.log(item.name)
                      }}>{item.lavel} theme</a>
                    </li>
                  ))
                }
              </ul>
            </div>
            <button
              onClick={() => setMobileMenu(true)}
              className="lg:hidden block text-white border border-white/30 rounded px-1.5 py-0.5 text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>


        {/* <div className="flex items-center justify-between lg:hidden">
          <Link to="/" className="font-bold text-lg text-white py-3 uppercase">Home</Link>
          <div className='flex items-center gap-2'>
            <div>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{ic} Theme</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  {
                    option.map((item, idx) => (
                      <li key={idx} className=''>
                        <a onClick={() => {
                          console.log(item.name)
                          setIc(item.icon)
                        }}>{item.lavel} theme</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <button
              onClick={() => setMobileMenu(true)}
              className="text-white border border-white/30 rounded px-1.5 py-0.5 text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div> */}

        {/* Mobile Drawer/Menu */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-white dark:bg-black dark:text-white z-50 flex flex-col p-6 lg:hidden overflow-y-auto">
            <button
              onClick={() => setMobileMenu(false)}
              className="self-end text-2xl text-gray-700 mb-2 dark:text-white/90"
            >
              <FaTimes />
            </button>
            <Link to="/" className="px-8 py-2 uppercase text-[16px] font-bold text-sky-800 dark:text-white/80 border-b border-black/10 dark:border-white/30 hover:rounded-xl hover:scale-101 transform duration-600 hover:bg-blue-950 hover:text-white" onClick={() => setMobileMenu(false)}>
              Home
            </Link>
            {navItems.map(item => (
              <MobileMenuDropdown
                key={item.key}
                item={item}
                openMobileDropdown={openMobileDropdown}
                setOpenMobileDropdown={setOpenMobileDropdown}
                onLinkClick={() => setMobileMenu(false)}
              />
            ))}
            <Link to="/contact" className="px-8 py-2 uppercase text-[16px] font-bold text-sky-800 dark:text-white/80 border-t border-black/10 dark:border-white/30 mt-2 hover:rounded-xl hover:scale-101 transform duration-600 hover:bg-blue-950 hover:text-white" onClick={() => setMobileMenu(false)}>
              Contact
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Dropdown for Mobile, only one open at a time, WITH HOVER!
const MobileMenuDropdown = ({ item, onLinkClick, openMobileDropdown, setOpenMobileDropdown }) => {
  const isOpen = openMobileDropdown === item.key;

  const handleToggle = () => {
    if (isOpen) {
      setOpenMobileDropdown(null); // close if already open
    } else {
      setOpenMobileDropdown(item.key); // open this, close others
    }
  };

  return (
    <div className="w-full">
      <button
        className={`px-8 flex items-center justify-between w-full py-2 text-[16px] font-bold text-sky-800 dark:text-white/80 focus:outline-none transition hover:scale-101 hover:rounded-xl transform duration-300 hover:bg-blue-950 hover:text-white`}
        onClick={handleToggle}
      >
        <span>{item.label}</span>
        <FaChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="pl-4 pt-3 pb-3 bg-white shadow-2xl dark:bg-black border border-white/30 rounded-lg">
          {item.children.map(child => (
            <Link
              key={child.label}
              to={child.to}
              className="block px-16 py-2 text-[16px] font-bold text-black/75 dark:text-white/80 transition hover:scale-101 hover:rounded-xl transform duration-300 hover:bg-blue-900 hover:text-white"
              onClick={onLinkClick}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
