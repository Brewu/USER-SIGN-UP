const express=require("express")
const router=express.Router()
const {createUser, authenticateUser,}=require('./controller')
router.post("/", async (req, res) => {
    try {
        let { email, password } = req.body;
        
        // Trim input values
        email = email?.trim();
        password = password?.trim();
        
        // Validate input
        if (!email || !password) {
            throw new Error("Empty credentials. Try again");
        }

        // Authenticate user (assuming you have a function named authenticateUser)
        const authenticatedUser = await authenticateUser({ email, password });

        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).send(error?.message || "An error occurred");
    }
});

router.post('/SignUp',
async(req, res)=>{
    try {
       let {name,email,password}=req.body;
       name= name.trim()
       email=email.trim()
        password=password.trim()
       if(!(name,email,password)){
        throw error("Empty fields")
       }
       else if( !/^[a-zA-Z ]*$/.test(name)
       ){
   throw new Error("Invalid name")
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
       throw new Error("Invalid email")
    }
    else if(password.lenth<8){
        throw error("Password is short")
    }
    else{
        //Create User
const newUser=await createUser({
    name,
    email,
    password
})
res.status(200).json(newUser)
    }
    } catch (error) {
      res.status(400).send(error.message)  
    }
}
)

module.exports=router