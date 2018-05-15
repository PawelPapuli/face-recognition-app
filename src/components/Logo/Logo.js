import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';

const Logo = () => {
	return (
		<div className = 'ma4 mt0'>
			<Tilt className="Tilt br2 shadow-3" options={{ max : 25 }} style={{ height: '100px', width: '100px' }} >
				<div className="Tilt-inner pa2">
					<img style={{paddingTop:'10px'}} alt='logo' src={logo}/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;