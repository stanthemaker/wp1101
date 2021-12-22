let username = "";

const getDefaultName = () => username;
const updateDefaultName = (newusername) => {
	username = newusername;
	return;
};
module.exports = { getDefaultName, updateDefaultName };
