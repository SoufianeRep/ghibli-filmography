# Studio Ghibli Filmography

This project to create a Film Catalog application. The application allows users to explore and search for films, view film details, and navigate through a paginated list of films.


## Features

- Display a list of films with their titles, release dates, running times, and images.
- Implement search functionality to search films by name or release year.
- Provide pagination for the list of films to navigate through the pages.
- Render film details on a separate page.
- Utilize responsive design for optimal viewing on different screen sizes.


## Technologies

- **React**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **Context API**
- **TypeScript**
- **Cypress**
- **Docker + Docker Compose**


## Getting Started
After cloning the repository
```bash
cd ghibli-filmography
npm install
npm run dev
```
The app should be available on the browser at `http://localhost:5173`

Alternatively for testing the app using docker, a docker compose config has been included
it installs the app, builds a production build and exposes it using http-server. The config maps the container's port to the same `5173` port.

To run the build:
```bash
docker-compose up --build
```

## Project Structure
- `src/components`: Contains components used in the application.
- `src/context`:    Manages the global state and actions using the Context API.
- `src/pages`:      Includes the main pages of the application.
- `src/@types`:     Defines TypeScript types and interfaces.
- `src/utils`:      Contains utility functions and helper methods.

## Running Tests

Some basic E2E tests have been included using https://www.cypress.io/

To run tests in headless mode, run the following command:
```bash
npm run cy:run
```

Alternatively to take advantage of cypress's test runner GUI, run the following command:
```bash
npm run cy:open
```
