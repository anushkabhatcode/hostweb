import { Navigate, useLocation } from 'react-router-dom';
import UserContext from './UserContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation(); // keep track of where user is coming from

  if (!user) { // If not authenticated redirect to login and pass the current location in state
    
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  //Render the children if the user is authenticated
  return children;
};

export default ProtectedRoute;
