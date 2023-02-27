import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: 'guest' | 'admin';
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'admin'], default: 'guest' },
});

const User = mongoose.model<IUser>('User', userSchema);

export { IUser, User };
