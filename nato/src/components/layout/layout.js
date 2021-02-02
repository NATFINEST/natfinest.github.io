import React from "react"
import BackToTop from "./BackToTop"
import Header from "./Header"
import "./layout.css"

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BackToTop />
    </>
  )
}

export default Layout
