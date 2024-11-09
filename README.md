# Packing Checklist Generator

An easy-to-use web app that generates a personalized packing checklist based on trip details such as location, duration, and climate. Users can check off items as they pack, save lists for future use, and view past packing lists.

## Features

- Generate a packing list based on trip information (location, duration, climate)
- Check off items as they're packed
- Save lists for future reference
- Access previously saved packing lists

## Project Structure

- Folder structure:

  ```bash
  packing-checklist-generator
  ├── client
  │   ├── src
  │   │   ├── components
  │   │   │   ├── TripForm.js
  │   │   │   ├── PackingList.js
  │   │   │   ├── ListItem.js
  │   │   │   ├── SaveListButton.js
  │   │   │   └── ListHistory.js
  │   │   ├── pages
  │   │   │   ├── HomePage.js
  │   │   │   └── PackingListPage.js
  │   │   ├── App.js
  │   │   └── index.js
  │   ├── public
  │   └── package.json
  └── server
    ├── controllers
    │   ├── tripController.js
    │   └── listController.js
    ├── models
    │   ├── User.js
    │   ├── Trip.js
    │   ├── PackingItem.js
    │   └── PackingList.js
    ├── routes
    │   ├── tripRoutes.js
    │   └── listRoutes.js
    ├── config
    │   └── database.js
    └── server.js

  ```

## React Components

- **TripForm**: Collects trip details
- **PackingList**: Displays the generated packing list
- **ListItem**: Represents each item in the packing list
- **SaveListButton**: Saves the current packing list
- **ListHistory**: Shows previously saved lists

## API Endpoints

| Method | Endpoint                 | Description                            |
| ------ | ------------------------ | -------------------------------------- |
| POST   | /api/trips               | Create a new trip and generate a list  |
| GET    | /api/trips/:tripId       | Get a packing list for a specific trip |
| GET    | /api/users/:userId/lists | Get saved packing lists for a user     |
| POST   | /api/lists/:listId       | Save a modified packing list           |

## Database Tables & Relationships

- **Users**: Stores user details (id, name, email)
- **Trips**: Stores trip details (id, user_id, destination, duration, climate)
- **PackingItems**: Stores packing items (id, trip_id, item_name, packed)
- **PackingLists**: Stores saved packing lists (id, user_id, trip_id, list_name)

Each `Trip` belongs to a `User`, each `PackingItem` belongs to a `Trip`, and each `PackingList` is associated with a `Trip` and `User`.

## Installation

1. Clone the repository
2. Install dependencies for the client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Configure database in server/config/database.js
4. Start the development servers:
   ```bash
   cd server && npm run dev
   cd client && npm start
   ```
