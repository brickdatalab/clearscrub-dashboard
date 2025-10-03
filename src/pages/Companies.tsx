import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search,
  Plus
} from 'lucide-react'

interface Company {
  id: string
  company_id: string
  name: string
  email: string
  file_status: 'completed' | 'processing' | 'failed'
  created: string
}

const mockCompanies: Company[] = [
  {
    id: '1',
    company_id: 'eus_SQ9H728DpXto2jvDid6CUx',
    name: 'PARS CONSULTING ENGINEERS INC',
    email: 'info@parsconsulting.com',
    file_status: 'completed',
    created: '2024-07-15T10:30:00Z'
  },
  {
    id: '2',
    company_id: 'eus_ABC123XYZ789',
    name: 'TECH INNOVATIONS LLC',
    email: 'contact@techinnovations.com',
    file_status: 'processing',
    created: '2024-06-20T14:15:00Z'
  },
  {
    id: '3',
    company_id: 'eus_DEF456UVW012',
    name: 'GLOBAL SOLUTIONS INC',
    email: 'admin@globalsolutions.com',
    file_status: 'failed',
    created: '2024-08-01T09:45:00Z'
  }
]

const filterTabs = [
  { name: 'Complete', count: 1, active: false },
  { name: 'Processing', count: 1, active: false },
  { name: 'Failed', count: 1, active: false }
]

export default function Companies() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [activeTab, setActiveTab] = useState('Complete')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Filter by status based on active tab
    if (activeTab === 'Complete') {
      filtered = filtered.filter(company => company.file_status === 'completed')
    } else if (activeTab === 'Processing') {
      filtered = filtered.filter(company => company.file_status === 'processing')
    } else if (activeTab === 'Failed') {
      filtered = filtered.filter(company => company.file_status === 'failed')
    }

    return filtered
  }, [companies, searchTerm, activeTab])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: Company['file_status']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-24 sm:text-32 font-bold text-gray-900">Companies</h1>
        <button className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Company</span>
          <span className="sm:hidden">Add</span>
          <span className="bg-white/20 text-white text-11 font-bold px-1.5 py-0.5 rounded">
            {companies.length}
          </span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-14 transition-colors duration-200 ${
                activeTab === tab.name
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-12">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Search Bar */}
      <div className="flex justify-start">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="hidden lg:grid lg:grid-cols-3 items-center h-11 gap-4">
                <th className="table-header text-left px-3">Company</th>
                <th className="table-header text-center px-3">Status</th>
                <th className="table-header text-left px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCompanies.map((company) => (
                <tr 
                  key={company.id}
                  className="hidden lg:grid lg:grid-cols-3 items-center h-14 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 gap-4"
                >
                  <td className="px-3">
                    <Link 
                      to={`/companies/${company.company_id}`}
                      className="table-cell font-medium hover:text-primary-600 transition-colors duration-150"
                    >
                      {company.name}
                    </Link>
                  </td>
                  <td className="px-3 flex justify-center">
                    <span className={getStatusBadge(company.file_status)}>
                      {company.file_status.charAt(0).toUpperCase() + company.file_status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 table-cell text-gray-500">{formatDate(company.created)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Mobile Card Layout */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredAndSortedCompanies.map((company) => (
              <div 
                key={company.id}
                className="p-4 border border-gray-200 rounded-8 bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <Link 
                    to={`/companies/${company.company_id}`}
                    className="font-medium text-gray-900 hover:text-primary-600 transition-colors duration-150"
                  >
                    {company.name}
                  </Link>
                </div>
                
                <div className="space-y-2 text-13">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">File Status:</span>
                    <span className={getStatusBadge(company.file_status)}>
                      {company.file_status.charAt(0).toUpperCase() + company.file_status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="text-gray-500">{formatDate(company.created)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-14 text-gray-500">
            {filteredAndSortedCompanies.length} results
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary text-13">Previous</button>
            <button className="btn-secondary text-13">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
