import React from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/layout/seo";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import ContactSection from "../components/sections/ContactSection";

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroSection id="Home" />
      <AboutSection id="About" />
      <ServicesSection id="Services" />
      <PortfolioSection id="Portfolio" />
      {/* <ContactSection id="Hire Me" /> */}
    </Layout>
  );
}

export default IndexPage;
