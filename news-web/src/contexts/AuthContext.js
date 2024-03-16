import { createContext, useContext } from "react";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the entire application with the authentication context
export const AuthProvider = ({ children }) => {
  // Your authentication logic here, you may need to replace the sample implementation below with your actual authentication logic
  const auth = {
    currentUser: {
      uid: "sampleUid", // Sample UID, replace it with the actual UID or null if user is not logged in
    },
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
