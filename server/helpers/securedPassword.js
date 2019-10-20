import bcrypt from 'bcrypt';

export const encryptPassword = (pswd) => bcrypt.hashSync(pswd, Number(process.env.PASSWORD_SALT));
export const decryptPassword = (userPswd, hashedPswd) => bcrypt.compareSync(userPswd, hashedPswd);
