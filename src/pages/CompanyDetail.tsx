import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ChevronRight, 
  Download, 
  Plus,
  Calendar,
  DollarSign,
  CreditCard,
  Building2,
  Mail,
  Clock,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react'

interface CompanyData {
  id: string
  company_id: string
  name: string
  email: string
  status: 'processed' | 'pending' | 'failed'
  created_at: string
  processing_status: string
  recent_spend: number
  avg_monthly_revenue: number
  total_transactions: number
  account_count: number
  payment_methods: Array<{
    type: string
    last_four: string
    expires: string
  }>
  transactions: Array<{
    period: string
    deposits: number
    withdrawals: number
    ending_balance: number
    true_revenue: number
  }>
  activity: Array<{
    action: string
    timestamp: string
  }>
}

const mockCompanyData: CompanyData = {
  id: '1',
  company_id: 'eus_SQ9H728DpXto2jvDid6CUx',
  name: 'PARS CONSULTING ENGINEERS INC',
  email: 'info@parsconsulting.com',
  status: 'processed',
  created_at: '2024-07-15T10:30:00Z',
  processing_status: 'Processed',
  recent_spend: 487341.30,
  avg_monthly_revenue: 162447.10,
  total_transactions: 76,
  account_count: 3,
  payment_methods: [
    {
      type: 'American Express',
      last_four: '4199',
      expires: 'Jul 2028'
    }
  ],
  transactions: [
    {
      period: '2025-07',
      deposits: 445230.50,
      withdrawals: 398156.78,
      ending_balance: 487341.30,
      true_revenue: 162447.10
    },
    {
      period: '2025-08',
      deposits: 523450.75,
      withdrawals: 456789.23,
      ending_balance: 553002.82,
      true_revenue: 184334.25
    },
    {
      period: '2025-09',
      deposits: 487341.30,
      withdrawals: 423156.78,
      ending_balance: 617187.34,
      true_revenue: 162447.10
    }
  ],
  activity: [
    {
      action: 'Bank statement processed',
      timestamp: '2024-10-02T16:41:00Z'
    },
    {
      action: 'Policy evaluation completed',
      timestamp: '2024-10-02T16:35:00Z'
    },
    {
      action: 'CRM sync successful',
      timestamp: '2024-10-02T16:30:00Z'
    }
  ]
}

export default function CompanyDetail() {
  const { companyId } = useParams<{ companyId: string }>()
  const company = mockCompanyData // In real app, fetch by companyId

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-14 text-gray-500">
        <Link to="/companies" className="hover:text-primary-600 transition-colors duration-150">
          Companies
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{company.name}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-24 lg:text-32 font-bold text-gray-900 mb-1">{company.name}</h1>
          <p className="text-14 text-gray-500">{company.email}</p>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="badge-success self-start">{company.status}</span>
            <span className="text-13 text-gray-500">ID: {company.company_id}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button className="btn-secondary flex items-center gap-2 justify-center">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary flex items-center gap-2 justify-center">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Enrich Bank Transactions</span>
            <span className="sm:hidden">Enrich</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-detail gap-6 xl:gap-8">
        {/* Left Column: Main Content */}
        <div className="space-y-8">
          {/* Transaction Data Coverage Chart */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-16 font-semibold text-gray-900">Transaction Data Coverage</h2>
              <p className="text-13 text-gray-500 mt-1">Jul 2025 - Sep 2025</p>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {company.transactions.map((transaction, index) => (
                  <div key={transaction.period} className="flex items-center gap-4">
                    <div className="w-16 text-13 text-gray-600 font-medium">
                      {new Date(transaction.period + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-4 overflow-hidden">
                      <div 
                        className="h-full bg-primary-600 rounded-4"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="text-13 text-gray-600">
                      {Math.floor(Math.random() * 31) + 1} days PDF
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bank Statement Summary */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-16 font-semibold text-gray-900">Bank Statement Summary</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header text-left px-5 py-3">Period</th>
                    <th className="table-header text-right px-5 py-3">Deposits</th>
                    <th className="table-header text-right px-5 py-3">Withdrawals</th>
                    <th className="table-header text-right px-5 py-3">Ending Balance</th>
                    <th className="table-header text-right px-5 py-3">True Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {company.transactions.map((transaction) => (
                    <tr key={transaction.period} className="border-b border-gray-100">
                      <td className="px-5 py-4 table-cell font-medium">
                        {new Date(transaction.period + '-01').toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </td>
                      <td className="px-5 py-4 table-cell text-right font-medium">
                        {formatCurrency(transaction.deposits)}
                      </td>
                      <td className="px-5 py-4 table-cell text-right font-medium">
                        {formatCurrency(transaction.withdrawals)}
                      </td>
                      <td className="px-5 py-4 table-cell text-right font-medium">
                        {formatCurrency(transaction.ending_balance)}
                      </td>
                      <td className="px-5 py-4 table-cell text-right font-medium text-primary-600">
                        {formatCurrency(transaction.true_revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Debt Summary */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-16 font-semibold text-gray-900">Debt Summary</h2>
            </div>
            <div className="p-10 text-center">
              <p className="text-14 text-gray-500">No debt records found for the selected filters.</p>
              <p className="text-13 text-gray-400 mt-2">All accounts • All time</p>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-16 font-semibold text-gray-900">Details</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Customer ID</p>
                  <p className="text-14 font-medium text-gray-900">{company.company_id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Email</p>
                  <p className="text-14 font-medium text-gray-900">{company.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Created</p>
                  <p className="text-14 font-medium text-gray-900">{formatDate(company.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Processing Status</p>
                  <p className="text-14 font-medium text-gray-900">{company.processing_status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-16 font-semibold text-gray-900">Insights</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Recent Spend</p>
                  <p className="text-14 font-medium text-gray-900">{formatCurrency(company.recent_spend)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Average Monthly Revenue</p>
                  <p className="text-14 font-medium text-gray-900">{formatCurrency(company.avg_monthly_revenue)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Total Transactions</p>
                  <p className="text-14 font-medium text-gray-900">{company.total_transactions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-13 text-gray-500">Account Count</p>
                  <p className="text-14 font-medium text-gray-900">{company.account_count}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-16 font-semibold text-gray-900">Metadata</h3>
            </div>
            <div className="p-10 text-center">
              <p className="text-14 text-gray-500">No metadata</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-16 font-semibold text-gray-900">Payment Methods</h3>
            </div>
            <div className="p-5">
              {company.payment_methods.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-14 font-medium text-gray-900">
                        {method.type} •••• {method.last_four}
                      </p>
                      <p className="text-13 text-gray-500">Expires {method.expires}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-16 font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-5 space-y-4">
              {company.activity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-14 font-medium text-gray-900">{activity.action}</p>
                    <p className="text-13 text-gray-500">{formatDateTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
