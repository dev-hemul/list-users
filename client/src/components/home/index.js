import React from 'react';
import CreateUser from './../CreateUser.jsx';
import ShowUsers from './../ShowUsers.jsx';

const Index = () => {
	return (
		<div>
			<h1 className="text-center mb-5 text-3xl">Список покупців:</h1>
			<div className="flex justify-center sm:flex-col flex-wrap gap-3 md:flex-row">
				<div className="mb-10"><CreateUser/></div>
				<ShowUsers/>
			</div>
		</div>
	);
};

export default Index;