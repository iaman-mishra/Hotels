const Person = require("./Modules/person.js");  // Importing the person model
const passport = require("passport");           // Importing passport
const LocalStrategy = require("passport-local").Strategy;  // Correct LocalStrategy import

// Define the local strategy for Passport.js
passport.use(new LocalStrategy(async (uname, pwd, done) => {
    console.log("Received Credentials");

    try {
        // Find the user by username
        const user = await Person.findOne({ username: uname });

        // If no user is found, return an error message
        if (!user) {
            return done(null, false, { message: "Invalid username" });
        }

        // Compare the provided password with the stored hashed password
        const isValid = await user.comparePassword(pwd);

        // If the password matches, return the user object
        if (isValid) {
            return done(null, user);
        } else {
            // If the password doesn't match, return an error message
            return done(null, false, { message: "Invalid password" });
        }
    } catch (error) {
        // Handle any other errors that occur
        return done(error);
    }
}));

module.exports = passport;
