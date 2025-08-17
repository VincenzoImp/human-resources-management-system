# Human Resources Management System

## 🌐 Live Demo

Try the application live at: **[https://gestionale-three.vercel.app](https://gestionale-three.vercel.app)**

**Demo Credentials:**
- **Email**: `demo@gestionale.com`
- **Password**: `demo2024`

*Note: The demo account has read-only access. Some features requiring write permissions may be limited.*

## 🚀 Features

### Employee Management
- **Complete Employee Profiles**: Store detailed information including personal data, birth information, residence details, and notes
- **Document Management**: Upload and manage employee documents with secure cloud storage
- **Qualification Tracking**: Track various employee qualifications with detailed scoring systems
- **Search & Filter**: Advanced search functionality across all employee fields
- **Employment Status**: Track and filter employees by employment status

### Qualification System
- **Multiple Qualification Types**: Support for various job roles including:
  - Tubista (Pipe Fitter)
  - Saldatore (Welder) - with technique and material specifications
  - Carpentiere (Carpenter)
  - Impiegato (Employee)
  - Capo Tecnico (Technical Manager)
  - Manovale (Laborer)
  - Aiutante (Helper)
  - Accoppiatorista (Coupler)
  - Montatore (Assembler)
- **Scoring System**: 0-5 point scoring system for qualification assessment
- **Qualification Overview**: Dedicated section to view all qualifications across the organization

### Security & Permissions
- **Firebase Authentication**: Secure email/password authentication
- **Role-based Access Control**: Read/write permissions management
- **Secure Document Storage**: Firebase Storage integration for document management

### User Experience
- **Responsive Design**: Mobile-friendly interface using HeroUI components
- **Dark/Light Theme**: Automatic theme switching support
- **Italian Localization**: Complete Italian language interface
- **Toast Notifications**: User-friendly feedback system
- **Loading States**: Smooth loading indicators and state management

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.1.3, React 19.0.0, TypeScript
- **UI Framework**: HeroUI (Tailwind CSS-based component library)
- **Backend**: Firebase (Firestore Database, Authentication, Storage)
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React Context API
- **Date Handling**: @internationalized/date
- **Notifications**: react-hot-toast
- **Icons**: Custom SVG icons
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm/bun
- Firebase project with Firestore, Authentication, and Storage enabled

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VincenzoImp/iwn.git
   cd iwn
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Firebase**
   
   Create a `.env.local` file in the root directory based on `env.example`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Set up Firebase Security Rules**
   
   Apply the security rules found in `app/firebase/rules.md` to your Firebase project:
   
   **Firestore Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && 
           request.auth.uid in get(/databases/$(database)/documents/settings/permissions).data.write;
       }
     }
   }
   ```
   
   **Storage Rules:**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && 
           request.auth.uid in ["YOUR_ADMIN_UID"];
       }
     }
   }
   ```

5. **Initialize Firebase Data**
   
   Create a `settings/permissions` document in Firestore with the following structure:
   ```json
   {
     "write": ["user_uid_1", "user_uid_2"]
   }
   ```

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Structure

### Firestore Collections

#### `employees`
```typescript
{
  id: string (auto-generated)
  name: string | null
  surname: string | null
  email: string | null
  phone: string | null
  gender: "male" | "female" | "other" | null
  taxCode: string | null
  employed: "yes" | "no" | null
  birthdate: string | null (ISO date)
  birthplaceCity: string | null
  birthplaceProvincia: string | null
  birthplaceNation: string | null
  birthplaceZipcode: number | null
  livingplaceAddress: string | null
  livingplaceCity: string | null
  livingplaceProvincia: string | null
  livingplaceNation: string | null
  livingplaceZipcode: number | null
  notes: string | null
  documents: string[] | null
  qualifications: {
    [qualificationType]: Array<{
      score?: number
      technique?: string
      material?: string
    }>
  } | null
}
```

#### `settings/permissions`
```typescript
{
  write: string[] // Array of user UIDs with write permissions
}
```

### Firebase Storage Structure
```
/employees/documents/
  ├── uuid_filename1.pdf
  ├── uuid_filename2.jpg
  └── ...
```

