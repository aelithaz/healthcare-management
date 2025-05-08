import React, { createContext, useContext, useState } from 'react';

const users = [
  { username: 'patient', password: 'patient123', role: 'patient' },
  { username: 'doctor', password: 'doctor123', role: 'doctor' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ username: found.username, role: found.role });
      return { success: true, role: found.role };
    }
    return { success: false };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 