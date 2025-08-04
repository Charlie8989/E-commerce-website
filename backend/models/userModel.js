import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } //we use minimize cuz if we did'nt use this then empty cartData waala account nhi bnega
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
