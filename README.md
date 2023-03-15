# Weatherapp

## Development Environment
The application needs the API key for [openweathermap](http://openweathermap.org/) to function properly.

### Launching without Docker
To launch the project you need to start both `frontend` and `backend` servers.
To launch development servers, perform the following steps starting from the project root.
* Launch frontend:
    ```bash
    cd frontend/
    npm i
    npm start
    ```
* Launch backend:
     ```bash
    cd backend/
    npm i
    APPID=<your-openweathermap-api-key> npm run dev
    ```

### Launching with Docker
To launch the development environment, you need to have `Docker` and `Docker Compose` installed on your machine.
 The key can be stored in the `.env` file in the project root. 

Before launching the application, create the file with such content:
```
APPID=<your-openweathermap-api-key>
```
Once you have `Docker` and `Docker Compose` installed and obtained the API key, navigate to the project root and enter the following command:
```bash
docker compose up --build
```
### Accessing Containers
Regardless of which method you've used, frontend and backend can be accessed via the following addresses:
* backend: http://localhost:9000
* frontend: http://localhost:8000

## Building for Production
### With Docker
#### Pulling from Container Repository
```bash
docker pull ghcr.io/eerikas/weather-app
docker run -p 9000:9000 -e APPID=<your-openweathermap-api-key> ghcr.io/eerikas/weather-app
```
#### Building Locally
Navigate to the project root and do the following commands:
```bash
docker build -t weather-app .
docker run -p 9000:9000 -e APPID=<your-openweathermap-api-key> weather-app
```
### Without Docker
To create and launch the production build on your machine, you need to do the following steps:
1. Navigate to the `frontend/` folder.
2. Install dependencies and build the production version:
    ```bash
    npm i
    npm run build
    ```
3. Compiled files will be stored in `frontend/dist`.
4. Copy the `dist/`folder to the `backend/` folder.
5. Navigate to the `backend/` folder.
6. Install dependencies and start the server:
   ```bash
    npm i
    APPID=<your-openweathermap-api-key> npm start
   ```