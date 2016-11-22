const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../../../db/queries/users');

module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]'
        },
        function(email, password, done) {
            var user = users.where({
                    email: email
                }).first()
                .then(function(user) {
                    if (user && user.password === password) {
                        done(null, user);
                    } else if (!user) {
                        done(null, false, {message: 'User not found'});
                    } else if (user && user.password !== password) {
                        done(null, false, {message: 'Incorrect passport'});
                    }
                });
        }));
};