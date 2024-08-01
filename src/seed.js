'use strict';

const mongoose = require('mongoose');
const {
    User,
    Rol
} = require('../src/models/index');
const container = require('../src/startup/container');

const {MONGO_URI} = container.resolve('config');

mongoose.connect(MONGO_URI);

const users = [{
    firstName: "Alejandro",
    lastName: "pirez",
    email: 'admin@test.com',
    grade: 5,
    age: 30,
    password: 'admin',
}, {
    firstName: "Cliente",
    lastName: "customer",
    email: 'client@test.com',
    grade: 1,
    age: 26,
    password: '123456',
},];

const roles = [{
    type: 'Admin',
}, {
    type: 'Client',
},];

async function main() {
    try {
        await User.deleteMany({});
        console.log('Deleted all old users');

        await Rol.deleteMany({});
        console.log('Deleted all old roles');

        const createdUsers = await User.create(users);

        const createdRoles = await Promise.all(roles.map((role, index) => Rol.create({
            ...role,
            UserId: createdUsers[index]._id
        })))

        await Promise.all(createdUsers.map((user,
            index) => User.findByIdAndUpdate(user._id, {$push: {rols: createdRoles[index]}})));

        console.log('New users and roles added');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // await mongoose.disconnect();
    }
}

main();