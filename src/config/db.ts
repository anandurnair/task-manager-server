import mongoose from 'mongoose';

function dbConnection() {
    const URL: string = process.env.MONGO_URL as string;

    mongoose.connect(URL, {
        serverSelectionTimeoutMS: 30000
    })
    .then(() => console.log('Connection successful'))
    .catch((err: Error) => console.error('Database connection error:', err));

    // Handle connection events
    mongoose.connection.on('error', (err) => {
        console.error('Database error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('Database disconnected');
    });
}

export default dbConnection;

