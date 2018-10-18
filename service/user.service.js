'use strict';
const UserRepo = require('../repository/user.repository');
const bcrypt = require('bcryptjs');
const q = require('q');
const UserService = {};

UserService.createUser = function(user) {
    user.password = bcrypt.hashSync(user.password, 10);
    return UserRepo.createUser(user);
};

UserService.login = function(username, password) {
    var deferred = q.defer();
    UserRepo.getUserByMobileNumber(username)
        .then(function(user) {
            if(bcrypt.compareSync(password, user.password)) {
                deferred.resolve(user);
            }
            deferred.reject();
        },
        function(err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

UserService.getAllUsers = function() {
    return UserRepo.getAllUsers();
};

UserService.getUserByMobileNumber = function(mobileNunber) {
    return UserRepo.getUserByMobileNumber(mobileNunber);
};

module.exports = UserService;