import mongoose, {Schema} from 'mongoose';

const AuthUserSchema = new Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	roles: [{ type: String, ref: 'auth_role' }],
})

const AuthUser = mongoose.model('AuthUser', AuthUserSchema);

export default AuthUser;