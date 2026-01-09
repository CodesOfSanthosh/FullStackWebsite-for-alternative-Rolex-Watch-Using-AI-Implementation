 World of Rolex - Premium E-commerce Platform

A luxury watch e-commerce application built with React and Django Rest Framework. This project demonstrates a full-stack premium retail experience with role-based access control, complex ordering systems, and a high-fidelity user interface.

![Project Banner](https://via.placeholder.com/1200x600.png?text=World+of+Rolex+Preview)
*(Replace this link with an actual screenshot of your application)*

🌟 Key Features

- **Premium UI/UX**: Custom "Rolex Design System" with smooth animations, sticky layouts, and responsive grids.
- **Role-Based Access Control (RBAC)**:
  - **Customer**: Browse collections, configure watches, manage cart, and place orders.
  - **Watch Owner**: Dashboard to list watches, view sales analytics, and manage inventory.
  - **Admin**: Complete system oversight, user management, and global product moderation.
- **Advanced Product Filtering**: dynamic filtering by collection, material, and search terms.
- **Secure Authentication**: JWT-based stateless authentication with automatic token refresh.
- **Responsive Design**: Mobile-first approach ensuring a seamless experience on all devices.

🛠 Technology Stack

Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: Context API
- **Styling**: Vanilla CSS (Custom Variables & Modules)
- **Icons**: Lucide React

 Backend
- **Framework**: Django 5.0
- **API**: Django Rest Framework (DRF)
- **Authentication**: Simple JWT
- **Database**: SQLite (Development) / PostgreSQL (Production ready)
- **CORS**: django-cors-headers

 📂 Project Structure

```bash
AI Fullstack/
├── backend/                 # Django Project
│   ├── backend_core/       # Project settings & config
│   ├── products/           # Product management app
│   ├── orders/             # Cart & Order logic
│   ├── users/              # Authentication & Role management
│   └── manage.py           # Django entry point
├── frontend/               # React Project
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (Auth)
│   │   ├── pages/          # View components
│   │   └── api.js          # Axios configuration
│   └── package.json        # Frontend dependencies
└── README.md               # Documentation
```

 🚀 Getting Started

Follow these instructions to set up the project locally.

 Prerequisites
- Node.js (v18+)
- Python (v3.10+)

 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed initial data (optional)
python manage.py seed_products

# Create a superuser (for Admin access)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be served at `http://localhost:5173/`.

 � API Reference

Here are the main API endpoints available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/users/token/` | Obtain JWT access & refresh tokens |
| **POST** | `/api/users/register/` | Register a new user account |
| **GET** | `/api/products/watches/` | List all watches (supports search/filter) |
| **GET** | `/api/products/watches/{id}/` | Get details of a specific watch |
| **POST** | `/api/orders/cart/add/` | Add item to cart (Auth required) |
| **GET** | `/api/orders/cart/` | View current user's cart |

 📦 Deployment Guide

 Production Constraints
- **Debug Mode**: Ensure `DEBUG = False` in `backend/backend_core/settings.py`.
- **Secret Key**: Replace the hardcoded secret key with an environment variable.
- **Allowed Hosts**: Add your domain to `ALLOWED_HOSTS`.
- **Database**: Switch `DATABASES` setting to use PostgreSQL.

 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


