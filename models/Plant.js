const mongoose = require('mongoose');
const { Schema } = mongoose;
const PlantsSchema = new Schema({
 _id: { type: Schema.ObjectId, auto: true },
  plantName:String,
  plantStatus:Number,
  plantOffer: String,
  plantSizePrice: [{size : String, price : Number}],
  plantDisc:String,
  plantColor:[String],
  plantType:String,
  plantCare:{light:String, water :String, tip: String},
  plantCategory:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category"},
    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"},
  plantPio:String,


});
mongoose.model('Plant', PlantsSchema);