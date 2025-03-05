import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user_interface";
import bcrypt from "bcrypt";
import config from "../../../config";


const userSchema = new Schema<TUser, UserModel>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  });
  
  // Hash the password before saving the user
  userSchema.pre('save', async function (next) {
    
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    }
  
    next();
  });
  
  // Remove password from the response after saving
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
  // Static method to check if the user exists by email
  userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({ email });
  };
  
  // Static method to compare passwords
  userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  
  // Create the User model
  export const User = model<TUser, UserModel>('User', userSchema);