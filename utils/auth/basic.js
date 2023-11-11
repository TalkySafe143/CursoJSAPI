const { BasicStrategy } = require('passport-http');
const passport = require('passport');
const MongoDB = require('../../lib/mongo');
const mongo = new MongoDB();
const bcrypt = require('bcrypt')
passport.use(
    new BasicStrategy(async (email, password, done) => {
        const user = await mongo.getOne('users', {email});
        if (!user) return done("Existe alguna informacion incrrecta", null);

        if (!(await bcrypt.compare(password, user.password))) return done("Existe alguna informacion incrrecta", null);

        done(null, user);

    })
);