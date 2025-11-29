import { useState } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import TransitionText from './components/sections/TransitionText';
import ParallaxGallery from './components/sections/ParallaxGallery';
import QuoteSection from './components/sections/QuoteSection';
import WorkSection from './components/sections/WorkSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import Lightbox from './components/ui/Lightbox';
import './App.css';

function App() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <Layout>
      <Hero />
      <TransitionText />
      <ParallaxGallery />
      <QuoteSection />
      <WorkSection onImageClick={setLightboxSrc} />
      <AboutSection />
      <ContactSection />

      <Lightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />
    </Layout>
  );
}

export default App;
