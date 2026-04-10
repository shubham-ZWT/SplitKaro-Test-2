import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "Dashboard", link: "/" },
    { name: "Add Expense", link: "/add-expense" },
    { name: "All Expenses", link: "/expenses" },
    { name: "Settle Up", link: "/settle" },
  ];
  return (
    <div className="bg-gray-900 text-white py-4 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to={"/"}>Split Karo</Link>
          </h1>

          <div className="flex flex-row gap-5">
            {navLinks.map((l) => (
              <Link key={l.name} className="" to={l.link}>
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
