const {generateToken} = require("../helpers/jwt.helper");
let _userService = null;
let _rolService = null;
let _mongoose = null

class AuthService {
    constructor({UserService, RolService, mongoose}) {
        _userService = UserService;
        _rolService = RolService;
        _mongoose = mongoose
    }

    async signUp(user) {
        try {
            const {email} = user;
            const userExist = await _userService.getUserByEmail(email);
            if (userExist) {
                const error = new Error();
                error.status = 400;
                error.message = "This email already exist";
                throw error;
            }
            let userCreated = await _userService.create([user]);
            let roleCreated = await _rolService.create([{UserId: userCreated[0]._id}]);
            await _userService.update(userCreated[0]._id, {$push: {rols: roleCreated[0]._id}});
            return _userService.getUserByEmail(email)
        } catch (error) {
            throw error
        }
    }

    async signIn(user) {
        try {
            const {email, password} = user;
            const userExist = await _userService.getUserByEmail(email);
            if (!userExist) {
                const error = new Error();
                error.status = 404;
                error.message = "User does not exist";
                throw error;
            }

            const validPassword = userExist.comparePasswords(password);
            if (!validPassword) {
                const error = new Error();
                error.status = 400;
                error.message = "Invalid Password";
                throw error;
            }

            const userToEncode = {
                email: userExist.email,
                id: userExist._id
            };

            const token = "Bearer " + generateToken(userToEncode);

            return {token, user: userExist};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
