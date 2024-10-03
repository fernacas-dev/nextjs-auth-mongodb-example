import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: true,
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minlength: [3, "Fullname must be at least 3 characters long"],
    maxlength: [50, "Fullname cannot be more than 50 characters long"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
