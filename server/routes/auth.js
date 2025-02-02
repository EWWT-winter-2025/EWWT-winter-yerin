const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword, nickname } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      username,
      password: hashedPassword,
      nickname
    });

    await user.save();

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, userId: user._id, nickname: user.nickname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
