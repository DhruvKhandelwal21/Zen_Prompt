import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true,"Email is Required"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true,"Username is Required"],
    unique: true,
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  },
  
});
const Users = models.Users || model('Users', userSchema);

export default Users;