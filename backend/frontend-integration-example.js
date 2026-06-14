/**
 * FRONTEND INTEGRATION EXAMPLE (React)
 * =====================================
 * 
 * This shows how to integrate the Google OAuth + JWT backend with a React frontend.
 */

// 1. Install Google Sign-In for web
// npm install @react-oauth/google

// 2. Wrap your app with GoogleOAuthProvider
/*
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <YourComponents />
    </GoogleOAuthProvider>
  );
}
*/

// 3. Google Login Component
/*
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store JWT token
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Google login failed');
    alert('Google login failed');
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </div>
  );
}
*/

// 4. API Helper with JWT
/*
const API_BASE = 'http://localhost:5000/api';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// Usage examples:

// Get current user
const user = await apiRequest('/auth/me');

// Get profile
const profile = await apiRequest('/profile');

// Update profile
const updated = await apiRequest('/profile', {
  method: 'PUT',
  body: JSON.stringify({ name: 'New Name' })
});

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
*/

// 5. Protected Route Component
/*
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage in router:
// <Route path="/dashboard" element={
//   <ProtectedRoute>
//     <Dashboard />
//   </ProtectedRoute>
// } />
*/

// 6. Auto-refresh token before expiry (optional)
/*
// Check token expiry and refresh if needed
function checkTokenExpiry() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const expiry = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeLeft = expiry - now;

    // Refresh if less than 1 day left
    if (timeLeft < 24 * 60 * 60 * 1000 && timeLeft > 0) {
      console.log('Token expiring soon, consider refreshing');
      // Implement token refresh logic here
    }

    // Token expired
    if (timeLeft <= 0) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
  }
}

// Check on app load
checkTokenExpiry();
*/

export default {};
