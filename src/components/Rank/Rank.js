import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white-90 f3'>
				{`${name}, that's number of photos you've submitted: `}
			</div>
			<div className='white-90 f3'>
				{entries}
			</div> 
			</div>
	);
}

export default Rank;