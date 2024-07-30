const mongoose = require("mongoose");
const {Schema} = mongoose;
const {
    compareSync,
    hashSync,
    genSaltSync
} = require("bcryptjs");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, " name is required"]
    },
    lastName: {
        type: String,
        required: [false]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    age: {
        type: Number,
        required: [false]
    },
    grade: {
        type: Number,
        required: [false],
        min: 1,
        max: 5
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    rols: [
        {
            type: Schema.Types.ObjectId,
            ref: "rol",
            required: true,
            autopopulate: true
        }
    ]
});

UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
};

UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
};

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
    next();
});

UserSchema.plugin(require("mongoose-autopopulate"));
UserSchema.index({email: 1})
module.exports = mongoose.model("students", UserSchema);
