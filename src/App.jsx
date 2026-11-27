import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import BeyondCode from './components/BeyondCode';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="bg-dark-900 text-text-primary font-sans overflow-x-clip transition-colors duration-300">
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Achievements />
            <Certifications />
            <BeyondCode />
            <Contact />
          </main>
          <Footer />
          <ResumeModal />
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
