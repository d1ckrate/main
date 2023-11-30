import React, { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET
      );

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        setUser(decodedToken);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
