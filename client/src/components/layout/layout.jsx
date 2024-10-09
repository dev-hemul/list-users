import React from 'react';

const Layout = ({ children }) => {
	return (
		<div className='flex-col justify-center py-10 px-20 bg-gray-200 h-screen'>
			{children} {/* Здесь рендерятся дочерние элементы */}
		</div>
	);
}

export default Layout;