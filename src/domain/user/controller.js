const { hashData } = require("./hashData");
const User = require("./model");

const createUser = async (data) => {
    try {
        const { name, email, password } = data;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists"); // ✅ Correct error throwing
        }

        // Hash the password properly
        const hashedPassword = await hashData(password); // ✅ Fix hashing

        // Create new user with hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // ✅ Ensure hashed password is used
        });

        // Save user to database
        const createdUser = await newUser.save();
        return createdUser;
    } catch (err) { 
        console.error("Error in createUser:", err.message); // Debugging
        throw new Error(err.message || "Something went wrong");
    }
};

module.exports = { createUser };
