let _rolService = null;

class RolController {
    constructor({RolService}) {
        _rolService = RolService;
    }

    async get(req, res) {
        const {rolId} = req.params;
        const rol = await _rolService.get(rolId);
        return res.send(rol);
    }

    async getAll(req, res) {
        const {limit, page} = req.query;
        const rol = await _rolService.getAll(limit, page);
        return res.send(rol);
    }

    async create(req, res) {
        const createdRol = _rolService.create(req.body);
        return res.status(201).send(createdRol);
    }

    async update(req, res) {
        const {body} = req;
        const {rolId} = req.params;
        const updatedRol = await _rolService.update(rolId, body);
        return res.send(updatedRol);
    }

    async delete(req, res) {
        const {rolId} = req.params;
        const deletedRol = await _rolService.delete(rolId);
        return res.send(deletedRol);
    }

    async addRoleToUser(req, res) {
        const {email, rolName} = req.body;
        let data = await _rolService.addRoleToUser(email, rolName);
        return res.status(200).json(data)
    }
    async deleteRoleToUser(req,res){
        const {email, rolName} = req.body;
        let data = await _rolService.deleteRoleToUser(email, rolName);
        return res.status(200).json(data)
    }
}

module.exports = RolController;
