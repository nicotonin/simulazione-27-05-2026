import { Schema, model } from 'mongoose';
import { User } from './user.entity';

const userSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    role: { type: String, enum: ['role1', 'role2',"Role1","Role2"], required: true },
   
})

userSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete (ret as unknown as any)._id;
        delete (ret as unknown as any).__v;
        return ret;
    }
});

userSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete (ret as unknown as any)._id;
        delete (ret as unknown as any).__v;
        return ret;
    }
});

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

export const UserModel = model<User>('User', userSchema);
