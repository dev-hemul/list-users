import React, {useState} from 'react';
import axios from 'axios';

const CreateUser = () => {
	const [formData, setFormData] = useState({
		name: ''
	});
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы
		
		try {
			const response = await axios.post('http://157.230.115.142/createUser', formData);
			console.log('Form submitted successfully:', response.data);
			setFormData({
				name: "", // Очищаем поле name
			});
			
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};
	
	return (
		<div
			className="flex flex-col justify-center items-center p-4 bg-zinc-50 size-80">
			<h1 className="text-2xl text-center mb-3">Добавити нового:</h1>
			<form className="flex-col" name="createUser" onSubmit={handleSubmit}>
				<input
					className="w-full border-2 border-red-100 p-1 mb-10 outline-0"
					type="text"
					name="name"
					id="name"
					value={formData.name}
					onChange={handleChange}
				/>
				<button className="
          border-2
          border-red-300
          bg-white p-4
          outline-0
          hover:bg-amber-200
          " type="submit">Відправити
				</button>
			
			</form>
		</div>
	);
};

export default CreateUser;
