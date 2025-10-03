import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './layouts/AppShell'
import Login from './pages/Login'
import Companies from './pages/Companies'
import CompanyDetail from './pages/CompanyDetail'
import ApiKeys from './pages/ApiKeys'
import Settings from './pages/Settings'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/companies" replace />} />
            <Route path="dashboard" element={<Navigate to="/companies" replace />} />
            <Route path="companies" element={<Companies />} />
            <Route path="companies/:companyId" element={<CompanyDetail />} />
            <Route path="integrations" element={<div className="p-8"><h1 className="text-2xl font-bold">Integrations</h1><p>Coming soon...</p></div>} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="notifications" element={<div className="p-8"><h1 className="text-2xl font-bold">Notifications</h1><p>Coming soon...</p></div>} />
            <Route path="billing" element={<div className="p-8"><h1 className="text-2xl font-bold">Billing</h1><p>Coming soon...</p></div>} />
            <Route path="settings" element={<Settings />} />
            <Route path="api-docs" element={<div className="p-8"><h1 className="text-2xl font-bold">API Documentation</h1><p>Coming soon...</p></div>} />
            <Route path="payments" element={<div className="p-8"><h1 className="text-2xl font-bold">Payments</h1><p>Coming soon...</p></div>} />
            <Route path="customers" element={<div className="p-8"><h1 className="text-2xl font-bold">Customers</h1><p>Coming soon...</p></div>} />
            <Route path="analytics" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics</h1><p>Coming soon...</p></div>} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/companies" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
