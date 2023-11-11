const { ExtractJwt, Strategy } = require('passport-jwt');
const passport = require('passport');
const MongoDB = require('../../lib/mongo');
const mongo = new MongoDB();
const config = require('../../config');

passport.use(
    new Strategy(
        {
            secretOrKey: config.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (payload, done) => {
            console.log(payload)
            const user = mongo.getOne('users', {email: payload.email});
            if (!user) return done("JWT invalido", null);
            done (null, user);
        }
    )
)