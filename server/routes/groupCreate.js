// groupCreate.js

import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, description, color } = req.body;

  if (!name || !description || !color) {
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  }

  try {
    const newGroup = new Group({ name, description, color });
    await newGroup.save();
    res.status(201).json({ message: '그룹이 성공적으로 추가되었습니다.', group: newGroup });
  } catch (error) {
    res.status(500).json({ error: '그룹 추가에 실패했습니다.' });
  }
});

export default router;
