import mongoose, { Schema, Document, Model } from 'mongoose';
import  { UserInterface, Address } from '../../users/interfaces/UserInterface';

const addressSchema = new Schema<Address>({
  city: { type: String, required: true },
  street: { type: String, required: true },
  apartment_number: { type: Number, required: true },
});

const userSchema = new Schema<UserInterface>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: addressSchema, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel: Model<UserInterface> = mongoose.model('user', userSchema);

export default UserModel;
