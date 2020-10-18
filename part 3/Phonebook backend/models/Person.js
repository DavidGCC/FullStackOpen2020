const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const personSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, unique: true },
    number: { type: String, required: true, minlength: 8 }
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
    transform: (document, rObj) => {
        rObj.id = rObj._id.toString();
        delete rObj._id;
        delete rObj.__v;
    }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;