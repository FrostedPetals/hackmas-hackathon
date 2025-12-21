import React, { createContext, useContext, useState, useEffect } from "react";

/*export const loggedinContext = createContext();

export function LoggedinProvider({ children }) {
  const [loggedin, setloggedin] = useState(false);
  useEffect(() => {
  const checkLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/me",
        { credentials: "include" }
      );
      const res = await response.json();
      setloggedin(res.data.loggedIn === true);
    } catch (err) {
      console.error("Auth check failed:", err);
      setloggedin(false);
    }
  };

  checkLogin();
}, []);

  return (
    <loggedinContext.Provider value={{ loggedin, setloggedin }}>
      {children}
    </loggedinContext.Provider>
  );
}*/

export const loggedinContext = createContext();

export function LoggedinProvider({ children }) {
  const [loggedin, setloggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/me",
          { credentials: "include" }
        );

        setloggedin(response.ok);
      } catch {
        setloggedin(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <loggedinContext.Provider value={{ loggedin, setloggedin, loading }}>
      {children}
    </loggedinContext.Provider>
  );
}
