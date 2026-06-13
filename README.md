# CosmicEvents
A High-Performance Full-Stack Platform for Amateur Astronomers and Astrophotographers.

CosmicEvents is a specialized platform designed to handle geospatial data, real-time astronomical event tracking, and high-quality image processing.

See [Screenshots.md](./Docs/Screenshots.md) for a view.

## Key Features

* **Astrophotography Hub:** Technical gallery featuring automated EXIF metadata extraction (ISO, Aperture, Exposure) to help users share their setup.
* **Notification System:** Alerts for astronomical events that users can subscribe to in order to receive email notifications.
* **Interactive Sky Simulation:** 3D sky visualization using Three.js to simulate how celestial bodies should look from the user's perspective.
* **Geographic Personalization:** Save "Favorite Observation Points" with coordinate-based monitoring.

## Architecture & Tech Stack

### Frontend
* React + Vite: Modern, fast, and optimized SPA development.

* CSS Modules: Custom professional UI with a "Deep Space" aesthetic.

* Three.js: For 3D celestial simulations.

* Axios: With global interceptors for automated JWT Authentication.

### Backend
* Node.js & Express: Robust API following a Feature-First Architecture.

* PostgreSQL + PostGIS: Advanced relational database. PostGIS is utilized to handle spatial data for observation points, enabling proximity-based event alerts.

* Redis (Upstash/Cloud): Implemented using the Cache-Aside pattern to optimize user profile loading and API response times.

* Cloudinary / AWS S3: Scalable cloud storage for high-resolution images, decoupling BLOBs from the primary database.

## Future Scalability
### Microservices & Docker
Thanks to its feature-oriented architecture, the current monolithic application is designed to be progressively decomposed into independent microservices, with clear domain boundaries for authentication, simulation, content management, and user accounts

```txt
COSMIC-EVENTS ARCHITECTURE
│
├── Client (React SPA)
├── API Gateway (Node.js)
│   ├── Auth Service (Identity Management)
│   ├── Skyview Service (Simulation Logic)
│   ├── Hub Service (Image & Social Data)
│   └── Account Service (User Profiles)
│
├── Persistence Layer
│   ├── PostgreSQL + PostGIS (Primary DB)
│   └── Redis (Distributed Cache)
│
└── Cloud Storage (S3/Cloudinary)
```

## Project Status

### Implemented 
- JWT Authentication (Login/Register)
- PostgreSQL + PostGIS integration
- Account deletion and session management

### In Development
- Update Profile Image
- Astro-Hub post system
- EXIF metadata extraction
- Three.js event simulation
- Regional event notifications
- Redis caching for likes, comments, followers and followings counts.

## Known Limitations

This project was developed as a prototype and does not yet include all features expected in a production-ready application.

See [Limitations.md](./Docs/Limitations.md) for details.

## Roadmap

### Auth
* [x] Login
* [x] Register

### User Management
* [ ] Profile Page
* [ ] Update Profile Image
* [x] Update Account information
* [x] Delete Account
* [x] Notification Settings (Only Settings)
* [ ] Diplay Posts

### Profiles Views
* [ ] Follow & Unfollow
* [ ] Diplay Posts

### Astro-Hub
* [ ] Astrophotography posts
    - [ ] Likes
    - [ ] Metadata
    - [ ] Tags
* [ ] Comments

### Skyview
* [ ] Event view simulation
* [ ] Favorite places