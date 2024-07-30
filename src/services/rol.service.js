const BaseService = require("./base.service");
let _rolRepository = null;
let _userRepository = null;
let _mongoose = null

class RolService extends BaseService {
    constructor({RolRepository, UserRepository, mongoose}) {
        super(RolRepository, UserRepository);
        _rolRepository = RolRepository;
        _userRepository = UserRepository;
        _mongoose = mongoose
    }

    async addRoleToUser(email, rolName) {
        try {
            await _rolRepository.addRoleToUser(email, rolName)
            return _userRepository.getUserByEmail(email)
        } catch (error) {
            throw error
        }
    }

    async deleteRoleToUser(email, rolName) {
        try {
            await _rolRepository.deleteRoleToUser(email, rolName)
            return _userRepository.getUserByEmail(email)
        } catch (error) {
            throw error
        }
    }
}

module.exports = RolService;
