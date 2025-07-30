# React To-Do List Management System

This repository contains a modern React to-do list management application built with React Bootstrap for UI components and JSON Server for backend simulation. The app features a complete task management experience including task browsing, filtering by users and completion status, task status management, and sorting capabilities. It demonstrates React component architecture, state management, and RESTful API integration for a collaborative task management platform.

## Prerequisites

- Node.js and npm installed on your system
- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- (Optional) A code editor like VS Code, Sublime Text, or Atom for easier code navigation

## Installation

1. **Clone the repository** (if not already downloaded):
   ```sh
   git clone <repository-url>
   cd To-Do-List-main
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```

## How to Run

1. **Start the JSON Server** (backend simulation):
   ```sh
   npx json-server --watch database.json --port 9999
   ```

2. **Start the React development server** (in a new terminal):
   ```sh
   npm start
   ```

This will open the app in your default browser at [http://localhost:3000](http://localhost:3000). The page will reload automatically when you make changes to the source code.

**Note**: Make sure both the JSON Server (port 9999) and React development server (port 3000) are running simultaneously for the application to work properly.

## Project Structure

```
To-Do-List-main/
├── database.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── conponents/
│   │   └── todo.js
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

- **database.json**: Mock database containing users and todos data for the JSON Server.
- **public/**: Contains static assets and the HTML template.
  - `index.html`: The main HTML file loaded by React.
  - `manifest.json`, `robots.txt`: Standard web app metadata and configuration.
- **src/**: Contains the React source code.
  - `conponents/`: Reusable React components for different sections of the app.
    - `todo.js`: Main to-do list component with filtering, sorting, and task management functionality.
  - `App.js`: Main application component that renders the to-do list.
  - `index.js`: Entry point that renders the React app.
- **package.json**: Project metadata and dependencies including React, React Bootstrap, Axios, and JSON Server.
- **README.md**: Project documentation (this file).

## Features

- **Task Management**: Browse and display to-do items with titles, assigned users, and completion status
- **User Filtering**: Filter tasks by specific users using checkbox controls
- **Completion Status Filtering**: Filter tasks by completion status (Finished, Unfinished, or All)
- **Task Status Management**: Toggle task completion status with real-time updates
- **Sorting Capabilities**: Sort tasks alphabetically by title in ascending or descending order
- **Responsive Design**: Modern, responsive interface built with Bootstrap for optimal viewing on all devices
- **Real-time Updates**: Dynamic data updates with JSON Server backend simulation
- **Interactive UI**: Clean table layout with color-coded completion status indicators

## Data Structure

The application manages the following data entities:

- **Users**: User information with id, name, username, email, address, phone, website, and company details
- **Todos**: Task items with id, title, userId (assigned user), and completed status

## Technologies Used

- **React 18.3.1**: Modern React with hooks and functional components
- **React Bootstrap 2.10.3**: Bootstrap components built for React
- **Bootstrap 5.3.3**: CSS framework for responsive design and UI components
- **Axios 1.7.2**: HTTP client for API requests
- **JSON Server 1.0.0-beta.1**: Mock REST API backend for development
- **React Scripts 5.0.1**: Development and build tools

## API Endpoints

The application uses the following JSON Server endpoints:

- `GET /user` - Retrieve all users
- `GET /todo` - Retrieve all todos
- `PUT /todo/{id}` - Update a specific todo (for status changes)

## Features in Detail

### Task Listing (`todo.js`)
- Displays tasks in a responsive table layout
- User filtering with checkbox controls for multiple user selection
- Completion status filtering with radio button controls (Finished, Unfinished, All)
- Task cards with ID, title, assigned user, completion status, and action buttons
- Color-coded completion status (blue for finished, red for unfinished)
- Sort functionality for alphabetical ordering by task title
- Real-time status toggle with confirmation alerts

### Task Management
- **Status Toggle**: Click "Change" button to toggle task completion status
- **User Assignment**: View which user is assigned to each task
- **Filtering**: Combine user and completion status filters for precise task viewing
- **Sorting**: Toggle between ascending and descending alphabetical order

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Axios Documentation](https://axios-http.com/)
- For questions or contributions, please open an issue or pull request.
