const {
    createContainer,
    asClass,
    asValue,
    asFunction
} = require("awilix");
const mongoose = require("mongoose");

//  config
const config = require("../config");

const app = require(".");
// services
const {
    UserService,
    AuthService,
    RolService,
} = require("../services");

// controllers
const {
    UserController,
    AuthController,
    RolController,
} = require("../controllers");

// routes
const {
    UserRoutes,
    AuthRoutes,
    RolRoutes,
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const {
    User,
    Rol
} = require("../models");

// schemas

const {
    UserSchema,
    RolSchema,
    AuthSchema,
    UserUpdateSchema
} = require('../schemas/index')

// repositories
const {
    UserRepository,
    RolRepository,
} = require("../repositories");

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        mongoose: asValue(mongoose)
    })
    .register({
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        RolService: asClass(RolService).singleton(),
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        RolController: asClass(RolController.bind(RolController)).singleton(),
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        RolRoutes: asFunction(RolRoutes).singleton(),
    })
    .register({
        User: asValue(User),
        Rol: asValue(Rol),
    })
    .register({
        UserSchema: asValue(UserSchema),
        UserUpdateSchema: asValue(UserUpdateSchema),
        RolSchema: asValue(RolSchema),
        AuthSchema: asValue(AuthSchema)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        RolRepository: asClass(RolRepository).singleton(),
    });

module.exports = container;
