# InfinityPoll - Realtime Polling Chat Application 

## Queries arised during working on the project 


### what is the difference between, user and user._doc, if its returning the same data ?
- **Direct Access vs. Document Object:**
- **user**: When you access user, you are typically working with the Mongoose document object itself. This object has various methods and properties provided by Mongoose for interacting with the database, managing data, and enforcing schema validations.
- **user._doc**: Accessing user._doc gives you direct access to the underlying JavaScript object that represents the document's data. This object doesn't have the additional methods and properties provided by Mongoose. It's a plain JavaScript object (POJO).
