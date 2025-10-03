# ClearScrub Customer Dashboard

A comprehensive financial dashboard application built for ClearScrub customers to view their company financial data, bank transactions, and analytics.

## 🚀 Features

### Authentication System
- Secure login with demo credentials
- Protected routes and session management
- User context and state management

### Companies Management
- **Companies List Page**: Sortable table with filtering and search
- **Company Detail Page**: Comprehensive view with transaction data
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Financial Data Visualization
- Transaction data coverage charts
- Bank statement summaries with deposits, withdrawals, and balances
- True revenue calculations and insights
- Payment method management

### User Interface
- **Brand Colors**: Primary green (#006F46) throughout
- **Typography**: Professional font hierarchy with custom sizes
- **Components**: Reusable button, input, and card components
- **Navigation**: Fixed header with sidebar navigation
- **Responsive**: Mobile, tablet, and desktop optimized

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ProtectedRoute.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication logic
├── layouts/            # Layout components
│   ├── AppShell.tsx    # Main application shell
│   ├── TopBar.tsx      # Header navigation
│   └── Sidebar.tsx     # Side navigation
├── pages/              # Page components
│   ├── Login.tsx       # Authentication page
│   ├── Companies.tsx   # Companies list page
│   └── CompanyDetail.tsx # Company detail page
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and design tokens
```

## 🎨 Design System

### Colors
- **Primary**: #006F46 (ClearScrub Green)
- **Gray Scale**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Status Colors**: Success, warning, error variants

### Typography
- **Font Sizes**: 11px to 32px with semantic naming
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Buttons**: Primary, secondary, and icon variants
- **Cards**: Consistent padding and shadow
- **Tables**: Responsive with mobile card fallback
- **Forms**: Consistent input styling with focus states

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/brickdatalab/clearscrub-dashboard.git

# Navigate to project directory
cd clearscrub-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Credentials

For testing the application, use these demo credentials:

- **Email**: demo@clearscrub.io
- **Password**: demo123

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar with overlay
- Card-based layout for data tables
- Touch-friendly button sizes
- Optimized typography scaling

## 🚀 Deployment

The application is configured for deployment on Vercel with:
- Automatic builds from GitHub
- SPA routing configuration
- Production optimizations

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## 📊 Data Structure

### Company Data
```typescript
interface Company {
  id: string
  company_id: string
  name: string
  email: string
  status: 'processed' | 'pending' | 'failed'
  created_at: string
  total_spend: number
  payments: number
  refunds: number
  dispute_loss: number
  payment_method: {
    type: string
    last_four: string
    expires: string
  }
}
```

### Transaction Data
```typescript
interface Transaction {
  period: string
  deposits: number
  withdrawals: number
  ending_balance: number
  true_revenue: number
}
```

## 🔮 Future Enhancements

- **Real API Integration**: Connect to actual ClearScrub backend
- **Advanced Filtering**: Date ranges, amount filters, status filters
- **Data Export**: CSV, PDF export functionality
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Charts**: Interactive charts with drill-down capabilities
- **User Management**: Multi-user support with role-based access

## 📄 License

This project is proprietary to ClearScrub and not open source.

## 🤝 Contributing

This is a private project. For internal development:

1. Create feature branches from `main`
2. Follow the established code style and patterns
3. Test thoroughly on all device sizes
4. Submit pull requests for review

## 📞 Support

For technical support or questions about this dashboard, contact the ClearScrub development team.
