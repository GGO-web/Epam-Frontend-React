const getAuthorById = (mockedAuthorsList, id) => {
	for (let author of mockedAuthorsList) {
		if (author.id === id) {
			return author.name;
		}
	}

	return '';
};

export default getAuthorById;
