import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

    const { token } = useAuth();
  
    if(token) {
      return <Navigate to="/home" replace />
    }
  
    return children
  }
  
  export default PublicRoute