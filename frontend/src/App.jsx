import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import store from '@/store'
import { useAuth } from '@/hooks/useAuth'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Chat from '@/pages/Chat'
import Navbar from '@/components/Navbar'


import Pricing from '@/pages/Pricing'
import Refer from '@/pages/Refer'
import Services from '@/pages/Services'
import Help from '@/pages/Help'

import Settings from '@/pages/Settings'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}


// function AppRoutes() {
//   return (
//     <>
//       <Navbar /> 

      

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </>
//   )
// }


import { useLocation } from 'react-router-dom'

function AppRoutes() {
  const location = useLocation()

  const hideNavbarRoutes = ['/login', '/register']
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
         <Route path="/pricing" element={<Pricing />} />
      <Route path="/refer" element={<Refer />} />
      <Route path="/services" element={<Services />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />

      </Routes>
    </>
  )
}





export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  )
}






