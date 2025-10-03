import React, { useState } from 'react'
import { 
  Plus,
  Copy,
  Eye,
  EyeOff,
  MoreHorizontal,
  Trash2,
  RotateCcw,
  Check,
  X,
  Key as KeyIcon
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  prefix: string
  created_at: string
  last_used: string | null
  status: 'active' | 'inactive'
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'cs_live_1234567890abcdef1234567890abcdef12345678',
    prefix: 'cs_live_1234...',
    created_at: '2024-09-15T10:30:00Z',
    last_used: '2024-10-02T14:22:00Z',
    status: 'active'
  },
  {
    id: '2', 
    name: 'Development Testing',
    key: 'cs_test_abcdef1234567890abcdef1234567890abcdef12',
    prefix: 'cs_test_abcd...',
    created_at: '2024-08-20T16:45:00Z',
    last_used: null,
    status: 'active'
  },
  {
    id: '3',
    name: 'Legacy Integration',
    key: 'cs_live_fedcba0987654321fedcba0987654321fedcba09',
    prefix: 'cs_live_fedc...',
    created_at: '2024-07-10T09:15:00Z',
    last_used: '2024-09-28T11:30:00Z',
    status: 'inactive'
  }
]

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newGeneratedKey, setNewGeneratedKey] = useState('')
  const [copiedKey, setCopiedKey] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  const generateApiKey = () => {
    const prefix = 'cs_live_'
    const randomHex = Array.from({ length: 32 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    return prefix + randomHex
  }

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return

    const newKey = generateApiKey()
    const apiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKey,
      prefix: newKey.substring(0, 12) + '...',
      created_at: new Date().toISOString(),
      last_used: null,
      status: 'active'
    }

    setApiKeys([apiKey, ...apiKeys])
    setNewGeneratedKey(newKey)
    setNewKeyName('')
    setShowCreateModal(false)
    setShowKeyModal(true)
  }

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(''), 2000)
    } catch (err) {
      console.error('Failed to copy key:', err)
    }
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
    setDropdownOpen(null)
  }

  const handleToggleStatus = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ))
    setDropdownOpen(null)
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
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-24 lg:text-32 font-bold text-gray-900 mb-2">API Keys</h1>
          <p className="text-14 text-gray-600">
            Manage your API keys to authenticate requests to the ClearScrub API. 
            Keep your keys secure and never share them publicly.
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 justify-center"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create API Key</span>
          <span className="sm:hidden">Create Key</span>
        </button>
      </div>

      {/* API Keys Table */}
      <div className="card">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-16 font-semibold text-gray-900">Your API Keys</h2>
          <p className="text-13 text-gray-500 mt-1">{apiKeys.length} API keys</p>
        </div>
        
        {apiKeys.length === 0 ? (
          <div className="p-10 text-center">
            <KeyIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-16 font-medium text-gray-900 mb-2">No API keys yet</h3>
            <p className="text-14 text-gray-500 mb-6">
              Create your first API key to start integrating with ClearScrub
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create API Key
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header text-left px-5 py-3">Name</th>
                  <th className="table-header text-left px-5 py-3">Key</th>
                  <th className="table-header text-left px-5 py-3">Status</th>
                  <th className="table-header text-left px-5 py-3">Created</th>
                  <th className="table-header text-left px-5 py-3">Last Used</th>
                  <th className="table-header text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((apiKey) => (
                  <tr key={apiKey.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-6 flex items-center justify-center">
                          <KeyIcon className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="table-cell font-medium">{apiKey.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <code className="table-cell font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-4">
                          {apiKey.prefix}
                        </code>
                        <button
                          onClick={() => handleCopyKey(apiKey.key)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
                          title="Copy full key"
                        >
                          {copiedKey === apiKey.key ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        apiKey.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {apiKey.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4 table-cell">
                      {formatDate(apiKey.created_at)}
                    </td>
                    <td className="px-5 py-4 table-cell">
                      {apiKey.last_used ? formatDateTime(apiKey.last_used) : 'Never'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === apiKey.id ? null : apiKey.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {dropdownOpen === apiKey.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-6 shadow-lg z-10">
                            <button
                              onClick={() => handleToggleStatus(apiKey.id)}
                              className="w-full px-4 py-2 text-left text-14 hover:bg-gray-50 flex items-center gap-2"
                            >
                              {apiKey.status === 'active' ? (
                                <>
                                  <EyeOff className="w-4 h-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4" />
                                  Activate
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteKey(apiKey.id)}
                              className="w-full px-4 py-2 text-left text-14 hover:bg-gray-50 flex items-center gap-2 text-red-600 border-t border-gray-100"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-8 max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-18 font-semibold text-gray-900">Create API Key</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-13 font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production API, Development Testing"
                    className="w-full px-3 py-2 border border-gray-300 rounded-6 text-14 focus:outline-none focus:ring-3 focus:ring-primary-600/10 focus:border-primary-600"
                    autoFocus
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-6 p-4">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-13 font-medium text-yellow-800">Important</p>
                      <p className="text-12 text-yellow-700 mt-1">
                        You'll only be able to view this key once. Make sure to copy and store it securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setNewKeyName('')
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                disabled={!newKeyName.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show New Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-8 max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-18 font-semibold text-gray-900">Your New API Key</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-6 p-4">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded-full mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-13 font-medium text-red-800">Save this key now</p>
                      <p className="text-12 text-red-700 mt-1">
                        This is the only time you'll be able to view this key. Copy it and store it securely.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-13 font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-6 text-14 font-mono break-all">
                      {newGeneratedKey}
                    </code>
                    <button
                      onClick={() => handleCopyKey(newGeneratedKey)}
                      className="btn-secondary flex items-center gap-2 flex-shrink-0"
                    >
                      {copiedKey === newGeneratedKey ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowKeyModal(false)
                  setNewGeneratedKey('')
                }}
                className="btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setDropdownOpen(null)}
        />
      )}
    </div>
  )
}
