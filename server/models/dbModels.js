const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGO_URI = 'mongodb+srv://onoGrindz:onoGrindz@onogrindz.kgcfk.mongodb.net/retryWrites=true&w=majority';

// establishing connection to MongoDB
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'onoGrindz'
    })

  .then(() => {
    console.log('Connected to Mongo DB.');
  })
  .catch((err) => {
    console.log(`Error connecting to Mongo DB: ${err}`);
  });

  const restaurantSchema = new Schema({
    id: { type: String},
    name: { type: String, required: true },
    display_phone: { type: String },
    location: {
      address1: { type: String },
      city: { type: String },
      zip_code:{ type: String }
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    photos: [],
    hours: [],
    special_hours: [],
  });

  const userSchema = new Schema({
    email: { type: String, required: true },
    subscription: [restaurantSchema]
    });

const User = mongoose.model('Grindz', userSchema);
const Restaurants = mongoose.model('Restaurants', restaurantSchema)

module.exports = {
    User,
    Restaurants
}

//user: onoGrindz
//pw: onoGrindz

//gmail: csbigtassels@gmail.com
//pw: codesmith