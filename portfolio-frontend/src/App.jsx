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

  // Fetch projects from backend
  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

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
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#leetcode">LeetCode</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="glitch" data-text="RAMITH KR">RAMITH KR</h1>
          <p className="typewriter">DSA | UI/UX Enthusiast | Problem Solver</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
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
            {projects.length > 0 ? (
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
              <p className="loading">Loading projects...</p>
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
                <span>TypeScript</span>
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
                <span>MongoDB</span>
                <span>PostgreSQL</span>
                <span>REST API</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-tags">
                <span>Git</span>
                <span>Docker</span>
                <span>AWS</span>
                <span>CI/CD</span>
                <span>Jest</span>
                <span>Webpack</span>
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

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Ramith KR. Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;