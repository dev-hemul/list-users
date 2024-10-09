import mongoose, {Schema, SchemaTypes} from 'mongoose';

const schema = new Schema({
	name: {
		type: SchemaTypes.String,
		default: '',
		minlength: 3,
		maxLength: 30,
	}
}, {timestamps: true}); // Автоматом додасть поля createdAt, updatedAt (час створення і час оновлення запису)

// TODO: 3 аргументом указываем ранее созданную коллекцию (если ранее была создана)
const model = mongoose.model('user', schema, 'user');
export default model;
