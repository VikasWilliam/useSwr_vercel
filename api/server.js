const express=require("express");
const cors= require("cors");
const app=express();
const PORT=5000;

app.use(cors());

app.get("/data", (req,res)=>{
    const data={
        timeStamp: new Date().toISOString(),
        message: "Hello from API"
    };
    res.json(data);
})

app.listen(PORT,()=>{
    console.log(`API server running on http://localhost:${PORT}`);
})


