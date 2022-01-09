import bcrypt from "bcrypt";
//reference: https://www.youtube.com/watch?v=Ud5xKCYQTjM
const saltRounds = 10;
const myPassword = "password1";
const testPassword = "password2";
const myHash = "$2b$10$Ii0DAbr2qUVFfMElKVkaSec.fLTgaJITTCnFMn84G1uj4o.dk3WdC"; // for testing purpose
(async () => {
	const hash = await bcrypt.hash(myPassword, saltRounds);
	console.log(hash);
	console.log(myPassword);
	const res = await bcrypt.compare(myPassword, myHash);
	console.log(res);
	const res1 = await bcrypt.compare(myPassword, hash);
	console.log(res);
	const res2 = await bcrypt.compare(testPassword, myHash);
	console.log(res2);
})();
