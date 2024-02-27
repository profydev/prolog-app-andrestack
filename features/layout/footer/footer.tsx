import React from "react";
import styles from "./footer.module.scss";
import Image from "next/image";

const footerLinks = [
  { text: "Docs", href: "#" },
  { text: "API", href: "#" },
  { text: "Help", href: "#" },
  { text: "Community", href: "#" },
];

export function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className={styles.footerText}>Version 14.5.1</div>
        <ul className={styles.linksList}>
          {footerLinks.map((footerLink, index) => (
            <li key={index}>
              <a href={footerLink.href}>{footerLink.text}</a>
            </li>
          ))}
          <div className={styles.footerLogo}></div>
        </ul>
        <Image
          src="icons/logo-small.svg"
          alt="Prolog Logo"
          width={23}
          height={33}
        />
      </div>
    </footer>
  );
}
