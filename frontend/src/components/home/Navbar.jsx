import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle.jsx";
import { LoggedinProvider, loggedinContext } from "../../contexts/LoggedinProvider.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { loggedin, setloggedin } = useContext(loggedinContext)

  const [userinfo, setUser] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL
      }/api/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);


  async function handleLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL
        }/api/logout`, {
        method: "POST",
        credentials: "include"
      })
      if (res.ok) setloggedin(false);

    } catch (err) {
      console.log("Error", err);
    }
  }
  return (
    <nav className="w-full fixed bg-[#bf6652] px-6 py-4 z-400 ">
      <div className="flex items-center justify-between">

        <div className="text-3xl font-bold">
          <Link to="/">Chime</Link>
        </div>

        
        <ul className="hidden md:flex gap-6 text-lg">
          <li>
            <ThemeToggle />
          </li>
          <li><Link to="/notes" className="underline-animate">Notes</Link></li>
          <li className="underline-animate"><Link to="/tree" onClick={() => setOpen(false)}>Tree</Link></li>
          <li><Link to="/calendar" className="underline-animate">Calendar</Link></li>
          {!loggedin &&
            (
              <>
                <li><Link to="/signup" className="underline-animate">Sign up</Link></li>
                <li><Link to="/login" className="underline-animate">Login</Link></li>

              </>)}
          {loggedin && (
            <>
              <li>
                <Link to="/profile">
                  <div title="Profile" className="relative h-10 w-10 rounded-full cursor-pointer p-1 shadow-[0_0_5px_rgba(255,255,255,0.6)] hover:opacity-70 transition-all overflow-hidden">
                    {userinfo ? (
                      <img
                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(
                          userinfo.data.user.name
                        )}`}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full w-full text-white font-semibold">
                        YOU
                      </span>
                    )}
                  </div>
                </Link>
              </li>

              <li>
                <button onClick={handleLogout} className="underline-animate">Logout</button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-lg bg-gray-100 p-4 rounded-lg">
          <li ><ThemeToggle /></li>
          <li className="underline-animate"><Link to="/notes" onClick={() => setOpen(false)}>Notes</Link></li>
          <li className="underline-animate"><Link to="/tree" onClick={() => setOpen(false)}>Tree</Link></li>
          <li className="underline-animate"><Link to="/calendar" onClick={() => setOpen(false)}>Calendar</Link></li>
          {!loggedin && (<><li className="underline-animate"><Link to="/signup" onClick={() => setOpen(false)}>Sign up</Link></li>
            <li className="underline-animate"><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li></>)
          }
          {loggedin && (
            <>
              <li ><Link to="/profile">
                <div title="Profile" className="relative h-10 w-10 rounded-full cursor-pointer p-1 shadow-[0_0_5px_rgba(255,255,255,0.6)] hover:opacity-70 transition-all overflow-hidden">
                  {userinfo ? (
                    <img
                      src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(
                        userinfo.data.user.name
                      )}`}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm">
                      YOU
                    </span>
                  )}
                </div>
              </Link></li>
              <li>
                <button onClick={handleLogout} className="underline-animate">Logout</button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
