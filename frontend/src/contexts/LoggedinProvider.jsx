import React, { createContext, useContext, useState, useEffect } from "react";

export const loggedinContext = createContext();

export function LoggedinProvider({ children }) {
  const [loggedin, setloggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL
}/api/me`,
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
