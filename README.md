# 🛒 E-Commerce Website

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with secure admin access, user authentication, product listing, cart management, payment gateway integration, and more.

## 📌 Features

### Frontend (React + Vite)
- Built with **Vite** for fast development.
- Routing via `react-router-dom`.
- State management using Context API.
- Responsive navbar and hamburger menu.
- Product listing with category/subcategory filtering.
- Cart management: add, update, remove items.
- Checkout using Stripe and Razorpay.
- Login and Register functionality.
- Search bar, sorting, and contact page.

### Backend (Node.js + Express)
- JWT-based authentication.
- Passwords hashed using bcrypt.
- MongoDB integration with Mongoose.
- REST APIs for users, admins, and products.
- File uploads with Multer and Cloudinary.
- Payment integration with Stripe and Razorpay.
- Environment variables with dotenv.

### Admin Panel
- Admin login and token storage in localStorage.
- Product management: add, view, and auth-protected routes.
- Image preview using `URL.createObjectURL`.
- Authorization headers on secured routes.

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router DOM, React Toastify  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Other Tools:** Cloudinary, Multer, Stripe, Razorpay, Axios, dotenv, bcrypt, validator, nodemon

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas
- Cloudinary account
- Stripe & Razorpay keys

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/e-commerce-website.git
cd e-commerce-website
```

#### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file with:
```
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```
Run the backend:
```bash
nodemon server.js
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 📂 Project Structure

```
e-commerce-website/
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       └── context/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── admin/ (React Admin Panel)
```

## 📬 Contact

- 👨‍💻 Ayush Sahu  
- 📧 Email: sahuayush467@gmail.com  
- 📷 Instagram: [@ayush_h4x](https://instagram.com/ayush_h4x)  
- 💼 LinkedIn: [Ayush Sahu](https://www.linkedin.com/in/ayush-sahu-83r)

## ✅ Status

🚧 Project is under development.  
Frontend, Backend, Admin Panel, and Payment Integration have been implemented.

## 🤝 Contributing

Pull requests are welcome! Open an issue first to discuss major changes.

## 📄 License

MIT License
