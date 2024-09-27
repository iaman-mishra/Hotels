const mongoose = require("mongoose");
const bcrypt = require("bcrypt");  // Corrected the import
const passport = require("passport");  // This can be removed if not used

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    work: {
        type: String,
        enum: ["chef", "manager", "waiter", "user"],
        required: true,
        default: "user"
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String,
        default: "1234"
    }
});

// Pre-save hook to hash password before saving to database
personSchema.pre("save", async function (next) {
    const curr = this;
    
    // Check if the password has been modified
    if (!curr.isModified("password")) return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPWD = await bcrypt.hash(curr.password, salt);

        // Override the current password with the hashed password
        curr.password = hashedPWD;

        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare entered password with stored hashed password
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Use await since bcrypt.compare returns a Promise
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

// Create and export the Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;