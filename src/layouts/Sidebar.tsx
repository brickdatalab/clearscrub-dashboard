import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Plug, 
  Key, 
  Settings,
  ChevronDown,
  CreditCard,
  Users,
  BarChart3,
  X
} from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'API Keys', href: '/api-keys', icon: Key },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const shortcuts = [
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Customers', href: '/customers', icon: Users },
]

const products = [
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [productsExpanded, setProductsExpanded] = useState(true)

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

        {/* Shortcuts Section */}
        <div className="mt-6">
          <div className="px-4 py-2">
            <h3 className="text-11 font-semibold text-gray-400 uppercase tracking-wide">
              Shortcuts
            </h3>
          </div>
          <div className="space-y-1 px-2">
            {shortcuts.map((item) => (
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
        </div>

        {/* Products Section */}
        <div className="mt-6">
          <div className="px-4 py-2">
            <h3 className="text-11 font-semibold text-gray-400 uppercase tracking-wide">
              Products
            </h3>
          </div>
          <div className="space-y-1 px-2">
            <button
              onClick={() => setProductsExpanded(!productsExpanded)}
              className="sidebar-item w-full justify-between"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </div>
              <ChevronDown 
                className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                  productsExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {productsExpanded && (
              <div className="ml-7 space-y-1">
                {products.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `sidebar-item text-13 ${isActive ? 'sidebar-item-active' : ''}`
                    }
                  >
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  )
}
