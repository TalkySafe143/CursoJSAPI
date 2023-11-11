const express = require("express");
const app = express();

// Antes de todas las rutas Rutas
// Indicarle a express que vamos a recibir un JSON
app.use(express.json())



const usersRouter = require('./routes/usersRoute');
const authRouter = require('./routes/authRouter');
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log("listening in http://localhost:3000");
})