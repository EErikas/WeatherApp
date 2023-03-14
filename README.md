# Weatherapp

## Development Environment
### Launching with Docker
To launch the development environment, you need to have `Docker` and `Docker Compose` installed on your machine.

The application needs the API key for [openweathermap](http://openweathermap.org/) to function properly. The key can be stored in the `.env` file in the project root. 

Before launching the application, create the file with such content:
```
APPID=<YOUR-API-KEY>
```
Once you have `Docker` and `Docker Compose` installed and obtained the API key, navigate to the project root and enter the following command:
```bash
docker compose up --build
```
Containers for frontend and backend will be created, and will be accessible at the following addresses:
* backend: http://localhost:9000
* frontend: http://localhost:8000
