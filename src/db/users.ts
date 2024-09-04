import mongoose, { Document, Schema } from 'mongoose';
import { ProgramModel } from './programs';

// Define enum as string values for Mongoose schema
enum Goal {
  LOSE_WEIGHT = 'GOAL_LOSE_WEIGHT',
  GAIN_WEIGHT = 'GOAL_GAIN_WEIGHT',
  TONE = 'GOAL_TONE',
}

// Interface for the User document
interface User extends Document {
  email: string;
  username: string;
  isAdmin: boolean;
  weight: number;
  height: number;
  goal: Goal;
  age: number;
  gender: boolean;
  currentMealProgram: mongoose.Schema.Types.ObjectId;
  currentWorkoutProgram: mongoose.Schema.Types.ObjectId;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

// Mongoose schema for the User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  isAdmin: { type: Boolean },
  weight: { type: Number },
  height: { type: Number },
  goal: { type: String, enum: Object.values(Goal) },
  age: { type: Number },
  gender: { type: Boolean },
  currentMealProgram: { type: mongoose.Schema.Types.ObjectId, ref: ProgramModel },
  currentWorkoutProgram: { type: mongoose.Schema.Types.ObjectId, ref: ProgramModel },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Export the User model
export const UserModel = mongoose.model<User>('User', UserSchema);


// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);