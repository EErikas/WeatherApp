const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('node:path');
const debug = require('debug')('weathermap');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

// Print Error if API Key is missing
if (appId === '') {
  console.error('API Key is Missing!');
}
// serve compiled frontend files
const staticPages = new Koa();
const staticPagesPath = path.join(__dirname, '../dist');
staticPages.use(serve(staticPagesPath));
app.use(mount('/', staticPages));

// get current weather
const fetchCurrentWeather = async (lat, lon) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&`;
  debug(`Calling ${endpoint}`);
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};
// get 5 day / 3 hour forecast
const fetchForecasttWeather = async (lat, lon) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&`;
  debug(`Calling ${endpoint}`);
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

router.get('/api/weather/:lat/:lon', async ctx => {
  const currentWeatherData = await fetchCurrentWeather(ctx.params.lat, ctx.params.lon);
  const forecastWeatherData = await fetchForecasttWeather(ctx.params.lat, ctx.params.lon);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = {};

  if (currentWeatherData && forecastWeatherData) {
    ctx.body = {
      city: currentWeatherData.name,
      country: currentWeatherData.sys.country,
      today: {
        ...currentWeatherData.weather[0],
      },
      tomorrow: {
        ...forecastWeatherData.list[7].weather[0],
      },
    };
  }

  debug(ctx.body);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
debug('Running in Debug mode');
