import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  // Используем переданное состояние вместо прямого чтения localStorage
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;