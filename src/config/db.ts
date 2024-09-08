import mongoose from 'mongoose';

function dbConnection() {
    const URL: string = process.env.MONGO_URL as string;
    mongoose.connect(URL)
    .then(() => console.log('Connection successful'))
    .catch((err: Error) => console.log(err));
}

export default dbConnection;
