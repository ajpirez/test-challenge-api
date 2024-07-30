const BaseService = require("./base.service");
let _userRepository = null;

class UserService extends BaseService {
    constructor({UserRepository}) {
        super(UserRepository);
        _userRepository = UserRepository;
    }

    async getUserByEmail(username) {
        try {
            return await _userRepository.getUserByEmail(username);
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserService;
