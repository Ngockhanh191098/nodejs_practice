const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routers/users.router');

app.use(bodyParser.json());

app.use('/users', userRouter);


app.listen(3000, () => {
    console.log('Server is running..');
});





