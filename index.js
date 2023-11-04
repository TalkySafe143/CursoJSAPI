const express = require("express");
const app = express();

// Rutas
app.use(express.json())
const usersRouter = require('./routes/usersRoute');

app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log("listening in http://localhost:3000");
})