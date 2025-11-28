import { useState } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import TransitionText from './components/sections/TransitionText';
import ParallaxGallery from './components/sections/ParallaxGallery';
import QuoteSection from './components/sections/QuoteSection';
import WorkSection from './components/sections/WorkSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import ProjectModal from './components/ui/ProjectModal';
import Lightbox from './components/ui/Lightbox';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <Layout>
      <Hero />
      <TransitionText />
      <ParallaxGallery />
      <QuoteSection />
      <WorkSection onOpenProject={setSelectedProject} />
      <AboutSection />
      <ContactSection />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLightbox={setLightboxSrc}
      />

      <Lightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />
    </Layout>
  );
}

export default App;
