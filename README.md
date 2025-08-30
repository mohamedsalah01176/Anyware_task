# Teacher-Student Management System

A full-stack application developed to manage teacher-student interactions, including exam management, announcements, and course assignments.

## 📌 Overview

This project utilizes the **MERN stack**:

- **Frontend:** React with TypeScript, Vite, and Material-UI
- **Backend:** Node.js with Express and MongoDB

The application features role-based access control, ensuring that users have appropriate access to resources based on their roles.

## 🧑‍🏫 Teacher Features

- **Login functionality**
- **Add, edit, and delete exams**
- **Add, edit, and delete announcements**
- **View courses associated with their account**
- **Assign `teacherId` to students**, linking them to the teacher

## 👩‍🎓 Student Features

- **View exams and courses associated with their assigned teacher (`teacherId`)**
- **Solve and submit exams**
- **View teacher announcements**

## 🔐 Protected Routing

The application implements protected routing to ensure that:

- **Registered users** (teachers and students) can access their respective dashboards and functionalities.
- **Unregistered users** are redirected to the login page.
- **Unauthorized access** to certain routes is prevented based on user roles.

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js**
- **npm** or **yarn**
- **MongoDB**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedsalah01176/Anyware_task_FrontEnd.git
   cd Anyware_task_FrontEnd
