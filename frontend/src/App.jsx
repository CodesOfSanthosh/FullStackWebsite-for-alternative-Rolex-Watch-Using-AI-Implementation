import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import WorldOfRolex from './pages/WorldOfRolex';
import Shop from './pages/Shop/Shop';
import WatchDetail from './pages/Shop/WatchDetail';
import Cart from './pages/Cart';
import AdminDashboard from './pages/Dashboard/Admin/AdminDashboard';
import OwnerDashboard from './pages/Dashboard/Owner/OwnerDashboard';
import CustomerDashboard from './pages/Dashboard/Customer/CustomerDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Or 403 page
  }
  return children;
};

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingBottom: '50px', flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/world-of-rolex" element={<WorldOfRolex />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/watch/:id" element={<WatchDetail />} />

            <Route path="/cart" element={
              <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN', 'OWNER']}>
                <Cart />
              </ProtectedRoute>
            } />

            {/* Dashboards */}
            <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/owner" element={
              <ProtectedRoute allowedRoles={['OWNER', 'ADMIN']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/customer" element={
              <ProtectedRoute allowedRoles={['CUSTOMER']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } />

            {/* Redirect unknown dashboard */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
