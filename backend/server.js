const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const mongoose = require("mongoose")
const app = express();
const cors = require('cors');
dotenv.config();

const uri = process.env.MONGO;

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch((err)=>{
    console.log("Cant connect to MongoDB server "+err);
})

app.use(express.json());
app.use(cors());

app.get("/",async(req,res)=>{
    res.send("Running");
});

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`A szerver elindult. Port: ${PORT}`))