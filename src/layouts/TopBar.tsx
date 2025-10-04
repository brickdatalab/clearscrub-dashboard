import React, { useState } from 'react'
import { Search, Bell, Settings, ChevronDown, Menu, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { user, signOut } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-60 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-5">
      {/* Left Section: Brand + Mobile Menu */}
      <div className="flex items-center gap-3 lg:w-220">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-6 transition-colors duration-150"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <img
            src="/assets/logos/logo-small.png"
            alt="ClearScrub"
            className="h-8 w-auto"
          />
          <span className="text-15 font-semibold text-gray-900 hidden sm:block">ClearScrub</span>
          <ChevronDown className="w-3 h-3 text-gray-500 hidden sm:block" />
        </div>
      </div>

      {/* Center Section: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-6 text-14 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600 focus:bg-white transition-all duration-200"
            placeholder="Search companies, transactions..."
          />
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-6 transition-colors duration-150">
          <Bell className="w-5 h-5" />
        </button>
        <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-6 transition-colors duration-150">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 bg-primary-600 text-white text-14 font-semibold rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-150"
            title={`${user?.name} - Click for options`}
          >
            {user?.name?.charAt(0) || 'D'}
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-8 shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  window.location.href = '/settings'
                }}
                className="w-full px-4 py-2 text-left text-14 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <hr className="my-1 border-gray-100" />
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  signOut()
                }}
                className="w-full px-4 py-2 text-left text-14 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
