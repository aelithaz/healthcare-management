// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 border-b shadow-lg bg-white z-50">
      <h1 className="text-xl font-bold">HealthLink</h1>
      <div className="space-x-4">
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/testing">
          <Button variant="ghost">Testing</Button>
        </Link>
      </div>
    </nav>
  );
}