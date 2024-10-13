import User from './user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default class UserController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send({
          success: false,
          message: 'Please provide name, email, and password.'
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: 'Email already in use.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });

      await newUser.save();

      return res.status(201).send({
        success: true,
        message: 'Account created successfully.'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Internal server error.'
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: 'Please provide email and password.'
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        '123', 
        { expiresIn: '1h' }
      );

      return res.status(200).send({
        success: true,
        message: 'Login successful.',
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Internal server error.'
      });
    }
  }
}
