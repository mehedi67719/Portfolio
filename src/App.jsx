// App.jsx - Complete fixed version with all components
import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaFigma,
  FaCode, FaMobileAlt, FaDatabase, FaServer, FaEnvelope, FaPhoneAlt,
  FaMapMarkerAlt, FaGlobe, FaGithub, FaLinkedin, FaTwitter, FaAward,
  FaProjectDiagram, FaDownload, FaCheckCircle, FaArrowRight,
  FaStar, FaLaptopCode, FaHeart, FaCalendarAlt, FaGraduationCap,
  FaExternalLinkAlt, FaSpinner, FaUsers, FaRocket, FaEye, FaTimes,
  FaGithubAlt, FaPlay, FaFacebook,
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiFirebase, SiNextdotjs,
  SiTypescript, SiPostgresql
} from "react-icons/si";
import { FiMenu, FiX, FiGithub } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import { VscCode } from "react-icons/vsc";


const DataContext = createContext();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "https://drive.google.com/uc?export=download&id=1k-mXvw4tYxqnk1Xs7U9AD-sRnNzEwUhO";
    link.download = "Mehedi_Hassan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fixed IntersectionObserver for active section detection
  useEffect(() => {
    if (!data) return;
    
    const sections = ["home", "about", "skills", "expertise", "projects", "journey", "education", "contact"];
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -30% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      
      if (visibleSections.length > 0) {
        let topMostSection = visibleSections[0];
        let minTop = Infinity;
        
        visibleSections.forEach(entry => {
          const rect = entry.target.getBoundingClientRect();
          if (rect.top < minTop && rect.top >= 0) {
            minTop = rect.top;
            topMostSection = entry;
          }
        });
        
        if (topMostSection && topMostSection.target.id) {
          setActiveSection(topMostSection.target.id);
        }
      }
    }, observerOptions);
    
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        sectionRefs.current[section] = element;
        observer.observe(element);
      }
    });
    
    return () => {
      sections.forEach((section) => {
        const element = sectionRefs.current[section];
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [data]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-amber-400 text-5xl"
        >
          <FaSpinner />
        </motion.div>
      </div>
    );
  }

  return (
    <DataContext.Provider value={data}>
      <div className="bg-black text-gray-200 font-sans overflow-x-hidden">
        <motion.div
          className="fixed w-8 h-8 border-2 border-amber-400 rounded-full pointer-events-none z-50 hidden lg:block"
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        />
        <motion.div
          className="fixed w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-50 hidden lg:block"
          animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
          transition={{ type: "tween", ease: "backOut", duration: 0.05 }}
        />

        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-amber-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] bg-amber-700/5 rounded-full blur-3xl"></div>
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl"
          />
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-amber-500/20"
        >
          <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold relative group cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <span className="text-amber-400">{data.personal.shortName}</span>
              <span className="text-white">.</span>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-1 left-0 h-0.5 bg-amber-400"
              />
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "expertise", "projects", "journey", "education", "contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 text-sm font-medium pb-1 relative ${
                    activeSection === item ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-black font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                <FaDownload /> Resume
              </motion.button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl z-50">
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-black/95 backdrop-blur-md border-b border-amber-500/20"
              >
                <div className="flex flex-col items-center py-4 space-y-4">
                  {["home", "about", "skills", "expertise", "projects", "journey", "education", "contact"].map((item) => (
                    <motion.button
                      key={item}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize text-lg ${activeSection === item ? "text-amber-400" : "text-gray-300"}`}
                    >
                      {item}
                    </motion.button>
                  ))}
                  <button onClick={downloadResume} className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-black font-semibold flex items-center gap-2">
                    <FaDownload /> Resume
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <SkillsSection />
        <ExpertiseSection />
        <ProjectsSection scrollToSection={scrollToSection} />
        <JourneySection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </DataContext.Provider>
  );
};

// Hero Section
const HeroSection = ({ scrollToSection }) => {
  const { personal, roles } = useContext(DataContext);
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      if (charIndex > 0) {
        const timeout = setTimeout(() => { setTypedText((prev) => prev.slice(0, -1)); setCharIndex(charIndex - 1); }, 50);
        return () => clearTimeout(timeout);
      } else { setIsDeleting(false); setRoleIndex((prev) => (prev + 1) % roles.length); }
    } else {
      if (charIndex < currentRole.length) {
        const timeout = setTimeout(() => { setTypedText((prev) => prev + currentRole[charIndex]); setCharIndex(charIndex + 1); }, 100);
        return () => clearTimeout(timeout);
      } else { const timeout = setTimeout(() => { setIsDeleting(true); }, 2000); return () => clearTimeout(timeout); }
    }
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-2xl opacity-60"
              />
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={personal.avatar}
                alt={personal.name}
                className="w-80 h-80 rounded-full mx-auto mb-6 border-4 border-amber-500 shadow-2xl relative z-10 object-cover"
              />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="text-white">I'm</span>{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              {personal.name.split(" ")[0]} {personal.name.split(" ")[1]}
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-20 mb-6"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300">
              <span className="text-amber-400 font-semibold border-r-2 border-amber-400 pr-2">{typedText}</span>
            </p>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            {personal.bio}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold text-black shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 group"
            >
              Hire Me{" "}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 border-2 border-amber-500 rounded-full font-semibold text-amber-400 hover:bg-amber-500/10 transition-all"
            >
              Explore Work
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="text-3xl font-bold text-amber-400"
              >
                {personal.projects}
              </motion.div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring" }}
                className="text-3xl font-bold text-amber-400"
              >
                {personal.technologies}
              </motion.div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="text-3xl font-bold text-amber-400"
              >
                1
              </motion.div>
              <div className="text-sm text-gray-400">Certifications</div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <TiArrowSortedDown className="text-3xl text-amber-400" />
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { personal } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              I'm <span className="text-amber-400 font-semibold">{personal.name}</span>, a passionate {personal.title} from {personal.location}.
            </p>
            <p className="text-gray-400 leading-relaxed">{personal.bio}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <FaCheckCircle className="text-amber-400" />
                <span>{personal.projects} Projects Completed</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaCheckCircle className="text-amber-400" />
                <span>{personal.technologies}+ Technologies</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaCheckCircle className="text-amber-400" />
                <span>1 Certification</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaCheckCircle className="text-amber-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-8 rounded-2xl border border-amber-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <FaLaptopCode /> Developer Philosophy
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaHeart className="text-amber-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Passion for Code</h4>
                    <p className="text-gray-400 text-sm">Writing clean, maintainable, and scalable code is my priority.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUsers className="text-amber-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">User First</h4>
                    <p className="text-gray-400 text-sm">Creating intuitive interfaces that users love to interact with.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaRocket className="text-amber-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Continuous Growth</h4>
                    <p className="text-gray-400 text-sm">Always learning new technologies and best practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const { skills } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const getIcon = (iconName) => {
    const icons = {
      FaReact: <FaReact />, FaJs: <FaJs />, SiTypescript: <SiTypescript />, SiNextdotjs: <SiNextdotjs />,
      FaHtml5: <FaHtml5 />, SiTailwindcss: <SiTailwindcss />, FaNodeJs: <FaNodeJs />, SiExpress: <SiExpress />,
      SiMongodb: <SiMongodb />, FaDatabase: <FaDatabase />, SiFirebase: <SiFirebase />, FaServer: <FaServer />,
      FaGitAlt: <FaGitAlt />, FaFigma: <FaFigma />, SiVisualstudiocode: <VscCode />, SiPostgresql: <SiPostgresql />
    };
    return icons[iconName] || <FaCode />;
  };
  
  const categories = [
    { title: "Frontend Development", icon: <FaCode className="text-3xl text-amber-400" />, skills: skills.frontend },
    { title: "Backend & Database", icon: <FaServer className="text-3xl text-amber-400" />, skills: skills.backend },
    { title: "Tools & Workflow", icon: <FaGitAlt className="text-3xl text-amber-400" />, skills: skills.tools }
  ];
  
  return (
    <section id="skills" ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-6 w-full">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="w-full bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl p-6 border border-amber-500/20 backdrop-blur-sm hover:border-amber-500/40 transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="space-y-5 w-full">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="flex items-center gap-2 text-gray-300">
                        {getIcon(skill.icon)} {skill.name}
                      </span>
                      <span className="text-amber-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: skillIdx * 0.08 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="absolute inset-0 bg-white/20 skew-x-45"
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Expertise Section
const ExpertiseSection = () => {
  const { expertise } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const getIcon = (iconName) => {
    const icons = { FaReact: <FaReact />, SiNextdotjs: <SiNextdotjs />, SiTailwindcss: <SiTailwindcss />, FaNodeJs: <FaNodeJs />, SiMongodb: <SiMongodb />, SiTypescript: <SiTypescript /> };
    return icons[iconName] || <FaCode />;
  };
  
  return (
    <section id="expertise" ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Core Expertise
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {expertise.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-black/40 rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all overflow-hidden w-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${area.color} bg-opacity-10 mb-4`}>
                <div className="text-amber-400 text-4xl group-hover:scale-110 transition-transform">
                  {getIcon(area.icon)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{area.title}</h3>
              <p className="text-gray-400 text-sm">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:text-amber-400 transition-colors"><FaTimes /></button>
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          {showVideo && project.video ? (
            <iframe src={project.video} className="w-full h-full" title={project.title} allowFullScreen></iframe>
          ) : (
            <img src={project.demoImage || project.image} alt={project.title} className="w-full h-full object-cover" />
          )}
          {project.video && (
            <button onClick={() => setShowVideo(!showVideo)} className="absolute bottom-4 right-4 px-4 py-2 bg-amber-500 text-black rounded-full flex items-center gap-2 font-semibold hover:bg-amber-600 transition">
              {showVideo ? "Show Image" : <><FaPlay /> Watch Demo</>}
            </button>
          )}
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
            <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm">{project.category}</span>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">{project.fullDescription || project.description}</p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm"><FaCheckCircle className="text-amber-400 text-xs" />{feature}</div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (<span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">{tag}</span>))}
            </div>
          </div>
          <div className="flex gap-4 pt-4 border-t border-gray-800">
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-black font-semibold text-center hover:shadow-lg transition">Live Demo</a>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 border border-amber-500 rounded-lg text-amber-400 font-semibold text-center hover:bg-amber-500/10 transition">GitHub</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Projects Section
const ProjectsSection = ({ scrollToSection }) => {
  const { projects } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  if (!projects) return null;

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section id="projects" ref={ref} className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg" : "border border-amber-500/30 text-amber-400 hover:bg-amber-500/10"}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all w-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:text-amber-400 transition-colors"><FaExternalLinkAlt size={12} /></a>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:text-amber-400 transition-colors"><FaGithubAlt size={12} /></a>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-amber-500/20 rounded-full text-amber-400 text-xs font-semibold">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIdx) => (<span key={tagIdx} className="px-2 py-0.5 bg-amber-500/10 rounded-full text-amber-400 text-xs">{tag}</span>))}
                  </div>
                  <button onClick={() => setSelectedProject(project)} className="w-full py-2 border border-amber-500 rounded-lg text-amber-400 text-sm font-medium hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2">
                    <FaEye /> View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
};

