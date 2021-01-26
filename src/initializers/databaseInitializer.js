import mongoose from 'mongoose';

export const initializeDb = async (mongoUri) => {
    mongoose.connect(
        mongoUri,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            bufferMaxEntries: 0,
            poolSize: 10
        }
    );
    mongoose.set('useFindAndModify', false);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return db;
};
