import express from 'express';
import path from 'path';

const app = express();

const __dirname = path.resolve();
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(8000, () => {
    console.log("server run!");
});
