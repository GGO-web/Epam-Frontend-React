import React from 'react';

import pipeDuration from '../../../../helpers/pipeDuration';

import Input from '../../../../common/Input/Input';

const Duration = ({ durationInput, setDurationInput }) => {
	const inputDurationHandler = (event) => {
		const value = +event.target.value;

		if (value <= 0) {
			setDurationInput('');
		} else {
			setDurationInput(value);
		}
	};

	return (
		<div className='course-form__item'>
			<h2 className='course-form__item-title'>Duration</h2>

			<Input
				labelText='Duration'
				placeholderText='Enter duration in minutes...'
				className='course-form__item-input'
				value={durationInput}
				onChange={inputDurationHandler}
				type='number'
				min='1'
				name='duration'
			></Input>

			<p className='course-form__duration'>
				Duration:
				<span className='course-form__duration-number'>
					{pipeDuration(durationInput)}
				</span>
				hours
			</p>
		</div>
	);
};

export default Duration;
