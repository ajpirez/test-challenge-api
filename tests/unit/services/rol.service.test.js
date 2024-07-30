const { RolService} = require("../../../src/services");
const {RolRepositoryMock} = require("../../mocks");
const {
    UserModelMock: {user}, RolModelMock: {rols, rol}
} = require("../../mocks");

describe("Rol Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a rol by id", async () => {
        const RolRepository = RolRepositoryMock;
        RolRepository.get.mockReturnValue(rol);

        const _rolService = new RolService({RolRepository});
        const expected = await _rolService.get(rol._id);
        expect(expected).toMatchObject(rol);
    });

    it("Should return a rol collection", async () => {
        const RolRepository = RolRepositoryMock;

        RolRepository.getAll.mockReturnValue(rols);

        const _rolService = new RolService({RolRepository});
        const expected = await _rolService.getAll();
        expect(expected).toMatchObject(rols);
    });

    it("Should add a Role To User", async () => {
        const RolRepository = RolRepositoryMock
        RolRepository.addRoleToUser.mockReturnValue(user);

        const _rolService = new RolService({RolRepository});
        const expected = await _rolService.repository.addRoleToUser(user.username, rol.type);
        expect(expected).toMatchObject(user);
    });

    it("Should delete a role to user", async () => {
        const RolRepository = RolRepositoryMock
        RolRepository.deleteRoleToUser.mockReturnValue(user);

        const _rolService = new RolService({RolRepository});
        const expected = await _rolService.repository.deleteRoleToUser(user.username, rol.type);
        expect(expected).toMatchObject(user);
    });
});
