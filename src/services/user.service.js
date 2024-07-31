const BaseService = require("./base.service");
let _userRepository = null;

class UserService extends BaseService {
    constructor({UserRepository}) {
        super(UserRepository);
        _userRepository = UserRepository;
    }

    async getUserByEmail(email) {
        try {
            return await _userRepository.getUserByEmail(email);
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserService;
