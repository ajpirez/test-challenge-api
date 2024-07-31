const { RolRepository} = require("../../../src/repositories");
const mockingoose = require('mockingoose');

const {User, Rol} = require("../../../src/models");
let {
    UserModelMock: {users, user}, RolModelMock: {rols, rol}
} = require("../../mocks");

describe("rol Repository Tests", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    it("Should return a rol by id", async () => {
        const _rol = {...rol};
        mockingoose(Rol).toReturn(rol, "findOne");
        const _rolRepository = new RolRepository({Rol});
        const expected = await _rolRepository.get(_rol._id);
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_rol);
    });

    it("Should return a rol collection", async () => {
        mockingoose(Rol).toReturn(rols, "find");

        const _rolRepository = new RolRepository({Rol});
        const expected = await _rolRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected.elements))).toMatchObject(rols);
    });

    it("Should add a role to one user", async () => {
        const _user = {...user};
        delete _user.password
        const _rol = {...rol}
        mockingoose(User)
            .toReturn(user, "findOne")
            .toReturn(rol, "findOne")
            .toReturn(rol, "save")
            .toReturn(user, "findOneAndUpdate")
        const _rolRepository = new RolRepository({User, Rol});
        const expected = await _rolRepository.addRoleToUser(_user.email, 'Client');
        expect(JSON.parse(JSON.stringify(expected._doc))).toMatchObject(_user);
    });

    it("Should delete a role to one user", async () => {
        const _user = {...user};
        delete _user.password
        const _rol = {...rol}
        mockingoose(User)
            .toReturn(user, "findOne")
        mockingoose(Rol)
            .toReturn(rol, "findOne")
            .toReturn(user, "findOneAndUpdate")
            .toReturn(rol, "findOneAndDelete")
        const _rolRepository = new RolRepository({User, Rol});
        const expected = await _rolRepository.deleteRoleToUser(_user.email, _rol.type);
        expect(JSON.parse(JSON.stringify(expected._doc))).toMatchObject(_rol);
    });
});
