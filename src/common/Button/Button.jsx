import React from 'react';

import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ buttonText, className, ...attributes }) => {
	return (
		<button {...{ className: className + ' button btn-reset', ...attributes }}>
			{buttonText || attributes.children}
		</button>
	);
};

Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default Button;
