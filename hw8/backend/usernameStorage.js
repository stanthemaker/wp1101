let username;

const getUsername = () => username;
const updateUsername = (newusername) => {
	username = newusername;
	return;
};
module.exports = { getUsername, updateUsername };
