import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connects to the MongoDB database using the provided MongoDB URI.
 * If a connection already exists, it will reuse the existing connection.
 * Otherwise, it will create a new connection.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is established or rejects with an error.
 */
export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('=> using existing database connection')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
    }  )
        isConnected = true
        console.log('=> using new database connection')
    } catch (error) {
        console.log(error)
    }
}