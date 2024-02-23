const { default: mongoose } = require("mongoose")

// if there is already established conn doesnt connect again
// just return it 
const connection = {}

const connectToDb = async () => {
    try{
        if(connection.isConnected){
            // console.log("using the old connection")
            return
        }
        const db = await mongoose.connect(process.env.MONGO)
        connection.isConnected = db.connections[0].readyState

    }catch(error){
        console.log(error)
        throw new Error("There is an error in connecting to the database", error)
    }
}

export default connectToDb