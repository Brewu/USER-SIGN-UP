const { hashData,verifyhashedData } = require("./hashData");
const User = require("./model");
const createToken=require("./../../domain/user/createToken")
const authenticateUser = async (data) => {
    try {
        const { email, password } = data;
        
        // Find user by email
        const fetchedUser = await User.findOne({ email });
        if (!fetchedUser) {
            throw new Error("Invalid email entered");
        }

        // Verify password
        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyhashedData(password, hashedPassword);
        if (!passwordMatch) {
            throw new Error("Invalid password entered");
        }

        // Generate authentication token
        const tokenData = { userId: fetchedUser._id, email };
        const token = await createToken(tokenData);

        // Return only necessary user info
        return {
            id: fetchedUser._id,
            email: fetchedUser.email,
            name: fetchedUser.name, // Assuming user has a "name" field
            token, // Send token for authentication
        };
    } catch (error) {
        throw new Error(error.message || "Authentication failed");
    }
};

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
}


module.exports = { createUser, authenticateUser};
