# MERN Item Manager — Lab Test Practice

A beginner-friendly MERN CRUD project. It starts with **name** and **price** fields. Use it to practise adding a new field such as `category`.

## 1. Requirements
- Node.js LTS installed
- VS Code
- MongoDB Atlas account and a database connection string

## 2. Open in VS Code
Extract the ZIP, then open the `mern-item-manager-starter` folder in VS Code.

## 3. Configure the backend
1. Open `backend/.env.example`.
2. Copy it and name the copy `.env`.
3. Put your own MongoDB Atlas connection string in `MONGO_URI`.
4. Replace `<db_password>` with your database user's password. If the password contains special characters, URL-encode them.
5. Keep `.env` private. Do not upload it to GitHub.

Example:
`MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.example.mongodb.net/item_manager?retryWrites=true&w=majority`

## 4. Run the backend
Open a VS Code terminal:
```bash
cd backend
npm install
npm run dev
```
Expected message: `MongoDB connected` and `Server running on port 5001`.

Test in your browser: `http://localhost:5001/api/items`

## 5. Run the frontend
Open a **second** VS Code terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## 6. Main files to understand
- `backend/models/Item.js` — MongoDB document fields
- `backend/routes/items.js` — create, read, update, delete API routes
- `backend/server.js` — Express app and database connection
- `frontend/src/App.jsx` — form, list, edit and delete UI
- `frontend/src/api.js` — frontend API base URL

## 7. Lab practice: add a `category` field
Update these places:
1. `backend/models/Item.js` — add `category: { type: String, required: true, trim: true }`
2. `frontend/src/App.jsx` — add category to form state, inputs, submit payload and item display.
3. Test adding and editing an item. Existing database documents may not have `category`; that's normal.

When you deploy:
- Backend hosting: set `MONGO_URI` and `CLIENT_URL` as environment variables.
- Frontend hosting: set `VITE_API_URL` to your deployed backend API base URL, e.g. `https://your-backend.example.com/api`.
- The backend's `CLIENT_URL` should be the deployed frontend URL. The sample CORS setup allows localhost and the configured URL.

## API endpoints
- `GET /api/items` — list items
- `GET /api/items/:id` — get one item
- `POST /api/items` — create item
- `PUT /api/items/:id` — update item
- `DELETE /api/items/:id` — delete item

This is a practice starter, not a production-secure application.
