import mongoose, { Schema, Document } from 'mongoose';





export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: Number, required: true, unique: true }, 
    role: { type: String, required: true },
    credits: { type: Number, required: true, default: 5 },

}, {
    timestamps: true
});




const User = mongoose.model('User', UserSchema);
export default User;