## 🔐 Authentication & Authorization

### Authentication
- Email/password authentication via Firebase Auth
- Persistent login sessions with localStorage
- Automatic redirect handling for authenticated/unauthenticated users

### Authorization Levels
- **Read Access**: All authenticated users can view data
- **Write Access**: Only users listed in `settings/permissions.write` array can:
  - Add new employees
  - Edit existing employees
  - Delete employees
  - Upload/delete documents

## 🎯 Usage

### Getting Started
1. **Login**: Use the authentication page to log in with your credentials
2. **Home**: Overview of the system features and navigation guide
3. **Employees**: Browse, search, and manage employee records
4. **Qualifications**: View employees organized by their qualifications

### Managing Employees
1. **View All Employees**: Navigate to "Risorse" (Resources)
2. **Search**: Use the search bar to find specific employees
3. **Filter**: Filter by employment status (Employed/Unemployed/All)
4. **Add New Employee**: Click "Aggiungi" (Add) button (requires write permissions)
5. **Edit Employee**: Click on an employee row, then "Modifica" (Edit)

### Managing Qualifications
1. **Add Qualifications**: In employee edit mode, use the + button in qualifications section
2. **Score Qualifications**: Use the 0-5 scale scoring system
3. **Specialized Qualifications**: For welders, specify technique and material
4. **View by Qualification**: Use the "Qualifiche" (Qualifications) section

### Document Management
1. **Upload Documents**: In employee edit mode, use the + button in documents section
2. **View Documents**: Click the external link icon to open documents
3. **Delete Documents**: Use the delete icon in edit mode

## 🔧 Configuration

### Required Fields
The following fields are required for all employees:
- Name (nome)
- Surname (cognome)
- Phone (telefono)
- Email
- Gender (genere)
- Tax Code (codice fiscale)
- Employment Status (assunto)
- Birth Nation (nazione di nascita)
- Residence Nation (nazione di residenza)
- Residence Province (provincia di residenza)

### Customization
- **Qualification Types**: Modify `qualificationsList` in `app/context.tsx`
- **Required Fields**: Update `attributesEmployees.requiredKeys` in `app/context.tsx`
- **Search Fields**: Modify `attributesEmployees.searchKeys` in `app/context.tsx`
- **UI Text**: All text strings are centralized in the `text` object in `app/context.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables
Ensure all Firebase configuration variables are set in your deployment environment.

## 📁 Project Structure

```
iwn/
├── app/
│   ├── api.tsx                 # Firebase API functions
│   ├── context.tsx             # Global state management
│   ├── firebase/               # Firebase configuration
│   ├── components/             # Reusable components
│   ├── home/                   # Home page
│   ├── autenticazione/         # Authentication pages
│   ├── risorse/                # Employee management
│   │   └── [id]/              # Individual employee pages
│   ├── qualifiche/            # Qualification overview
│   ├── icons.tsx              # Custom SVG icons
│   ├── modifiers.tsx          # Route guards
│   └── providers.tsx          # Theme and UI providers
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## 🤝 Contributing

This is a proprietary application. See `LICENSE.md` for usage terms and restrictions.

## 📄 License

Proprietary - All rights reserved by Vincenzo Imperati. See `LICENSE.md` for full terms.

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify all environment variables are correctly set
   - Check Firebase project configuration
   - Ensure Firebase services (Auth, Firestore, Storage) are enabled

2. **Permission Denied Errors**
   - Verify user UID is in the `settings/permissions.write` array
   - Check Firebase security rules are properly configured

3. **Build Errors**
   - Ensure Node.js version 18+
   - Clear `.next` folder and reinstall dependencies
   - Check for TypeScript errors

4. **Authentication Issues**
   - Verify Firebase Auth domain configuration
   - Check network connectivity
   - Clear browser localStorage if login persists incorrectly

### Performance Optimization
- Images are optimized using Next.js Image component
- Firebase queries include proper indexing
- Large lists use pagination
- Document uploads include progress indicators

## 📞 Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.
