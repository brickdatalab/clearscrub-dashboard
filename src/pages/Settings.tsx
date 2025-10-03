import React, { useState, useEffect } from 'react'
import { 
  CreditCard,
  Webhook,
  Shield,
  Users,
  Lock,
  Zap,
  Check,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'

const settingsNavItems = [
  { id: 'plans', name: 'Plans', icon: Zap },
  { id: 'billing', name: 'Billing', icon: CreditCard },
  { id: 'webhooks', name: 'Webhooks', icon: Webhook },
  { id: 'restricted-submissions', name: 'Restricted Submissions', icon: Shield },
  { id: 'users', name: 'Users', icon: Users },
  { id: 'security', name: 'Security', icon: Lock },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('plans')

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = settingsNavItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex gap-8">
      {/* Settings Sub-Navigation */}
      <div className="w-64 flex-shrink-0">
        <div className="sticky top-8">
          <div className="card p-0">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-16 font-semibold text-gray-900">Settings</h2>
            </div>
            <nav className="p-2">
              {settingsNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-14 rounded-6 transition-colors duration-150 text-left ${
                    activeSection === item.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-24 lg:text-32 font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-14 text-gray-600">
            Manage your account settings, billing, security, and integrations.
          </p>
        </div>

        {/* Plans Section */}
        <section id="plans" className="scroll-mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-18 font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-600" />
                Plans
              </h2>
              <p className="text-14 text-gray-600 mt-1">Choose the plan that fits your needs</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Starter Plan */}
                <div className="border border-gray-200 rounded-8 p-6">
                  <div className="text-center">
                    <h3 className="text-16 font-semibold text-gray-900">Starter</h3>
                    <div className="mt-4">
                      <span className="text-32 font-bold text-gray-900">$29</span>
                      <span className="text-14 text-gray-600">/month</span>
                    </div>
                    <p className="text-13 text-gray-600 mt-2">Perfect for small businesses</p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Up to 100 submissions/month
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Basic API access
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Email support
                    </li>
                  </ul>
                  <button className="btn-secondary w-full mt-6">Current Plan</button>
                </div>

                {/* Professional Plan */}
                <div className="border-2 border-primary-600 rounded-8 p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-12 font-medium">
                      Recommended
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-16 font-semibold text-gray-900">Professional</h3>
                    <div className="mt-4">
                      <span className="text-32 font-bold text-gray-900">$99</span>
                      <span className="text-14 text-gray-600">/month</span>
                    </div>
                    <p className="text-13 text-gray-600 mt-2">For growing companies</p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Up to 1,000 submissions/month
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Full API access
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Webhooks
                    </li>
                  </ul>
                  <button className="btn-primary w-full mt-6">Upgrade</button>
                </div>

                {/* Enterprise Plan */}
                <div className="border border-gray-200 rounded-8 p-6">
                  <div className="text-center">
                    <h3 className="text-16 font-semibold text-gray-900">Enterprise</h3>
                    <div className="mt-4">
                      <span className="text-32 font-bold text-gray-900">Custom</span>
                    </div>
                    <p className="text-13 text-gray-600 mt-2">For large organizations</p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Unlimited submissions
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      Dedicated support
                    </li>
                    <li className="flex items-center gap-2 text-14">
                      <Check className="w-4 h-4 text-green-600" />
                      SLA guarantee
                    </li>
                  </ul>
                  <button className="btn-secondary w-full mt-6">Contact Sales</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Billing Section */}
        <section id="billing" className="scroll-mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-18 font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600" />
                Billing
              </h2>
              <p className="text-14 text-gray-600 mt-1">Manage your billing information and payment methods</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Current Plan */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">Current Plan</h3>
                <div className="bg-gray-50 rounded-8 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-14 font-medium text-gray-900">Starter Plan</p>
                      <p className="text-13 text-gray-600">$29/month • Next billing: Dec 15, 2024</p>
                    </div>
                    <button className="btn-secondary">Change Plan</button>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-16 font-semibold text-gray-900">Payment Methods</h3>
                  <button className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Payment Method
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-8 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-6 flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-14 font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-13 text-gray-600">Expires 12/2027 • Default</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">Billing History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="table-header text-left px-4 py-3">Date</th>
                        <th className="table-header text-left px-4 py-3">Description</th>
                        <th className="table-header text-left px-4 py-3">Amount</th>
                        <th className="table-header text-left px-4 py-3">Status</th>
                        <th className="table-header text-right px-4 py-3">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 table-cell">Nov 15, 2024</td>
                        <td className="px-4 py-3 table-cell">Starter Plan - Monthly</td>
                        <td className="px-4 py-3 table-cell">$29.00</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-primary-600 hover:text-primary-700 text-14">Download</button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 table-cell">Oct 15, 2024</td>
                        <td className="px-4 py-3 table-cell">Starter Plan - Monthly</td>
                        <td className="px-4 py-3 table-cell">$29.00</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-primary-600 hover:text-primary-700 text-14">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Webhooks Section */}
        <section id="webhooks" className="scroll-mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-18 font-semibold text-gray-900 flex items-center gap-2">
                <Webhook className="w-5 h-5 text-primary-600" />
                Webhooks
              </h2>
              <p className="text-14 text-gray-600 mt-1">Configure webhooks to receive real-time notifications</p>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-16 font-semibold text-gray-900">Webhook Endpoints</h3>
                  <p className="text-13 text-gray-600">Receive notifications when events occur</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Endpoint
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-8 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-14 font-medium text-gray-900">Production Webhook</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      <p className="text-13 text-gray-600 font-mono">https://api.yourcompany.com/webhooks/clearscrub</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-12 text-gray-500">Events: submission.completed, submission.failed</span>
                        <span className="text-12 text-gray-500">Last delivery: 2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-8 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-14 font-medium text-gray-900">Development Webhook</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      </div>
                      <p className="text-13 text-gray-600 font-mono">https://dev.yourcompany.com/webhooks/clearscrub</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-12 text-gray-500">Events: All events</span>
                        <span className="text-12 text-gray-500">Last delivery: Never</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restricted Submissions Section */}
        <section id="restricted-submissions" className="scroll-mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-18 font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                Restricted Submissions
              </h2>
              <p className="text-14 text-gray-600 mt-1">Control which submissions are allowed</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Domain Restrictions */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">Domain Restrictions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-8">
                    <div>
                      <p className="text-14 font-medium text-gray-900">Allow only specific domains</p>
                      <p className="text-13 text-gray-600">Only submissions from whitelisted domains will be processed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-13 font-medium text-gray-700 mb-2">
                      Allowed Domains
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="example.com"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
                        />
                        <button className="btn-primary">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-13">
                          yourcompany.com
                          <button className="text-primary-600 hover:text-primary-800">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-13">
                          partner.com
                          <button className="text-primary-600 hover:text-primary-800">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Type Restrictions */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">File Type Restrictions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-14 font-medium text-gray-900">Allowed File Types</h4>
                    {['PDF', 'CSV', 'Excel', 'Word'].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-600" />
                        <span className="text-14 text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-14 font-medium text-gray-900">File Size Limits</h4>
                    <div>
                      <label className="block text-13 text-gray-600 mb-1">Maximum file size (MB)</label>
                      <input
                        type="number"
                        defaultValue="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Users Section */}
        <section id="users" className="scroll-mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-18 font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                Users
              </h2>
              <p className="text-14 text-gray-600 mt-1">Manage team members and their permissions</p>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-16 font-semibold text-gray-900">Team Members</h3>
                  <p className="text-13 text-gray-600">2 of 5 seats used</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Invite User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="table-header text-left px-4 py-3">User</th>
                      <th className="table-header text-left px-4 py-3">Role</th>
                      <th className="table-header text-left px-4 py-3">Status</th>
                      <th className="table-header text-left px-4 py-3">Last Active</th>
                      <th className="table-header text-right px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-14 font-medium text-primary-700">JD</span>
                          </div>
                          <div>
                            <p className="text-14 font-medium text-gray-900">John Doe</p>
                            <p className="text-13 text-gray-600">john@yourcompany.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 table-cell">Owner</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 table-cell">2 hours ago</td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-14 font-medium text-blue-700">JS</span>
                          </div>
                          <div>
                            <p className="text-14 font-medium text-gray-900">Jane Smith</p>
                            <p className="text-13 text-gray-600">jane@yourcompany.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 table-cell">Admin</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 table-cell">1 day ago</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="scroll-mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-18 font-semibold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary-600" />
                Security
              </h2>
              <p className="text-14 text-gray-600 mt-1">Manage your account security settings</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Password */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-13 font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-13 font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-13 font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
                    />
                  </div>
                  <button className="btn-primary">Update Password</button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-8">
                  <div>
                    <p className="text-14 font-medium text-gray-900">Enable 2FA</p>
                    <p className="text-13 text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn-primary">Enable</button>
                </div>
              </div>

              {/* Session Management */}
              <div>
                <h3 className="text-16 font-semibold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-8">
                    <div>
                      <p className="text-14 font-medium text-gray-900">Current Session</p>
                      <p className="text-13 text-gray-600">Chrome on macOS • San Francisco, CA</p>
                      <p className="text-12 text-gray-500">Last active: Now</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Current
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-8">
                    <div>
                      <p className="text-14 font-medium text-gray-900">Mobile Session</p>
                      <p className="text-13 text-gray-600">Safari on iOS • San Francisco, CA</p>
                      <p className="text-12 text-gray-500">Last active: 2 hours ago</p>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-14">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
