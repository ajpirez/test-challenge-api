const BaseRepository = require("./base.repository");
let _user = null;
let _rol = null;

class UserRepository extends BaseRepository {
    constructor({
        User,
        Rol
    }) {
        super(User, Rol);
        _user = User;
        _rol = Rol
    }

    async getUserByEmail(email) {
        try {
            return await _user.findOne({email});
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        const result = await _user.findOneAndDelete({_id: id});
        if (!result) {
            throw new Error('Document not found');
        }
        await _rol.deleteMany({UserId: {$in: id}});

        return true;
    }
}

module.exports = UserRepository;
