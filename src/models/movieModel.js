import mongoose, { Schema, Document } from 'mongoose';

export const MovieSchema = new Schema({
    title: { type: String, required: true },
    fullTitle: { type: String, required: false },
    released: { type: Date, required: false },
    genre: { type: String, required: false },
    director: { type: String, required: false },
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true }

}, {
    timestamps: true
});


MovieSchema.index({ title: 1, owner: 1 }, { unique: true });


const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
