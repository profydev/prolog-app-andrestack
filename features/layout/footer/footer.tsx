import React from "react";
import styles from "./footer.module.scss";
// import Image from "next/image";
import packageJson from "../../../package.json";

const footerLinks = [
  { text: "Docs", href: "#" },
  { text: "API", href: "#" },
  { text: "Help", href: "#" },
  { text: "Community", href: "#" },
];

const appVersion = packageJson.version;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.version}>Version {appVersion}</div>
      <ul className={styles.links}>
        {footerLinks.map((footerLink, index) => (
          <li key={index}>
            <a href={footerLink.href}>{footerLink.text}</a>
          </li>
        ))}
      </ul>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="icons/logo-small.svg"
          alt="Prolog Logo"
          width={23}
          height={33}
        />
      </div>
    </footer>
  );
}
