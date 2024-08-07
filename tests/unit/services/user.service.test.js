const { UserService } = require("../../../src/services");
const { UserRepositoryMock } = require("../../mocks");
const {
  UserModelMock: { user, users }
} = require("../../mocks");

describe("User Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should find a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.get.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.get(user._id);
    expect(expected).toMatchObject(user);
  });

  it("Should find a user by email", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getUserByEmail.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getUserByEmail(user.email);
    expect(expected).toMatchObject(user);
  });

  it("Should return a user collection", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getAll.mockReturnValue(users);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getAll();
    expect(expected).toMatchObject(users);
  });

  it("Should update a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.repository.update(user._id, user);
    expect(expected).toMatchObject(user);
  });

  it("Should delete a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.delete.mockReturnValue(true);

    const _userService = new UserService({ UserRepository });

    const expected = await _userService.repository.delete(user._id);
    expect(expected).toEqual(true);
  });

  it("Should delete all users by ids", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.deleteMany.mockReturnValue(true);

    const _userService = new UserService({ UserRepository });

    const expected = await _userService.repository.deleteMany(users.map(user => user._id));
    expect(expected).toEqual(true);
  });

});
