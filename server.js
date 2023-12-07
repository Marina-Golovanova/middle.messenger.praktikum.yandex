import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', (_reqest, response) => {
  response.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
