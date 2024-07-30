let _userService = null;

class UserController {
    constructor({UserService}) {
        _userService = UserService;
    }

    async get(req, res) {
        const {userId} = req.params;
        const user = await _userService.get(userId);
        return res.send(user);
    }

    async getAll(req, res) {
        const {limit, page} = req.query;
        const users = await _userService.getAll(limit, page);
        return res.send(users);
    }

    async update(req, res) {
        const {userId} = req.params;
        const updatedUser = await _userService.update(userId, {...req.body});
        return res.send(updatedUser);
    }

    async delete(req, res) {
        const {userId} = req.params;
        if( userId === req.user.id){
            throw new Error("You can't delete yourself.");
        }
        const deletedUser = await _userService.delete(userId);
        return res.send(deletedUser);
    }
}

module.exports = UserController;
