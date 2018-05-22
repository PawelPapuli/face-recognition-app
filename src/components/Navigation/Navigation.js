import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {

		if (isSignedIn) {
			return (
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={() => onRouteChange('signIn')} className='f4 pa4 dark-blue link underline pointer dim'>Sign out</p>
				</nav>
			);
		} else 
			return (
				<div></div>
			)
}


export default Navigation;