import React, { useState, useEffect } from 'react';
import {
  Code2,
  ShoppingBag,
  Layout,
  Terminal,
  Mail,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Send,
  Briefcase,
  User,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';

const SKILLS = [
  { name: 'Frontend Development', level: 90, category: 'Core', icon: Layout },
  { name: 'Shopify / Liquid', level: 85, category: 'Ecommerce', icon: ShoppingBag },
  { name: 'JavaScript (ES6+)', level: 85, category: 'Core', icon: Terminal },
  { name: 'React.js', level: 75, category: 'Core', icon: Code2 },
  { name: 'HTML5 / CSS3 / Tailwind', level: 95, category: 'Core', icon: Layers },
  { name: 'Git / GitHub', level: 80, category: 'Tools', icon: Cpu },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Custom Shopify Store Theme',
    category: 'Shopify',
    description: 'High-converting custom Shopify theme developed using Liquid, Tailwind CSS, and Vanilla JavaScript with dynamic cart drawer.',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67d517c5b3?auto=format&fit=crop&w=600&q=80',
    link: '#'
  },
  {
    id: 2,
    title: 'Tech Agency Responsive Landing Page',
    category: 'Frontend',
    description: 'Modern IT agency single-page web app built with React and Tailwind CSS featuring smooth scroll animations and responsive layout.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    link: '#'
  },
  {
    id: 3,
    title: 'Custom Shopify Liquid Product Sections',
    category: 'Shopify',
    description: 'Reusable and customizable Shopify schema sections including dynamic FAQ accordions, trust badges, and video banner blocks.',
    tags: ['Shopify', 'Liquid', 'JSON Schema'],
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=600&q=80',
    link: '#'
  },
  {
    id: 4,
    title: 'E-commerce React Product Configurator',
    category: 'Frontend',
    description: 'Interactive React application allowing users to filter, search, and customize product variations with live preview.',
    tags: ['React', 'State Management', 'CSS Grid'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    link: '#'
  }
];

const EXPERIENCES = [
  {
    role: 'Shopify & Frontend Developer',
    company: 'E-commerce Solutions Studio',
    period: '2023 - Present',
    description: 'Developing custom Shopify stores, building custom Liquid sections, optimizing page speed metrics, and crafting custom React components.'
  },
  {
    role: 'Junior Web Developer Intern',
    company: 'Digital Innovation Agency',
    period: '2022 - 2023',
    description: 'Converted Figma designs into pixel-perfect responsive HTML/CSS/JS web pages, maintained client repositories on GitHub, and fixed frontend bugs.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for sticky header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter project cards according to active tab
  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  // Handle Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">

      { }
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Dev<span className="text-amber-500">Portfolio</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-amber-400"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full mt-4 px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400"
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>

      { }
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Decorative Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Available for Projects
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">Frontend & Shopify</span> Developer
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
                I specialize in crafting high-converting Shopify stores, dynamicLiquid sections, and modern responsive web applications using React and Tailwind CSS.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  View My Work <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-sm hover:border-amber-500/50 hover:text-white transition-all"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Profile Avatar Frame */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-2xl relative z-10 rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-full rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center relative group">
                  <div className="text-6xl font-black text-amber-500/30">DEV</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <p className="text-white font-semibold">Web Specialist</p>
                      <p className="text-slate-400 text-xs">HTML • CSS • JS • Shopify</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-amber-500/20 -rotate-3 blur-sm -z-0" />
            </div>
          </div>
        </div>
      </section>

      { }
      <section id="about" className="py-20 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">About Me</h2>
            <p className="text-3xl font-bold text-white sm:text-4xl">Building modern, pixel-perfect e-commerce & web interfaces</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Shopify Customization</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Expert in building Shopify themes, Liquid templates, custom sections, and seamlessly connecting third-party apps for optimized conversion rates.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Responsive Frontend</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Proficient in modern JavaScript, React.js, and CSS frameworks (Tailwind, Bootstrap) to build lightning-fast web pages that adapt smoothly to every device screen.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Clean Code & Version Control</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Writing structured, reusable, and easy-to-maintain code while utilizing Git & GitHub for seamless workflow management and team collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      { }
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">Technical Skills</h2>
            <p className="text-3xl font-bold text-white sm:text-4xl">Tools & Technologies I work with</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SKILLS.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <div key={skill.name} className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-amber-500/10 text-amber-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                    </div>
                    <span className="text-sm font-bold text-amber-400">{skill.level}%</span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      { }
      <section id="projects" className="py-20 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">Portfolio Showcase</h2>
              <p className="text-3xl font-bold text-white sm:text-4xl">Featured Projects</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mt-6 md:mt-0 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
              {['All', 'Shopify', 'Frontend'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${activeFilter === filter
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group hover:border-amber-500/50 transition-all flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold border border-amber-500/20">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Live Preview <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      { }
      <section id="experience" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">History</h2>
            <p className="text-3xl font-bold text-white sm:text-4xl">Work Experience</p>
          </div>

          <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <div key={index} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 group-hover:bg-amber-500 transition-colors" />

                {/* Period Badge */}
                <span className="md:absolute md:-left-36 md:top-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-2 md:mb-0">
                  {exp.period}
                </span>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all">
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="text-slate-400 text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      { }
      <section id="contact" className="py-20 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">Contact</h2>
              <p className="text-3xl font-bold text-white sm:text-4xl mb-6">Let's discuss your next project</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Whether you need a custom Shopify theme build, Liquid modifications, or a responsive website, feel free to reach out. I am open to freelance work and full-time opportunities.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Email Me</p>
                    <a href="mailto:developer@example.com" className="font-medium hover:text-amber-400 transition-colors">
                      developer@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg className="w-5 h-5 fill-current text-amber-400" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">LinkedIn</p>
                    <a href="#" className="font-medium hover:text-amber-400 transition-colors">
                      linkedin.com/in/developer
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg className="w-5 h-5 fill-current text-amber-400" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">GitHub</p>
                    <a href="#" className="font-medium hover:text-amber-400 transition-colors">
                      github.com/developer
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
              {formSubmitted && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! Your message has been received. I'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe your project..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      { }
      <footer className="py-8 border-t border-slate-800/80 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} DevPortfolio. Built with React.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}