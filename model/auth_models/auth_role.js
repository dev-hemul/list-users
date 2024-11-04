import mongoose, {Schema} from 'mongoose';

const UserRoleSchema = new Schema({
	value: {type: String, unique: true, default: 'USER'},
})

const UserRole = mongoose.model('UserRole', UserRoleSchema);

export default UserRole;