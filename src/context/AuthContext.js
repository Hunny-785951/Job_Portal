import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from local storage on mount
    const storedUser = localStorage.getItem('recruit_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic with local storage users
    const usersStr = localStorage.getItem('recruit_users');
    let users = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('recruit_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (name, email, password, role) => {
    // Mock register logic
    const usersStr = localStorage.getItem('recruit_users');
    let users = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }

    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role // 'employer' or 'applicant'
    };

    users.push(newUser);
    localStorage.setItem('recruit_users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('recruit_user', JSON.stringify(userWithoutPassword));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('recruit_user');
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };

    // Update current user
    const newUser = { ...currentUser, ...updatedData };
    setCurrentUser(newUser);
    localStorage.setItem('recruit_user', JSON.stringify(newUser));

    // Update in users array
    const usersStr = localStorage.getItem('recruit_users');
    if (usersStr) {
      let users = JSON.parse(usersStr);
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem('recruit_users', JSON.stringify(users));
      }
    }

    return { success: true };
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
