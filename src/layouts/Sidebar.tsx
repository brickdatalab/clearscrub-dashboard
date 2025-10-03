import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Building2, 
  Plug, 
  Key, 
  Settings,
  X
} from 'lucide-react'

const navigationItems = [
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'API Keys', href: '/api-keys', icon: Key },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}
export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {

  return (
    <aside className={`fixed top-60 lg:top-60 left-0 bottom-0 w-220 bg-gray-50 border-r border-gray-200 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-6 transition-colors duration-150"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="py-4">
        {/* Main Navigation */}
        <div className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  )
}
