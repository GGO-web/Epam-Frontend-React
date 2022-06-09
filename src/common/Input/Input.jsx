import React, { useId } from 'react';

import PropTypes from 'prop-types';

import './Input.css';

const Input = ({ placeholderText, labelText, className, ...props }) => {
	const inputId = useId();

	return (
		<label className='input-label' htmlFor={inputId}>
			{labelText ? <p className='input-label__text'>{labelText}</p> : ''}
			<input
				type='text'
				id={inputId}
				placeholder={placeholderText}
				{...{ className: className + ' input', ...props }}
			/>
		</label>
	);
};

Input.propTypes = {
	placeholderText: PropTypes.string.isRequired,
	labelText: PropTypes.string,
	className: PropTypes.string,
};

export default Input;
