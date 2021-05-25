const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGO_URI = 'mongodb+srv://onoGrindz:onoGrindz@onogrindz.kgcfk.mongodb.net/retryWrites=true&w=majority';

// establishing connection to MongoDB
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'onoGrindz'
    })
  .then(() => {
    console.log('Connected to Mongo DB.');
  })
  .catch((err) => {
    console.log(`Error connecting to Mongo DB: ${err}`);
  });

const userSchema = new Schema({
  email: { type: String, required: true, unique: true},
  subscription: {},
  });

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
