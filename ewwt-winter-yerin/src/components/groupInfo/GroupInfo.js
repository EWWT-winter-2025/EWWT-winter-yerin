import React, { useState } from "react";
import styles from "./GroupInfo.module.css";
import axios from "axios";
import { useEffect } from "react";

const GroupInfo = ({ group }) => {
   const [members, setMembers] = useState([]);
   const [newMember, setNewMember] = useState({ name: '', position: '', profileImage: '' });
   const [editingId, setEditingId] = useState(null);
 
   useEffect(() => {
      if (group && group._id) {
        fetchMembers();
      }
    }, [group._id]);
 
   const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/groups/${group._id}/members`);
        setMembers(response.data);
      } catch (error) {
        console.error("멤버 목록을 불러오는 데 실패했습니다:", error.response || error);
        // 에러 처리 로직 추가 
      }
    };
    
 
   const handleInputChange = (e) => {
     setNewMember({ ...newMember, [e.target.name]: e.target.value });
   };
 
   const handleAddMember = async () => {
      if (newMember.name && newMember.position) {
        try {
          const response = await axios.post(`http://localhost:5000/api/groups/${group._id}/members`, newMember);
          fetchMembers();
          setNewMember({ name: '', position: '', profileImage: '' });
        } catch (error) {
          console.error("멤버 추가에 실패했습니다:", error);
        }
      }
    };
 
   const handleEdit = (_id) => {
     setEditingId(_id);
   };
 
   const handleSave = async (id) => {
     try {
       const memberToUpdate = members.find(member => member._id === id);
       await axios.put(`http://localhost:5000/api/groups/${group._id}/members/${id}`, memberToUpdate);
       setEditingId(null);
       fetchMembers();
     } catch (error) {
       console.error("멤버 수정에 실패했습니다:", error);
     }
   };
 
   const handleDelete = async (_id) => {
      try {
        await axios.delete(`http://localhost:5000/api/groups/${group._id}/members/${_id}`);
        fetchMembers(); 
      } catch (error) {
        console.error("멤버 삭제에 실패했습니다:", error);
      }
    };
 
   const handleEditInputChange = (e, id) => {
     const { name, value } = e.target;
     setMembers(members.map(member => 
       member._id === id ? { ...member, [name]: value } : member
     ));
   };

  return (
    <div className={styles.groupInfoContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.groupName}>{group.name}</div>
        <div className={styles.groupColor} style={{ backgroundColor: group.color, borderRadius: 50, width: 30, height: 30 }} />
      </div>
      <div className={styles.dividerContainer}>
         <hr className={styles.divider}/>
      </div>
      
      <div className={styles.groupDescription}>{group.description}</div>

      <div className={styles.memberContainer}>
        <div className={styles.addMemberBox}>
          <input
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            placeholder="이름"
            className={styles.input}
          />
          <input
            type="text"
            name="position"
            value={newMember.position}
            onChange={handleInputChange}
            placeholder="포지션"
            className={styles.input}
          />
          <input
            type="text"
            name="profileImage"
            value={newMember.profileImage}
            onChange={handleInputChange}
            placeholder="프로필 사진 URL"
            className={styles.input}
          />
          <button onClick={handleAddMember} className={styles.addButton}>추가</button>
        </div>
        {members.map(member => (
           <div key={member._id} className={styles.memberBox}>
            {editingId === member._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleEditInputChange(e, member._id)}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="position"
                  value={member.position}
                  onChange={(e) => handleEditInputChange(e, member._id)}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="profileImage"
                  value={member.profileImage}
                  onChange={(e) => handleEditInputChange(e, member._id)}
                  className={styles.input}
                />
                <button onClick={() => handleSave(member._id)} className={styles.saveButton}>저장</button>
              </>
            ) : (
              <>
                <img src={member.profileImage} alt={member.name} className={styles.profileImage} />
                <div className={styles.memberInfo}>
                  <div>{member.name}</div>
                  <div>{member.position}</div>
                </div>
                <div className={styles.buttonContainer}>
                  <button onClick={() => handleEdit(member._id)} className={styles.editButton}>수정</button>
                  <button onClick={() => handleDelete(member._id)} className={styles.deleteButton}>삭제</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupInfo;
