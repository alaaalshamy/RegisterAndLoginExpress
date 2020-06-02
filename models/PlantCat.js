const mongoose = require('mongoose');
const { Schema } = mongoose;
const CategoriesSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    catName: String,
    catStatus: Number,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});
mongoose.model('Category', CategoriesSchema);