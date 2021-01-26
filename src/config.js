
const {
    JWT_SECRET,
    DB_USER,
    DB_PASS,
    DB_HOST,
    API_URL,
    API_KEY
} = process.env;


const MONGODB_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const PORT = 3000;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

export {
    MONGODB_URI,
    JWT_SECRET,
    PORT,
    API_URL,
    API_KEY
}