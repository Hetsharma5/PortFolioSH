import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { CyberLab } from "@/components/sections/CyberLab";
import { Education } from "@/components/sections/Education";
import { EvidenceLocker } from "@/components/sections/EvidenceLocker";
import { Experience } from "@/components/sections/Experience";
import { Gaming } from "@/components/sections/Gaming";
import { Hero } from "@/components/sections/Hero";
import { InvestigatorsNotebook } from "@/components/sections/InvestigatorsNotebook";
import { Toolkit } from "@/components/sections/Toolkit";
import { CustomCursor } from "@/components/system/CustomCursor";
import { EasterEggs } from "@/components/system/EasterEggs";
import { IntroLoader } from "@/components/system/IntroLoader";

export default function App() {
  return (
    <>
      <IntroLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Toolkit />
        <EvidenceLocker />
        <Experience />
        <Education />
        <CyberLab />
        <InvestigatorsNotebook />
        <Gaming />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <EasterEggs />
      <CustomCursor />
    </>
  );
}
