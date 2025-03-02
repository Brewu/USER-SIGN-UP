const bcrypt=require('bcrypt')

const hashData=async (data,saltRounds=10)=>{
    try {
        const hashedData=await bcrypt.hash(data,saltRounds);
        return hashedData
    } catch (error) {
        throw error
    }
}

const verifyhashedData = async (unhashed, hashed) => {
    try {
        return await bcrypt.compare(unhashed, hashed);
    } catch (error) {
        console.error("Error verifying hashed data:", error);
        return false; // Explicitly return false on error
    }
};

module.exports = { verifyhashedData };

module.exports={hashData,verifyhashedData}