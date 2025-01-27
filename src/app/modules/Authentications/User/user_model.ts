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
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

    next();
});

userSchema.post('save', function (doc, next){
    doc.password = '';
    next();
});

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({email});
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
}


export const User = model<TUser, UserModel>('User', userSchema);