const express = require("express");
const app = express();
const cors = require('cors')

// Antes de todas las rutas Rutas
// Indicarle a express que vamos a recibir un JSON
app.use(cors())
app.use(express.json())

const usersRouter = require('./routes/usersRoute');
const authRouter = require('./routes/authRouter');
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    res.status(404).json({
        err
    })
})

app.listen(3000, () => {
    console.log("listening in http://localhost:3000");
})