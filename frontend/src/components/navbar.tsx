// src/components/Navbar.tsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, User, Home as HomeIcon } from "lucide-react";


export default function Navbar() {
  const location = useLocation();
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
    <nav className="navbar">
      <div className="navbar-title">MedPortal</div>
      <div className="navbar-links">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `navlink ${isActive ? "navlink-active" : "navlink-inactive"}`
            }
          >
            <Button variant="ghost" asChild className="button-reset">
              <span className="flex items-center">
                {link.icon}
                <span>{link.label}</span>
              </span>
            </Button>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}