# Dubs Meetup
![alt text](<images/Screenshot 2024-05-27 190841.png>)
## Introduction
Dubs Meetup is a mock up of Meetup.com, that I created as one of my projects at App Academy.  I am currently working on tailoring it specifically for use with my extended family.  This platform will allow family members to schedule events and socially network, making it easier to
stay connected and organized.

## Technologies Used
- JavaScript
- React
- Redux
- PostgreSQL
- SQLite3
- Express
- Sequelize

## Live Site:

https://dubs-meetup.onrender.com

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

    **Create dotenv file**

    ```sh
    touch .env
    ```

    **Copy what is in .env.example to .env**

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
