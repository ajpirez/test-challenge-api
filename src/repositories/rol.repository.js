const BaseRepository = require("./base.repository");
let _rol = null;
let _user = null;

class RolRepository extends BaseRepository {
    constructor({Rol, User}) {
        super(Rol, User);
        _rol = Rol;
        _user = User;
    }

    async addRoleToUser(email, rolName) {
        try {
            const {user, existsRol} = await validation(email, rolName)
            if (existsRol) {
                const error = new Error();
                error.status = 400;
                error.message = "The rol belongs to this user";
                throw error;
            }
            let rolCreated = await _rol.create(
                {
                    UserId: user._id,
                    type: rolName,
                }
            )
            return await _user.findByIdAndUpdate(user._id, {$push: {rols: rolCreated}})
        } catch (error) {
            throw error;
        }
    }

    async deleteRoleToUser(email, rolName, opts = undefined) {
        try{
            const {user, existsRol} = await validation(email, rolName)
            if (!existsRol) {
                const error = new Error();
                error.status = 400;
                error.message = "The rol doesn't exist to this user";
                throw error;
            }
            await _user.findByIdAndUpdate(user._id, {$pull: {rols: existsRol._id}})
            return _rol.findByIdAndDelete(existsRol._id);
        }catch (error){
            throw error;
        }
    }
}

module.exports = RolRepository;

const validation = async (email, rolName) => {
    let user = await _user.findOne({email});
    if (!user) {
        const error = new Error();
        error.status = 400;
        error.message = "email doesn't exist";
        throw error;
    }
    let existsRol = await _rol.findOne({UserId: user._id, type: rolName})
    return {user, existsRol}
}
