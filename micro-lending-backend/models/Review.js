const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    reviewee: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    commnets: {type: String},
    dateCreated: {type: Date, default: Date.now}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;