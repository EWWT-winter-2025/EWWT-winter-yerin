import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

// 그룹 목록 조회
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: '그룹 목록을 가져오는 데 실패했습니다.', error: error.message });
  }
});

// 새 그룹 생성
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

// 그룹 수정
router.put('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, description, color } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, description, color },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
    }

    res.json({ message: '그룹이 수정되었습니다.', group: updatedGroup });
  } catch (error) {
    res.status(500).json({ message: '그룹 수정에 실패했습니다.', error: error.message });
  }
});

// 그룹 삭제
router.delete('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
    }

    res.json({ message: '그룹이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '그룹 삭제에 실패했습니다.', error: error.message });
  }
});

// 멤버 추가
router.post('/:groupId/members', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, position, profileImage } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
    }

    group.members.push({ name, position, profileImage });
    await group.save();

    res.status(201).json({ message: '멤버가 추가되었습니다.', member: group.members[group.members.length - 1] });
  } catch (error) {
    res.status(500).json({ message: '멤버 추가에 실패했습니다.', error: error.message });
  }
});

// 멤버 수정
router.put('/:groupId/members/:memberId', async (req, res) => {
  try {
    const { groupId, memberId } = req.params;
    const { name, position, profileImage } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
    }

    const member = group.members.id(memberId);
    if (!member) {
      return res.status(404).json({ message: '멤버를 찾을 수 없습니다.' });
    }

    member.name = name;
    member.position = position;
    member.profileImage = profileImage;

    await group.save();

    res.json({ message: '멤버가 수정되었습니다.', member });
  } catch (error) {
    res.status(500).json({ message: '멤버 수정에 실패했습니다.', error: error.message });
  }
});

// 멤버 삭제
router.delete('/:groupId/members/:memberId', async (req, res) => {
   try {
     const { groupId, memberId } = req.params;
 
     const group = await Group.findById(groupId);
     if (!group) {
       return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
     }
 
     group.members.pull({ _id: memberId });
     await group.save();
 
     res.json({ message: '멤버가 삭제되었습니다.' });
   } catch (error) {
     console.error('멤버 삭제 중 오류 발생:', error);
     res.status(500).json({ message: '멤버 삭제에 실패했습니다.', error: error.message });
   }
 });
 

// 그룹 멤버 조회
router.get('/:groupId/members', async (req, res) => {
   try {
     const { groupId } = req.params;
     const group = await Group.findById(groupId);
     if (!group) {
       return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
     }
     res.json(group.members);
   } catch (error) {
     res.status(500).json({ message: '멤버 목록을 가져오는 데 실패했습니다.', error: error.message });
   }
 });

export default router;