// Journey Section
const JourneySection = () => {
  const { journey } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const getIcon = (iconName) => {
    const icons = { FaCode: <FaCode />, FaReact: <FaReact />, FaServer: <FaServer />, FaProjectDiagram: <FaProjectDiagram />, SiNextdotjs: <SiNextdotjs />, FaGithub: <FaGithub /> };
    return icons[iconName] || <FaStar />;
  };
  
  if (!journey) return null;
  
  return (
    <section id="journey" ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Development Journey
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-amber-500/50 via-amber-500 to-amber-500/50 hidden md:block" />
          <div className="space-y-8">
            {journey.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="md:w-1/2">
                  <div className={`bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all ${idx % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-amber-400 text-2xl">{getIcon(milestone.icon)}</div>
                      <span className="text-amber-400 font-bold text-lg">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center relative z-10 shadow-lg shadow-amber-500/50">
                  <FaStar className="text-black text-sm" />
                </div>
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Education Section
const EducationSection = () => {
  const { education } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  if (!education) return null;
  
  return (
    <section id="education" ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-8 border border-amber-500/30 backdrop-blur-sm hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4"><FaGraduationCap className="text-amber-400 text-3xl" /><h3 className="text-2xl font-bold text-white">{education.degree}</h3></div>
            <p className="text-amber-400 mb-2 flex items-center gap-2"><FaCalendarAlt /> {education.period}</p>
            <p className="text-gray-300 mb-4">{education.institution}</p>
            <p className="text-gray-400 leading-relaxed">{education.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{education.courses.map((course, idx) => (<span key={idx} className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 text-sm">{course}</span>))}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-8 border border-amber-500/30 backdrop-blur-sm hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4"><FaAward className="text-amber-400 text-3xl" /><h3 className="text-2xl font-bold text-white">Certifications</h3></div>
            <div className="space-y-4">
              {education.certifications.map((cert, idx) => (
                <div key={idx} className="border-b border-amber-500/20 pb-3 last:border-0">
                  {cert.image ? (
                    <motion.a whileHover={{ scale: 1.02 }} href={cert.certificateLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                      <img src={cert.image} alt={cert.name} className="w-12 h-12 rounded-lg object-cover bg-amber-500/20 p-1" />
                      <div><p className="text-white font-semibold group-hover:text-amber-400 transition-colors">{cert.name}</p><p className="text-gray-400 text-sm">{cert.issuer} - {cert.year}</p></div>
                      <FaExternalLinkAlt className="text-amber-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ) : (<div><p className="text-white font-semibold">{cert.name}</p><p className="text-gray-400 text-sm">{cert.issuer} - {cert.year}</p></div>)}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { contact } = useContext(DataContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formStatus, setFormStatus] = useState({ submitted: false, loading: false, error: false });

  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, submitted: false, error: false });

    const serviceId = "YOUR_SERVICE_ID";
    const templateId = "YOUR_TEMPLATE_ID";
    const publicKey = "YOUR_PUBLIC_KEY";

    const templateParams = {
      from_name: e.target.from_name.value,
      from_email: e.target.from_email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      to_email: "meh67719@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setFormStatus({ loading: false, submitted: true, error: false });
      setTimeout(() => setFormStatus({ submitted: false, loading: false }), 3000);
      e.target.reset();
    } catch (error) {
      setFormStatus({ loading: false, submitted: false, error: true });
      setTimeout(() => setFormStatus({ error: false }), 3000);
    }
  };

  if (!contact) return null;

  return (
    <section id="contact" ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-6 border border-amber-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300 hover:text-amber-400 transition-colors group">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform"><FaEnvelope /></div>
                  <a href="mailto:meh67719@gmail.com" className="group-hover:text-amber-400">meh67719@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 text-gray-300 hover:text-amber-400 transition-colors group">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform"><FaPhoneAlt /></div>
                  <a href="tel:+8801747737704" className="group-hover:text-amber-400">+880 1747737704</a>
                </div>
                <div className="flex items-center gap-4 text-gray-300 group">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400"><FaMapMarkerAlt /></div>
                  <span>Bangladesh</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300 hover:text-amber-400 transition-colors group">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform"><FaGlobe /></div>
                  <a href="http://www.mehedihassan.com" className="group-hover:text-amber-400">www.mehedihassan.com</a>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-6 border border-amber-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <motion.a whileHover={{ y: -3 }} href={contact.social?.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all text-xl"><FaGithub /></motion.a>
                <motion.a whileHover={{ y: -3 }} href={contact.social?.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all text-xl"><FaLinkedin /></motion.a>
                <motion.a whileHover={{ y: -3 }} href={contact.social?.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all text-xl"><FaFacebook /></motion.a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl p-6 border border-amber-500/30"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" name="from_name" placeholder="Your Name" required className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition text-white" />
              <input type="email" name="from_email" placeholder="Your Email" required className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition text-white" />
            </div>
            <input type="text" name="subject" placeholder="Subject" required className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition text-white" />
            <textarea name="message" rows="5" placeholder="Your Message" required className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition text-white resize-none"></textarea>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={formStatus.loading} className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50">
              {formStatus.loading ? (<><FaSpinner className="animate-spin" /> Sending...</>) : formStatus.submitted ? (<>✓ Message Sent! <FaCheckCircle /></>) : formStatus.error ? (<>✗ Failed to Send. Try Again!</>) : (<>Send Message <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></>)}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { personal } = useContext(DataContext);
  return (
    <footer className="py-8 text-center border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500">© 2026 {personal?.name}. Crafted with <span className="text-amber-400">✦</span> Premium Design</p>
        <p className="text-gray-600 text-sm mt-2">Building exceptional digital experiences</p>
      </div>
    </footer>
  );
};

export default App;