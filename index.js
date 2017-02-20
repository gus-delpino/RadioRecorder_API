const express = require('express');

const app = express();
const port = process.env.PORT || 18443;

const routes = require('./recorder/routes');

app.use('/api', routes);

app.listen( port , () => {
    console.log(`Listening at port ${port}`);
});

