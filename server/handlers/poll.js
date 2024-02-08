const db = require('../models');

exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find().populate('user', ['username', 'id']);
    // By using .populate(), you can fetch related documents from other collections in MongoDB and include specific fields from those documents in the result. In this case, it ensures that when you retrieve Poll documents, you also get some information about the associated User documents without needing to make additional queries.
    return res.status(200).json(polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.usersPolls = async (req, res, next) => {
  const { id } = req.decoded;
  // decoded likely refers to an object that holds the decoded information from a JSON Web Token (JWT).
  // we are requesting a decoded JSON Web Token
  // This line uses object destructuring to extract the id property from the decoded object, which presumably contains information about the authenticated user extracted from the JWT payload. This id is then used to query the database for the user's polls.

  try {
    const user = await db.User.findById(id).populate('polls');
    // This line queries the database to find the user with the specified id and populates the polls field of the user object.
    // populate() function is used to populate reference fields in a document of a certain collection with documents from another collection
    console.log("<usersPolls> User: ", user);

    return res.status(200).json(user.polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createPoll = async (req, res, next) => {
  const { id } = req.decoded;
  // This line extracts the id property from the decoded object, which likely contains information about the authenticated user extracted from a JSON Web Token (JWT) sent in the request.
  const { question, options } = req.body;
  try {
    const user = await db.User.findById(id);
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({ option, votes: 0 })),
    });
    user.polls.push(poll._id);
    await user.save();

    console.log("<createPoll>: ", poll._doc);

    return res.status(201).json({ ...poll._doc, user: user._id });
    // This object spread syntax ({ ... }) is used to create a new object containing all properties of poll._doc (the document returned by Mongoose) and add a new property user with the value of user._id.
    // The _doc property of a Mongoose Document contains this underlying raw JavaScript object, which includes the actual data of the document. It's called _doc because it's short for "document". The _doc property is essentially a JavaScript object that mirrors the structure of your Mongoose schema, representing the fields and their values for a given document.
    //  _doc is the field that the mongoose library uses internally that stores the data pulled directly from mongo. Mongoose has a client side framework that allows you to do virtual fields, apply middleware, and some other helper functions which are layered on top of the data returned.

  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.vote = async (req, res, next) => {

  const { id: pollId } = req.params;
  // This line extracts the value of the id property from the params object of the request.
  // It renames the extracted value to pollId using the aliasing syntax (:).

  const { id: userId } = req.decoded;
  const { answer } = req.body;
  try {
    if (answer) {
      const poll = await db.Poll.findById(pollId);
      if (!poll) throw new Error('No poll found');

      const vote = poll.options.map(
        option =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
              }
            : option,
      );
      // This code is iterating over the options array of a poll object and creating a new array called vote. For each element (option) in the options array, it checks if the option matches the provided answer. If there's a match, it creates a new object representing the updated option with one more vote added. If there's no match, it leaves the option unchanged.

      console.log('<poll.voted> : ', poll.voted);
      console.log(
        'VOTE: vote filter',
        poll.voted.filter(user => user.toString() === userId).length,
      );

      if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        return res.status(202).json(poll);
      } else {
        throw new Error('Already voted');
      }
    } else {
      throw new Error('No Answer Provided');
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await db.Poll.findById(id).populate('user', [
      'username',
      'id',
    ]);
    // After finding the Poll document, this line populates the user field of the poll document with data from the associated User document.
    // 'user' is the path to the field in the Poll schema that references the User model.

    if (!poll) throw new Error('No poll found');

    return res.status(200).json(poll);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deletePoll = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  try {
    let user = await db.User.findById(userId)
    if(user.polls) { // not sure if necessary either...
      user.polls = user.polls.filter(userPoll => {
        return userPoll._id.toString() !== pollId.toString() // not sure if necessary to use toString()
      })
    }
    
    const poll = await db.Poll.findById(pollId);
    if (!poll) throw new Error('No poll found');
    if (poll.user.toString() !== userId) {
      throw new Error('Unauthorized access');
    }
    await user.save()
    await poll.remove();
    return res.status(202).json({ poll, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
