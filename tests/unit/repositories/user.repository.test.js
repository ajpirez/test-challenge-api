const { UserRepository,
  RolRepository
} = require("../../../src/repositories");
const mockingoose = require('mockingoose');
const { User,
  Rol
} = require("../../../src/models");
let {
  UserModelMock: { users, user }
} = require("../../mocks");

describe("User Repository Tests", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("Should return a user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOne");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.get(_user._id);
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should find a user by username", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOne");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getUserByEmail(_user.email);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should return a user collection", async () => {
    users = users.map(user => {
      delete user.password;
      return user;
    });
    mockingoose(User).toReturn(users, "find");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getAll();
    expect(JSON.parse(JSON.stringify(expected.elements))).toMatchObject(users);
  });

  it("Should update an especific user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, "findOneAndUpdate");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.update(user._id, {
      name: "Alejandro"
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should delete an especific user by id", async () => {
    mockingoose(User).toReturn(user, "findOneAndDelete");
    mockingoose(Rol).toReturn({ deletedCount: 1 }, "deleteMany")

    const _userRepository = new UserRepository({ User,Rol });
    const result = await _userRepository.delete(user._id);

    expect(result).toEqual(true);
  });
});
