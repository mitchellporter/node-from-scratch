'use strict';
var passport = require('passport');
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var clients = require('../../db/knexstore')('auth_clients');

const verifyClient = (client, secret) => {
    return new Promise(function(resolve, reject) {
        if (client.secret === secret) {
            resolve(client);
        } else {
            reject('Client not authenticated');
        }
    });
};

module.exports = function() {
    passport.use('client-password', new ClientPasswordStrategy(
        function(clientId, secret, done) {
            clients.findOne({client_id: clientId})
                .then(client => verifyClient(client, secret))
                .then((client) => {
                    return done(null, client);
                }).catch(err => {
                    return done(err);
                });
        }
    ));
};
