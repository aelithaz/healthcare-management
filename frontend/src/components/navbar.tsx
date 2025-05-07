// src/components/Navbar.tsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, User, Home as HomeIcon } from "lucide-react";
import styles from '../css/Navbar.module.css';

export default function Navbar() {
  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <HomeIcon className="w-5 h-5 mr-1" />,
      exact: true,
    },
    {
      to: "/records",
      label: "Records",
      icon: <FileText className="w-5 h-5 mr-1" />,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 mr-1" />,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>MedPortal</div>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : styles.linkInactive}`
            }
          >
            <span className={styles.linkContent}>
              {link.icon}
              <span>{link.label}</span>
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}