import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Download, 
  Copy, 
  BarChart3, 
  Edit, 
  ChevronUp, 
  ChevronDown,
  MoreHorizontal,
  Plus
} from 'lucide-react'

interface Company {
  id: string
  company_id: string
  name: string
  email: string
  payment_method: {
    type: string
    last_four: string
  }
  created: string
  total_spend: number
  payments: number
  refunds: number
  dispute_loss: number
  status: 'processed' | 'pending' | 'failed'
}

const mockCompanies: Company[] = [
  {
    id: '1',
    company_id: 'eus_SQ9H728DpXto2jvDid6CUx',
    name: 'PARS CONSULTING ENGINEERS INC',
    email: 'info@parsconsulting.com',
    payment_method: { type: 'American Express', last_four: '4199' },
    created: '2024-07-15T10:30:00Z',
    total_spend: 487341.30,
    payments: 76,
    refunds: 2,
    dispute_loss: 0,
    status: 'processed'
  },
  {
    id: '2',
    company_id: 'eus_ABC123XYZ789',
    name: 'TECH INNOVATIONS LLC',
    email: 'contact@techinnovations.com',
    payment_method: { type: 'Visa', last_four: '1234' },
    created: '2024-06-20T14:15:00Z',
    total_spend: 125000.00,
    payments: 45,
    refunds: 1,
    dispute_loss: 500,
    status: 'processed'
  },
  {
    id: '3',
    company_id: 'eus_DEF456GHI012',
    name: 'GLOBAL SOLUTIONS INC',
    email: 'admin@globalsolutions.com',
    payment_method: { type: 'Mastercard', last_four: '5678' },
    created: '2024-08-01T09:45:00Z',
    total_spend: 89750.50,
    payments: 32,
    refunds: 0,
    dispute_loss: 0,
    status: 'pending'
  }
]

const filterTabs = [
  { name: 'All', count: 3, active: true },
  { name: 'Top Customers', count: 1, active: false },
  { name: 'First-time', count: 0, active: false },
  { name: 'Repeat', count: 2, active: false },
  { name: 'Recent', count: 1, active: false },
  { name: 'High Refunds', count: 0, active: false },
  { name: 'High Disputes', count: 0, active: false },
]

export default function Companies() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [activeTab, setActiveTab] = useState('All')
  const [sortColumn, setSortColumn] = useState<keyof Company | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

  const handleSort = (column: keyof Company) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
        }
        
        return 0
      })
    }

    return filtered
  }, [companies, searchTerm, sortColumn, sortDirection])

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const toggleSelectAll = () => {
    setSelectedCompanies(
      selectedCompanies.length === companies.length ? [] : companies.map(c => c.id)
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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

      {/* Filter and Action Bar */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
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
          <div className="flex gap-2 overflow-x-auto">
            <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </button>
            <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Card</span>
            </button>
            <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Created date</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analyze</span>
          </button>
          <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
            <Edit className="w-4 h-4" />
            <span className="hidden lg:inline">Edit columns</span>
            <span className="lg:hidden">Edit</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="hidden lg:grid lg:grid-cols-table items-center h-11">
                <th className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.length === companies.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
                  />
                </th>
                <th 
                  className="table-header text-left px-3 cursor-pointer flex items-center gap-1"
                  onClick={() => handleSort('name')}
                >
                  Name
                  {sortColumn === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  )}
                </th>
                <th className="table-header text-left px-3">Email</th>
                <th className="table-header text-left px-3">Payment Method</th>
                <th 
                  className="table-header text-left px-3 cursor-pointer flex items-center gap-1"
                  onClick={() => handleSort('created')}
                >
                  Created
                  {sortColumn === 'created' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  )}
                </th>
                <th 
                  className="table-header text-right px-3 cursor-pointer flex items-center gap-1 justify-end"
                  onClick={() => handleSort('total_spend')}
                >
                  Total Spend
                  {sortColumn === 'total_spend' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  )}
                </th>
                <th 
                  className="table-header text-right px-3 cursor-pointer flex items-center gap-1 justify-end"
                  onClick={() => handleSort('payments')}
                >
                  Payments
                  {sortColumn === 'payments' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  )}
                </th>
                <th className="table-header text-right px-3">Refunds</th>
                <th className="table-header text-right px-3">Dispute Loss</th>
                <th className="table-header text-center px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCompanies.map((company) => (
                <tr 
                  key={company.id}
                  className={`hidden lg:grid lg:grid-cols-table items-center h-14 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                    selectedCompanies.includes(company.id) ? 'bg-primary-50 border-l-3 border-primary-600' : ''
                  }`}
                >
                  <td className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => toggleCompanySelection(company.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
                    />
                  </td>
                  <td className="px-3">
                    <Link 
                      to={`/companies/${company.company_id}`}
                      className="table-cell font-medium hover:text-primary-600 transition-colors duration-150"
                    >
                      {company.name}
                    </Link>
                  </td>
                  <td className="px-3 table-cell text-gray-500">{company.email}</td>
                  <td className="px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-gray-100 rounded border flex items-center justify-center text-10 font-bold text-gray-600">
                        {company.payment_method.type === 'American Express' ? 'AMEX' : 
                         company.payment_method.type === 'Visa' ? 'VISA' : 'MC'}
                      </div>
                      <span className="table-cell text-gray-500 font-mono">
                        •••• {company.payment_method.last_four}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 table-cell text-gray-500">{formatDate(company.created)}</td>
                  <td className="px-3 table-cell text-right font-medium">{formatCurrency(company.total_spend)}</td>
                  <td className="px-3 table-cell text-right font-medium">{company.payments}</td>
                  <td className="px-3 table-cell text-right">{company.refunds}</td>
                  <td className="px-3 table-cell text-right">{formatCurrency(company.dispute_loss)}</td>
                  <td className="px-3 flex justify-center">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Mobile Card Layout */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredAndSortedCompanies.map((company) => (
              <div 
                key={company.id}
                className={`p-4 border border-gray-200 rounded-8 ${
                  selectedCompanies.includes(company.id) ? 'bg-primary-50 border-primary-600' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => toggleCompanySelection(company.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
                    />
                    <Link 
                      to={`/companies/${company.company_id}`}
                      className="font-medium text-gray-900 hover:text-primary-600 transition-colors duration-150"
                    >
                      {company.name}
                    </Link>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2 text-13">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{company.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Spend:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(company.total_spend)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payments:</span>
                    <span className="font-medium text-gray-900">{company.payments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
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
