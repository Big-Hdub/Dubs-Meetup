# Dubs Meetup

## Introduction
Dubs Meetup is a mock version of Meetup.com, tailored specifically for use with my extended family.
This platform allows family members to schedule events and socially network, making it easier to
stay connected and organized.

## Technologies Used
- JavaScript
- React
- Redux
- PostgreSQL
- SQLite3
- Express
- Sequelize

## Setup Instructions for Local Use

### Prerequisites
- Node.js

### Steps to Launch the Application Locally

1. **Clone the GitHub repository**

   ```sh
   git clone https://github.com/Big-Hdub/Dubs-Meetup.git
   cd Dubs-Meetup
   ```

### Navigate to the backend-api folder:

2. **Backend Setup**

    **Install dependencies:**

    ```sh
    npm install
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

    **Start the backend server:**
    ```sh
    npm start
    ```

### Open a new terminal and navigate to the frontend folder:

3. **Frontend Setup**

    **Install dependencies:**

    ```sh
    npm install
    ```

    ### Start the frontend development server:

    ```sh
    npm run dev
    ```

Your application should now be running locally. Open your browser and navigate to http://localhost:5173 to access Dubs Meetup.
