import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Top Navigation */}
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Layout Grid - Responsive */}
      <div className="lg:grid lg:grid-cols-layout lg:grid-rows-layout h-screen">
        {/* Fixed Left Sidebar - Hidden on mobile, overlay on tablet */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content Area */}
        <main className="lg:col-start-2 lg:row-start-2 overflow-auto bg-white pt-60 lg:pt-0">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
