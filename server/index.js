const { app, PORT, URL, PRODUCTION_MODE } = require('./sln.js');

app.listen(PORT, () => console.log(
  `Sln listening at ${URL}:${PORT}`
  + ` on ${PRODUCTION_MODE ? 'production' : 'development'} mode`
));
