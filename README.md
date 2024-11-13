# Packing Checklist Generator

Live Demo: [Packing List Generator](https://packing-checklist-generator.vercel.app/)

An easy-to-use web app that generates a personalized packing checklist based on trip details such as location, duration, and climate. Users can check off items as they pack, save lists for future use, and view past packing lists.

## Features

- Generate a packing list
    - Based on trip information (location, duration, month)
    - AI prompting
- Check off items as they're packed
To be implemented:
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

## Tech Stack
- **Frontend:** React, SCSS for styling.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL;
- **External APIs:** Hugging Face, OpenWeather and MeteoStat.
- **Deployment:** 
  - Frontend on Vercel.
  - Backend on Digital Ocean with Nginx as a reverse proxy and PM2 for process management.

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
## Deployment

### Backend (Digital Ocean with Nginx)
1. Configure Nginx to route requests to the Node server.
2. Use PM2 to manage and keep the server running.

### Frontend (Vercel)
Deploy the frontend on Vercel for continuous integration and smooth updates.

## Contributing
Contributions are welcome! Please submit issues or pull requests.

## License
This project is licensed under the MIT License.

Happy Travels with Packing Checklist Generator!
