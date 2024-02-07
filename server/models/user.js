const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
  // polls represents a field in the userSchema that holds an array of ObjectIds referencing documents in the "Poll" collection.
  // It's an array ([]) containing objects.
  // Each object in the array has two properties: [type, ref]
  // type: This specifies the data type of the elements in the array. In this case, it's mongoose.Schema.Types.ObjectId, indicating that the elements will be MongoDB ObjectId values.
  // ref: This specifies the name of the collection that the ObjectId refers to. In this case, it refers to the "Poll" collection.
});


// A pre-save hook is a middleware function that executes before saving a document to the database. 
userSchema.pre('save', async function(next) {
  try {

    // Inside the hook function, it first checks if the password field of the document is modified. If the password is not modified, it skips the hashing process and proceeds to the next middleware in the stack by calling next().
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});


// comparePassword method is intended to be used to compare a plain-text password attempt with the hashed password stored in the user document. It's typically used during the authentication process to verify whether a provided password matches the user's actual password.

// In MongoDB with Mongoose, the methods property is used to define instance methods for documents that are based on a specific schema. These methods are defined on the schema level and are accessible on individual documents created from that schema. They allow you to define custom functionality that operates on specific instances of documents.
// The methods property is a way to extend the functionality of Mongoose schemas by adding custom methods that can be called on individual documents. These methods can perform various operations such as data manipulation, validation, or interaction with other parts of your application.

userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
