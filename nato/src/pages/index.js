import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import HeroSection from "../components/sections/HeroSection"
import AboutSection from "../components/sections/AboutSection"
import ServicesSection from "../components/sections/ServicesSection"

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroSection id="Home" />
      <AboutSection id="About" />
      <ServicesSection id="Services" />
    </Layout>
  )
}

export default IndexPage
