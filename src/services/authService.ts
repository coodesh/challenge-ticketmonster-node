import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const signUp = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 14);
  const user = await User.create({ name, email, password: hashed, role: 1 });
  return user;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign(
    { user_id: user.id, role: user.role.toString() },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return { user, token };
};

export const promoteToAdmin = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.role = 0;
  await user.save();
  return user;
};
