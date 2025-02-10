//groupList.js

import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    console.log('찾은 그룹:', groups);
    res.json(groups);
  } catch (error) {
    console.error('그룹 조회 중 오류 발생:', error);
    res.status(500).json({ message: '그룹 목록을 가져오는 데 실패했습니다.', error: error.message });
  }
});


export default router;
