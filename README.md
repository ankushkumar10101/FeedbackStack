# FeedbackStack: Anonymous Feedback Collection Platform

A full-stack anonymous feedback collection system built with **Django 5**, **MongoDB**, and **React**.

## Features

- **Anonymous Submission**: Users can submit feedback without logging in.
- **Rating System**: Interactive 5-star rating component.
- **MongoDB Storage**: All feedback data is stored in a MongoDB database (`feedback_db`).
- **Admin Analytics**: APIs to retrieve total feedback, average ratings, and distribution.

- **Responsive UI**: Built with React and Bootstrap.

## Tech Stack

- **Backend**: Python 3.13, Django 5.1, Django REST Framework, PyMongo.
- **Database**: MongoDB (Localhost).
- **Frontend**: React (Vite), Axios, Bootstrap.

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 16+
- MongoDB installed and running on `localhost:27017`

### Backend Setup
1. Navigate to the project root.
2. Activate virtual environment:
   ```bash
   .\venv\Scripts\activate
   ```
3. Navigate to `backend`:
   ```bash
   cd backend
   ```
4. Run Migrations (for Auth/Admin in SQLite):
   ```bash
   python manage.py migrate
   ```
5. Create Admin User:
   ```bash
   python manage.py createsuperuser
   ```
6. Start Server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Open a new terminal.
2. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start Dev Server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/feedback/` | Submit feedback | No |
| GET | `/api/analytics/` | Get feedback statistics | Yes (Admin) |


## Notes
- **Database Hybrid**: This project uses a hybrid database approach to maximize compatibility with the latest Django version while fulfilling the MongoDB requirement. 
    - **SQLite**: Stores Django's internal tables (Users, Permissions, Sessions, Admin Log).
    - **MongoDB**: Stores all Feedback submissions (`feedback_db` database, `feedback` collection).
- **Admin Access**: Log in to `http://localhost:8000/admin/` to manage users and view the interface. The Analytics and Export features are protected APIs accessible to admin users.
