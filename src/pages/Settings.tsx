import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  BarChart3, 
  Shield, 
  CreditCard,
  Edit,
  Plus,
  Download,
  ChevronDown,
  Check,
  X
} from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get active tab from URL or default to organization
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/settings/quota')) return 'quota';
    if (path.includes('/settings/suppressions')) return 'suppressions';
    if (path.includes('/settings/billing')) return 'billing';
    return 'organization';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [activeBillingSection, setActiveBillingSection] = useState('pricing');
  
  // State suppressions
  const [stateSuppressions, setStateSuppressions] = useState(['California', 'New York']);
  const [newState, setNewState] = useState('');
  
  // Industry suppressions
  const [industrySuppressions, setIndustrySuppressions] = useState(['Healthcare', 'Cannabis']);
  const [newIndustry, setNewIndustry] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/settings/${tab === 'organization' ? '' : tab}`);
  };

  const addStateSuppression = () => {
    if (newState.trim() && !stateSuppressions.includes(newState.trim())) {
      setStateSuppressions([...stateSuppressions, newState.trim()]);
      setNewState('');
    }
  };

  const removeStateSuppression = (state: string) => {
    setStateSuppressions(stateSuppressions.filter(s => s !== state));
  };

  const addIndustrySuppression = () => {
    if (newIndustry.trim() && !industrySuppressions.includes(newIndustry.trim())) {
      setIndustrySuppressions([...industrySuppressions, newIndustry.trim()]);
      setNewIndustry('');
    }
  };

  const removeIndustrySuppression = (industry: string) => {
    setIndustrySuppressions(industrySuppressions.filter(i => i !== industry));
  };

  const renderOrganizationTab = () => (
    <div className="space-y-8">
      {/* Company Information */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-24 font-bold text-gray-900">Organization Information</h2>
            <p className="text-14 text-gray-600 mt-1">Manage your organization details and settings</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-14 font-medium text-gray-700 hover:text-gray-900">
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-13 font-medium text-gray-700 mb-2">Organization ID</label>
            <div className="flex items-center gap-2">
              <span className="text-14 text-gray-900 font-mono">cs_org_1234567890abcdef</span>
              <button className="text-primary-600 hover:text-primary-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-13 font-medium text-gray-700 mb-2">Organization Name</label>
            <span className="text-14 text-gray-900">ClearScrub</span>
          </div>
        </div>
      </section>

      {/* Metadata */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-16 font-semibold text-gray-900">Metadata</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { key: 'Industry', value: 'Financial Services' },
            { key: 'Company Size', value: '50-100 employees' },
            { key: 'Region', value: 'North America' }
          ].map((item) => (
            <div key={item.key} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-13 text-gray-600">{item.key}</span>
              <span className="text-14 text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Members */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-16 font-semibold text-gray-900">Team Members</h3>
            <p className="text-13 text-gray-600">2 of 5 seats used</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-14 font-medium rounded-6 hover:bg-primary-700">
            <Plus className="w-4 h-4" />
            Invite User
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">User</th>
                <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Role</th>
                <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Last Active</th>
                <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', email: 'john@yourcompany.com', role: 'Owner', status: 'Active', lastActive: '2 hours ago', initials: 'JD' },
                { name: 'Jane Smith', email: 'jane@yourcompany.com', role: 'Admin', status: 'Active', lastActive: '1 day ago', initials: 'JS' }
              ].map((user) => (
                <tr key={user.email} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-12 font-medium">
                        {user.initials}
                      </div>
                      <div>
                        <div className="text-14 font-medium text-gray-900">{user.name}</div>
                        <div className="text-13 text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-14 text-gray-900">{user.role}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-4 text-12 font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-14 text-gray-600">{user.lastActive}</td>
                  <td className="py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderQuotaTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-24 font-bold text-gray-900 mb-2">Quota Management</h2>
        <p className="text-14 text-gray-600">View usage analytics and manage processing limits</p>
      </div>

      {/* Usage Overview */}
      <section>
        <h3 className="text-16 font-semibold text-gray-900 mb-4">Current Usage</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-8 p-6">
            <div className="text-13 text-gray-600 mb-1">PDFs Processed</div>
            <div className="text-24 font-bold text-gray-900">1,247</div>
            <div className="text-12 text-gray-500">This month</div>
          </div>
          <div className="bg-gray-50 rounded-8 p-6">
            <div className="text-13 text-gray-600 mb-1">API Calls</div>
            <div className="text-24 font-bold text-gray-900">8,932</div>
            <div className="text-12 text-gray-500">This month</div>
          </div>
          <div className="bg-gray-50 rounded-8 p-6">
            <div className="text-13 text-gray-600 mb-1">Storage Used</div>
            <div className="text-24 font-bold text-gray-900">2.4 GB</div>
            <div className="text-12 text-gray-500">of 10 GB</div>
          </div>
        </div>
      </section>

      {/* Usage Limits */}
      <section>
        <h3 className="text-16 font-semibold text-gray-900 mb-4">Usage Limits</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-14 text-gray-900">Monthly PDF Processing Limit</span>
            <span className="text-14 font-medium text-gray-900">Unlimited</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-14 text-gray-900">API Rate Limit</span>
            <span className="text-14 font-medium text-gray-900">1000 requests/hour</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-14 text-gray-900">Storage Limit</span>
            <span className="text-14 font-medium text-gray-900">10 GB</span>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSuppressionsTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-24 font-bold text-gray-900 mb-2">Suppressions</h2>
        <p className="text-14 text-gray-600">Control which submissions are excluded from processing</p>
      </div>

      {/* State Suppressions */}
      <section>
        <h3 className="text-16 font-semibold text-gray-900 mb-4">State Suppressions</h3>
        <p className="text-13 text-gray-600 mb-4">Exclude specific states from processing</p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="e.g., California, Texas"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
            onKeyPress={(e) => e.key === 'Enter' && addStateSuppression()}
          />
          <button
            onClick={addStateSuppression}
            className="px-4 py-2 bg-primary-600 text-white text-14 font-medium rounded-6 hover:bg-primary-700"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {stateSuppressions.map((state) => (
            <span
              key={state}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-13 font-medium rounded-full"
            >
              {state}
              <button
                onClick={() => removeStateSuppression(state)}
                className="text-primary-600 hover:text-primary-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </section>

      {/* Industry Suppressions */}
      <section>
        <h3 className="text-16 font-semibold text-gray-900 mb-4">Industry Suppressions</h3>
        <p className="text-13 text-gray-600 mb-4">Exclude specific industries from processing</p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            placeholder="e.g., Healthcare, Finance"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
            onKeyPress={(e) => e.key === 'Enter' && addIndustrySuppression()}
          />
          <button
            onClick={addIndustrySuppression}
            className="px-4 py-2 bg-primary-600 text-white text-14 font-medium rounded-6 hover:bg-primary-700"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {industrySuppressions.map((industry) => (
            <span
              key={industry}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-13 font-medium rounded-full"
            >
              {industry}
              <button
                onClick={() => removeIndustrySuppression(industry)}
                className="text-primary-600 hover:text-primary-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );

  const renderBillingTab = () => (
    <div className="flex gap-8">
      {/* Left Sidebar for Billing */}
      <div className="w-48 flex-shrink-0">
        <nav className="space-y-1">
          {[
            { id: 'pricing', label: 'Pricing', icon: CreditCard },
            { id: 'usage', label: 'Usage', icon: BarChart3 },
            { id: 'invoices', label: 'Invoices', icon: Download }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveBillingSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-14 font-medium rounded-6 text-left ${
                activeBillingSection === item.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Billing Content */}
      <div className="flex-1">
        {activeBillingSection === 'pricing' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-24 font-bold text-gray-900">Pricing</h2>
                <p className="text-14 text-gray-600">Manage your subscription and billing</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-14 font-medium rounded-6 hover:bg-gray-50">
                Manage Payment Method
              </button>
            </div>

            {/* Current Plan */}
            <section>
              <div className="bg-gray-50 rounded-8 p-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-16 font-semibold text-gray-900">Pay as you go</h3>
                    <p className="text-13 text-gray-600">Active • Next billing: Dec 15, 2024</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-4 text-12 font-medium bg-green-100 text-green-800">
                    Current Plan
                  </span>
                </div>
              </div>
            </section>

            {/* Plans */}
            <section>
              <h3 className="text-16 font-semibold text-gray-900 mb-6">Choose the plan that fits your needs</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Pay as you go */}
                <div className="border border-primary-200 rounded-8 p-6 bg-primary-50">
                  <div className="mb-4">
                    <h4 className="text-16 font-semibold text-gray-900">Pay as you go</h4>
                    <div className="mt-2">
                      <span className="text-32 font-bold text-gray-900">$0.50</span>
                      <span className="text-14 text-gray-600">/PDF</span>
                    </div>
                    <p className="text-13 text-gray-600 mt-1">File-based pricing, not page-based</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Flat $0.50 per PDF
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      API access
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Email support
                    </li>
                  </ul>
                  <button className="w-full py-2 bg-primary-600 text-white text-14 font-medium rounded-6 hover:bg-primary-700">
                    Current Plan
                  </button>
                </div>

                {/* Professional */}
                <div className="border border-gray-200 rounded-8 p-6">
                  <div className="mb-4">
                    <h4 className="text-16 font-semibold text-gray-900">Professional</h4>
                    <div className="mt-2">
                      <span className="text-32 font-bold text-gray-900">$99</span>
                      <span className="text-14 text-gray-600">/month</span>
                    </div>
                    <p className="text-13 text-gray-600 mt-1">For growing companies</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Up to 1,000 submissions/month
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Full API access
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Webhooks
                    </li>
                  </ul>
                  <button className="w-full py-2 border border-gray-300 text-14 font-medium rounded-6 hover:bg-gray-50">
                    Upgrade
                  </button>
                </div>

                {/* Enterprise */}
                <div className="border border-gray-200 rounded-8 p-6">
                  <div className="mb-4">
                    <h4 className="text-16 font-semibold text-gray-900">Enterprise</h4>
                    <div className="mt-2">
                      <span className="text-32 font-bold text-gray-900">Custom</span>
                    </div>
                    <p className="text-13 text-gray-600 mt-1">For large organizations</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Unlimited submissions
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Dedicated support
                    </li>
                    <li className="flex items-center gap-2 text-13 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      SLA guarantee
                    </li>
                  </ul>
                  <button className="w-full py-2 border border-gray-300 text-14 font-medium rounded-6 hover:bg-gray-50">
                    Contact Sales
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeBillingSection === 'usage' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-24 font-bold text-gray-900">Usage</h2>
              <p className="text-14 text-gray-600">Track your PDF processing and API usage</p>
            </div>

            {/* Usage Bar */}
            <section>
              <div className="bg-gray-50 rounded-8 p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-13 text-gray-600">Included credits</span>
                  <span className="text-13 text-gray-600">1,247 / ∞ per month</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </section>

            {/* Recent Usage Charts */}
            <section>
              <h3 className="text-16 font-semibold text-gray-900 mb-4">Your recent usage</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-8 p-6">
                  <h4 className="text-14 font-medium text-gray-900 mb-4">PDFs Processed - Last 30 days</h4>
                  <div className="h-32 bg-white rounded-4 flex items-center justify-center text-13 text-gray-500">
                    Usage chart placeholder
                  </div>
                </div>
                <div className="bg-gray-50 rounded-8 p-6">
                  <h4 className="text-14 font-medium text-gray-900 mb-4">API Calls - Last 30 days</h4>
                  <div className="h-32 bg-white rounded-4 flex items-center justify-center text-13 text-gray-500">
                    Usage chart placeholder
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeBillingSection === 'invoices' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-24 font-bold text-gray-900">Invoices</h2>
                <p className="text-14 text-gray-600">Download and manage your billing history</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-14 font-medium rounded-6 hover:bg-gray-50">
                Manage Payment Method
              </button>
            </div>

            {/* Invoice History */}
            <section>
              <h3 className="text-16 font-semibold text-gray-900 mb-4">Invoice History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Date</th>
                      <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Description</th>
                      <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Amount</th>
                      <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                      <th className="text-left py-3 text-11 font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: 'Nov 15, 2024', description: 'Pay as you go - Usage', amount: '$124.50', status: 'Paid' },
                      { date: 'Oct 15, 2024', description: 'Pay as you go - Usage', amount: '$89.00', status: 'Paid' },
                      { date: 'Sep 15, 2024', description: 'Pay as you go - Usage', amount: '$156.50', status: 'Paid' }
                    ].map((invoice, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 text-14 text-gray-900">{invoice.date}</td>
                        <td className="py-4 text-14 text-gray-900">{invoice.description}</td>
                        <td className="py-4 text-14 font-medium text-gray-900">{invoice.amount}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-4 text-12 font-medium bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-primary-600 hover:text-primary-700 text-14 font-medium">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'quota', label: 'Quota', icon: BarChart3 },
    { id: 'suppressions', label: 'Suppressions', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-32 font-bold text-gray-900">Settings</h1>
          <p className="text-14 text-gray-600 mt-1">Manage your account settings, billing, security, and integrations.</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-14 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-8 shadow-sm p-8">
          {activeTab === 'organization' && renderOrganizationTab()}
          {activeTab === 'quota' && renderQuotaTab()}
          {activeTab === 'suppressions' && renderSuppressionsTab()}
          {activeTab === 'billing' && renderBillingTab()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
