import React, { useId } from 'react';

import PropTypes from 'prop-types';

import './Textarea.css';

const Textarea = ({ placeholderText, labelText, className, ...props }) => {
	const textareaId = useId();

	return (
		<label className='textarea-label' htmlFor={textareaId}>
			{labelText ? <p className='textarea-label__text'>{labelText}</p> : ''}
			<textarea
				id={textareaId}
				placeholder={placeholderText}
				{...{ className: className + ' textarea', ...props }}
			></textarea>
		</label>
	);
};

Textarea.propTypes = {
	placeholderText: PropTypes.string,
	labelText: PropTypes.string,
	className: PropTypes.string,
};

export default Textarea;
