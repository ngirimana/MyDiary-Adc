import bcrypt from 'bcrypt';

export const encryptPassword = (pswd) => bcrypt.hashSync(pswd, Number(process.env.PASSWORD_SALT));
