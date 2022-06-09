import inputLengthValidator from './inputLengthValidator';

export const validateCourse = ({ title, description, duration, authors }) => {
	if (!inputLengthValidator(title) || !inputLengthValidator(description)) {
		return false;
	}

	if (!parseInt(duration)) {
		return false;
	}

	if (authors.length === 0) {
		return false;
	}

	return true;
};
