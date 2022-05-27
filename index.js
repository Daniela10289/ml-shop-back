const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hola, mi server en express');
});

app.listen(port, () => {
  console.log('Mi port: ' + port);
});
