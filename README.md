# Personal Expense Tracker Backend API

A robust RESTful API built with Node.js, Express, and MongoDB for managing personal expenses. This backend service provides user authentication, expense tracking, category management, and analytics functionality.

## 🚀 Features

- **User Management**
  - User registration and authentication
  - JWT-based authorization
  - Secure password hashing with bcrypt

- **Expense Management**
  - Create, read, update, and delete expenses
  - Search expenses
  - Filter by date, category, etc. (supported by backend logic)

- **Category Management**
  - Create and manage custom expense categories
  - Organize expenses effectively

- **Analytics**
  - View expense summaries
  - Analyze monthly spending trends

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Logging:** morgan
- **CORS:** cors
- **Environment Variables:** dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Personal_Expense_Tracker
```

### 2. Navigate to Backend Directory

```bash
cd Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `Backend` directory with the following variables:

```env
PORT=3000
DEV_MODE=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 5. Start the Server

**Development Mode (with auto-restart):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will start on `http://localhost:3000` (or your defined PORT).

## 📁 Project Structure

```
Backend/
├── config/
│   └── db.js                      # Database configuration
├── controllers/
│   ├── authController.js          # User authentication logic
│   ├── ExpenseController.js       # Expense business logic
│   ├── categoryController.js      # Category management logic
│   └── analyticsController.js     # Analytics logic
├── middleware/
│   ├── auth.js                    # Authentication middleware
│   └── Validations.js             # Request validation middleware
├── models/
│   ├── User.js                    # User schema
│   ├── Expense.js                 # Expense schema
│   └── Category.js                # Category schema
├── routes/
│   ├── authRoutes.js              # User authentication routes
│   ├── ExpenseRoutes.js           # Expense routes
│   ├── categoryRoutes.js          # Category routes
│   └── analyticsRoutes.js         # Analytics routes
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── package.json                   # Dependencies and scripts
└── src/
    └── server.js                  # Application entry point
```

## 🔌 API Endpoints

### User Routes (`/api/v1/useAuth`)

| Method | Endpoint        | Description       | Access |
| ------ | --------------- | ----------------- | ------ |
| POST   | `/registerUser` | Register new user | Public |
| POST   | `/login`        | User login        | Public |

### Expense Routes (`/api/v1/expense`)

| Method | Endpoint          | Description                         | Access        |
| ------ | ----------------- | ----------------------------------- | ------------- |
| POST   | `/`               | Create new expense                  | Authenticated |
| GET    | `/expenses`       | Get all expenses                    | Authenticated |
| GET    | `/expenses/search`| Search expenses                     | Authenticated |
| GET    | `/expenses/:id`   | Get single expense by ID            | Authenticated |
| PUT    | `/expenses/:id`   | Update expense                      | Authenticated |
| DELETE | `/expenses/:id`   | Delete expense                      | Authenticated |

### Category Routes (`/api/v1/category`)

| Method | Endpoint       | Description             | Access        |
| ------ | -------------- | ----------------------- | ------------- |
| GET    | `/get-all`     | Get all categories      | Authenticated |
| POST   | `/create`      | Create new category     | Authenticated |
| DELETE | `/delete/:id`  | Delete category         | Authenticated |

### Analytics Routes (`/api/v1/analytics`)

| Method | Endpoint   | Description         | Access        |
| ------ | ---------- | ------------------- | ------------- |
| GET    | `/summary` | Get expense summary | Authenticated |
| GET    | `/trends`  | Get monthly trends  | Authenticated |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in your requests.
Depending on implementation, this may be via an `Authorization` header or Cookies.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Gamage Recruiter**