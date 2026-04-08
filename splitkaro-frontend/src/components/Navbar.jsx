import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "Dashboard", link: "/" },
    { name: "Add Expense", link: "/add-expenses" },
    { name: "All Expenses", link: "/expenses" },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row justify-between items-center">
        <h1>Split Karo</h1>

        <div className="flex flex-row gap-3">
          {navLinks.map((l) => (
            <Link to={l.link}>{l.name}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
