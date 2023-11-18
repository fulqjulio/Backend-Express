const passport = require("passport");
const Usuario = require("../models/usuario");
const LocalStrategy = require("passport-local").Strategy;
const GoogelStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook-token");

/* passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
        },
        function (accessToken, refreshToken, profile, done) {
            try {
                User.findOneOrCreateByFacebook(profile, function (err, user) {
                    if (err) console.log("err" + err);
                    return done(err, user);
                });
            } catch (err2) {
                console.log(err2);
                return done(err2, null);
            }
        }
    )
); */

passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {
            var usuario = await Usuario.findOne({ email: email });
            if (!usuario)
                return done(null, false, {
                    message: "Email no existe o esta mal escrito.",
                });
            if (!usuario.validPassword(password))
                return done(null, false, {
                    message: "El password ingresado no es valido.",
                });
            return done(null, usuario);
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new GoogelStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.HOST + "/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            try {
                await Usuario.findOneAndCreateByGoogle(profile);
            } catch (err) {
                return cb(err, user);
            }
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
    try {
        var usuario = await Usuario.findById(id);
        cb(null, usuario);
    } catch (err) {
        cb(err, null);
    }
    
});

module.exports = passport;
