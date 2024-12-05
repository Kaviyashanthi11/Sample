import React, { 
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

// Custom hook to access authentication context
export const useAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize user state with data from local storage or default structure
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user:", storedUser); // Log for debugging
    return storedUser ? JSON.parse(storedUser) : { id: null, name: "", role: null };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user && user.role !== null);
  const sessionTimeout = useRef(null);
  const navigate = useNavigate();
const [practiceInfo, setPracticeInfo] = useState({ label: '', practiceCode: '' });

  const sessionDuration = 1200000; // 20 minutes

  // Logout function to clear user data
  const handleLogout = useCallback(() => {
    setUser({ id: null, name: "", role: null }); // Reset user to default structure
    setIsAuthenticated(false);
    localStorage.removeItem("user");

    if (sessionTimeout.current) {
      clearTimeout(sessionTimeout.current);
      sessionTimeout.current = null;
    }

    navigate("/");
    localStorage.setItem("logoutEvent", Date.now());
  }, [navigate]);

  // Function to start session timeout timer
  const startSessionTimer = useCallback(() => {
    if (sessionTimeout.current) {
      clearTimeout(sessionTimeout.current);
    }

    sessionTimeout.current = setTimeout(() => {
      handleLogout();
    }, sessionDuration);
  }, [handleLogout]);

  // Login function to set user data and start session
  const loginUser = useCallback((userData) => {
    console.log("Login user data:", userData); // Log for debugging
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    startSessionTimer();
  }, [startSessionTimer]);

  useEffect(() => {
    if (user && user.role !== null) {  // Check if user role exists
      setIsAuthenticated(true);
      startSessionTimer();
    } else {
      setIsAuthenticated(false);
      if (sessionTimeout.current) {
        clearTimeout(sessionTimeout.current);
        sessionTimeout.current = null;
      }
    }
  }, [user, startSessionTimer]);

  // Listen for logout events across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logoutEvent") {
        setUser({ id: null, name: "", role: null });
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  // Reset session timer on user activity
  useEffect(() => {
    const resetSessionTimer = () => {
      if (isAuthenticated) {
        startSessionTimer();
      }
    };

    window.addEventListener("mousemove", resetSessionTimer);
    window.addEventListener("keydown", resetSessionTimer);

    return () => {
      window.removeEventListener("mousemove", resetSessionTimer);
      window.removeEventListener("keydown", resetSessionTimer);
    };
  }, [isAuthenticated, startSessionTimer]);
  const updatePractice = (practiceInfo) => {
    console.log("Updating practiceInfo:", practiceInfo);
    setPracticeInfo(practiceInfo);
    sessionStorage.setItem('selectedPractice', JSON.stringify(practiceInfo));
  };
  

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userRole: user?.role,  // Provide userRole separately for easier access
        isAuthenticated,
        loginUser,
        logout: handleLogout,
        practiceInfo,
        updatePractice
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
