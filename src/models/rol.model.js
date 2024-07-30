const mongoose = require("mongoose");
const {Schema} = mongoose;

const RolSchema = new Schema({
    type: {
        type: String,
        enum: ["Admin", "Client"],
        message: '{VALUE} is not supported',
        default: "Client"
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'UserId is required'],
        autopopulate: false
    },

});

RolSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("rol", RolSchema);
