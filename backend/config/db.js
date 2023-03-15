// const { MongoClient } = require('mongodb');

// const connectDB = async () => {
//     try{
//         const uri = process.env.MONGO_URI;

//         const client = new MongoClient(uri);

//     }catch(error){
//         console.log(error)
//         process.exit(1)
//     }
// }

// module.exports = connectDB

// OLD
const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${conn.connection.host}`)

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB