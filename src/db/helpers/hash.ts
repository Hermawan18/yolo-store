import bcrypt from 'bcryptjs';

const hashPassword = (password: string) => bcrypt.hashSync(password, 8);

const comparePassword = (password: string, hashPassword: string) => bcrypt.compareSync(password, hashPassword);

module.exports = { hashPassword, comparePassword };
