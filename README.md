# 📝 Dovyn – To-Do List App

A clean and minimal **To-Do List web application** built with **HTML, CSS, and Vanilla JavaScript**.  
This project was created to strengthen my understanding of core JavaScript concepts such as DOM manipulation, event handling, state management, and localStorage.

---

## ✨ Features

- ➕ Add new tasks
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 🔍 Filter tasks by:
  - All
  - Pending
  - Completed
- 💾 Persistent data using **localStorage**
- 🌗 Dynamic greeting and date based on time
- 🎨 Modern UI with smooth hover and transition effects
- 📱 Fully responsive layout

---

## 🛠️ Tech Stack

- **HTML5** – semantic structure  
- **CSS3** – custom properties, flexbox, transitions  
- **JavaScript (ES6)** – logic, state handling, DOM updates  
- **Lucide Icons** – lightweight and clean icons  

---

## 📂 Project Structure

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
⚙️ How It Works
Tasks are stored in two arrays: pendingTask && completedTask
Each task includes:
taskID
taskText
taskDate
isCompleted

UI is dynamically rendered using JavaScript
Tasks persist across refreshes using localStorage
Filters toggle visibility without modifying stored data

🚀 Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/mritnjay00111/dovyn-todo.git
Open the project folder:

bash
Copy code
cd dovyn-todo
Open index.html in your browser
(No build tools or dependencies required)

🎯 What I Learned
Managing application state without frameworks

Writing reusable and modular JavaScript functions

DOM traversal and event delegation

Working with localStorage

UI/UX improvements using CSS transitions

Structuring a small but complete front-end project

🔮 Possible Improvements
Edit task functionality
Drag-and-drop task reordering
Due date picker
Dark mode toggle
Animations when adding/removing tasks

📌 Motivation
This project was built as part of my JavaScript upskilling journey to strengthen fundamentals before moving to frameworks like React.

📄 License
This project is open source and free to use for educational purpose.

🙌 Acknowledgements
Lucide Icons
Google Fonts – Inter
