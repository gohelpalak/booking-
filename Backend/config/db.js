const mongoose = require('mongoose');

const dbConnect =()=>{
      mongoose.connect("mongodb+srv://gohelpalak14:palak%4022@cluster0.cjwxl.mongodb.net/Traveling_API")
    // mongoose.connect("mongodb://localhost:27017/Traveling_API")
            .then(() => {
                console.log("Database connected");
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    module.exports = dbConnect();