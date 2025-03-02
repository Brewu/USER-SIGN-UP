const app= require("./app")


const startApp=()=>{
    const {PORT}=process.env
    app.listen(PORT,()=>{
        console.log(`Backend runing on port ${PORT}`)
    })
}
startApp()