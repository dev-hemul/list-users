import React from 'react';

const LoginPage = () => {
	return (
		<div className="p-10">
			<h1 className='text-4xl text-center p-0 mt-10 mb-20'>Сторінка авторизації</h1>
			<form className="flex flex-col items-center justify-center">
				<p className="flex flex-col w-full max-w-[600px]">
					<label className="text-center text-2xl mb-5" htmlFor="login">Введіть логін:</label>
					<input className="border border-amber-300 mb-5 p-5 w-full focus:border-amber-500 focus:outline-none" type="text" name="login" id="login" placeholder="Ваш логін" required/>
				</p>
				<p className="flex flex-col w-full max-w-[600px]">
					<label className="text-center text-2xl mb-5" htmlFor="password">Уведіть пароль:</label>
					<input className="border border-amber-300 mb-5 p-5 w-full focus:border-amber-500 focus:outline-none" type="password" name="login" id="password" placeholder="Ваш пароль" required/>
				</p>
				
				<button type="button" className="mt-7 p-5 border border-amber-500 text-2xl bg-amber-500 text-white rounded-lg transition-all duration-200 ease-in-out hover:bg-amber-600 hover:scale-105">Відправити</button>
			</form>
		</div>
	);
};

export default LoginPage;