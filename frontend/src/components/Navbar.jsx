import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-pink-500 shadow-md px-6 py-4">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold">
          MyApp
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Notes</li>
          <li className="hover:text-blue-600 cursor-pointer">Calendar</li>          
          <li className="hover:text-blue-600 cursor-pointer">Sign up</li>
          <li className="hover:text-blue-600 cursor-pointer">Login</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-lg bg-gray-100 p-4 rounded-lg">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Notes</li>
          <li className="hover:text-blue-600 cursor-pointer">Calendar</li>          
          <li className="hover:text-blue-600 cursor-pointer">Sign up</li>
          <li className="hover:text-blue-600 cursor-pointer">Login</li>
        </ul>
      )}
    </nav>
  );
}
