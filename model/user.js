import mongoose, {Schema, SchemaTypes} from 'mongoose';

const schema = new Schema({
	name: {
		type: SchemaTypes.String,
		default: '',
		required: true
	},
	
	userIP: {
		type: SchemaTypes.String,
		default: '',
		required: true
	},
	
	userAgent: {
		type: SchemaTypes.String,
		default: '',
		required: true
	},
	
	referrer: {
		type: SchemaTypes.String,
		default: '',
		required: true
	},
	
	acceptLanguage: {
		type: SchemaTypes.String,
		default: '',
		required: true
	},
}, {timestamps: true}); // Автоматом додасть поля createdAt, updatedAt (час створення і час оновлення запису)

// TODO: 3 аргументом указываем ранее созданную коллекцию (если ранее была создана)
const model = mongoose.model('user', schema, 'user');
export default model;
