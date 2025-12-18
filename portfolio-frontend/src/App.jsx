import React, { useState, useEffect } from 'react';
import './App.css';
import LeetCodeStats from './LeetCodeStats';

// API URL configuration for deployment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Show/hide back-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    // Use setTimeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      const sections = document.querySelectorAll('section');
      sections.forEach(section => observer.unobserve(section));
    };
  }, [projects]);

  // Fetch projects from backend
  useEffect(() => {
    setProjectsLoading(true);
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
        .then(data => {
        setProjects(data);
        setProjectsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setProjectsLoading(false);
      });
  }, []);

  // Back to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  // Submit contact form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="bg-particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo">&lt;Portfolio/&gt;</div>
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
        <nav className={mobileMenuOpen ? 'nav-open' : ''}>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
          <a href="#leetcode" onClick={(e) => handleSmoothScroll(e, '#leetcode')}>LeetCode</a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a>
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="glitch" data-text="RAMITH KR">RAMITH KR</h1>
          <p className="typewriter">DSA | UI/UX Enthusiast | Problem Solver</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary" onClick={(e) => handleSmoothScroll(e, '#projects')}>View My Work</a>
            <a href="#contact" className="btn-secondary" onClick={(e) => handleSmoothScroll(e, '#contact')}>Get In Touch</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a curious and self-driven developer who enjoys learning by building.
                 I love working with AI, computer vision, and modern web technologies, and 
                 I'm always exploring how things work under the hood. 
                 Turning ideas into simple, functional projects is what keeps me motivated.
              </p>
              <p>
                When I'm not coding, I like experimenting with new tools, improving my personal projects, 
                and discovering better ways to solve problems. 
                I enjoy staying active in the tech space and continuously growing as a developer.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* LeetCode Section */}
      <section id="leetcode" className="leetcode-section">
        <div className="container">
          <h2 className="section-title">Coding Profile</h2>
          <LeetCodeStats />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projectsLoading ? (
              <div className="loading-container">
                <div className="loading-spinner-projects">
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                </div>
                <p className="loading-text">Loading projects...</p>
              </div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    </div>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="loading">No projects found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-tags">
                <span>React</span>
                <span>JavaScript</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>Tailwind</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-tags">
                <span>Node.js</span>
                <span>Express</span>
                <span>Python</span>
                <span>REST API</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-tags">
                <span>Git</span>
                <span>Docker</span>
                <span>AWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={contactForm.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={submitStatus === 'sending'}>
              {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="success-message">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="error-message">Failed to send message. Please try again.</p>
            )}
          </form>
          <div className="social-links">
            <a href="https://github.com/ramith407" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ramith-kr-3984b7342" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/ramith_naik99" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Ramith KR. Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;