const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const expressHbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 8080;

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'de'],
    saveMissing: true
  });

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs')
app.use(i18nextMiddleware.handle(i18next));

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(port, (err) => {
  console.log(`Server is listening on port ${port}`);
});
