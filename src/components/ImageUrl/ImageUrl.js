import React from 'react';
import './ImageUrl.css';
const ImageUrl = ({onUrlChange, onButtonClick, onError}) => {
	return (
		<div>
			<p className='f4 white-90'>
				{'I want to detect a face in your picture. Try me:'}
			</p>
			<div className=' wrapping-div center'>
				<div className='form center pa4 br4 shadow-5'>
					<input type='text' className='f4 pa2 w-70 center' onChange={onUrlChange}/>
					<button className='pointer link grow w-30 link ph3 bg-blue white-90' onClick={onButtonClick}>Upload</button>
				</div>
			</div>
		</div>
	);
}

export default ImageUrl;