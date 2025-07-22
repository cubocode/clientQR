import React from "react";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer
      style={{
        width: "100%",
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        padding: "8px 0 4px 0",
        position: "fixed",
        left: 0,
        bottom: 0,
        zIndex: 10,
        boxShadow: "0 -2px 8px 0 rgba(0,0,0,0.08)",
        letterSpacing: 1,
        opacity: 0.92
      }}
    >
      <span>
        Copyright © {year} &nbsp;
        <span style={{ color: "#00bfff", fontWeight: 600 }}>
          Desarrollado por <a href="https://www.instagram.com/cubo.code/" style={{ color: "#00bfff", textDecoration: "none" }}>Cubo</a>
        </span>
      </span>
    </footer>
  );
}

export default Footer;
