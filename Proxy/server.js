const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use('/:propertyId', express.static(path.join(__dirname, './public')));

app.listen(3010);