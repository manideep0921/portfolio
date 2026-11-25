import { isResumeAvailable } from "@/lib/resume";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Architecture } from "@/components/sections/Architecture";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const resumeAvailable = isResumeAvailable();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <Navbar resumeAvailable={resumeAvailable} />
      <main id="main">
        <Hero resumeAvailable={resumeAvailable} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Architecture />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
