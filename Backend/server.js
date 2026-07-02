require('dotenv').config();
const app=require('./src/app');
const connectDB=require("./src/config/db")
const {resume,jobDescription,selfDescription}=require('./src/services/temp')
const generateReport=require('./src/services/ai.services')

connectDB();

// generateReport({resume,jobDescription,selfDescription});

app.listen(3000,()=>{
    console.log("Server is running on the Port 3000");
})