# Chime

A students-first winter(Christmas) themed web platform to help convert images to summarized text, mark important dates on a calendar and showcase upcoming events wrt how far away they are and a fun section to decorate a Christmas tree from a collection of decorations and then download the finished tree image.

## Docker demo


``` bash
docker compose up --build -d
docker compose exec backend node createTables.js 
```
(1st build to set up tables from file in backend container)

```bash
docker compose up -d
docker compose down
```
(regular use)

```bash
docker compose down -v
```
(to clear database tables)


## Tech Stack

- Frontend: React 
- Backend: Node.js, Express
- Database: PostgreSQL
- Auth: Sessions (Self-implemented)

## Features

- User authentication (session-based and email verification)
- Add/delete calendar events and view upcoming events on both Calendar route and Profile
- Drag-and-drop ornaments to decorate a Christmas tree SVG and then download it 
- Integration with Google Gemini API to convert handwritten notes into summarized text with enabled text-to-speech feature(constrained use of Gemini API due to limited number of allowed daily requests)

## Installation


git clone https://github.com/FrostedPetals/hackmas-hackathon.git
cd backend
npm install
npm run dev
cd frontend
npm install 
npm run dev


Refer to .env.example files for configuring env variables

## Folder structure

backend/
├── controllers/            
│   └── auth.controllers.js
├── db/                     
│   └── index.js
├── middlewares/            
│   └── requireLogin.js
├── node_modules/
├── utils/                  
│   ├── mailer.utils.js
│   └── Response.utils.js
├── .env                    
├── .gitignore
├── createTables.js         
├── deleteTables.js         
├── index.js         

frontend/
├── node_modules/           
├── public/assets                 
└── src/
    ├── components/         
    │   ├── calendar/       
    │   │   ├── DeleteModal.jsx
    │   │   ├── EventForm.jsx
    │   │   ├── ReactPopover.jsx
    │   │   └── Upcomingevent.jsx
    │   └── home/           
    │   |   ├── Footer.jsx
    │   |   ├── Hero.jsx
    │   |   ├── Navbar.jsx
    │   |___
    |       ├── DraggableComponents.jsx
    │       ├── Profile.jsx
    │       ├── ProtectedRoute.jsx
    │       └── ThemeToggle.jsx
    ├── contexts/           
    │   ├── LoggedinProvider.jsx
    │   └── ThemeProvider.jsx
    ├── pages/
    |   ├── Calendar.jsx
    │   └── Home.jsx
    |   ├── Login.jsx
    │   └── Notes.jsx
    |   ├── Signup.jsx
    │   └── SnowScene.jsx  
    |   └── Tree.jsx  
    |                         
    ├── App.jsx             
    ├── index.css           
    └── main.jsx            

## API Routes

| Method | Route | Description |
|------|------|-------------|
| POST | /api/login | User login |
| POST | /api/signup | User signup |
| POST | /api/logout | User logout |
| GET  |/api/me    |to check if user is currently logged in or not|
| GET  |/api/calendar| to fetch calendar events in a certain span of time
| POST |/api/calendar| to add a new event to calendar
|DELETE|/api/calendar/:id| to delete any upcoming event(within next 2 weeks)
|GET   |/api/verify-email| to authenticate user using email verification
|ALL   |/api/notes  | anything that is to be done in this route requires logged-in user
|ALL   |/api/tree   | anything that is to be done in this route requires logged-in user
|POST  | /api/summarize| using Gemini API to convert images to text

## Roadmap(add-ons that can be done)

- Google & GitHub OAuth
- Adding avatar to user profile using Multer and Cloudinary(currently DiceBear is being used to generate a unique profile picture based on an email seed)
- Adding health check routes for robustness
- Notifications could be added to user profile-as a bubble with number of events for the day which then disappears once user has opened the profile.

## Notes

- Try refreshing the page in case any expected changes were not visible.
- In order to verify email after signup, it's probable that the email came into the 'Spam' folder of your email provider. Take care to check.
- Use on laptop for best experience.
