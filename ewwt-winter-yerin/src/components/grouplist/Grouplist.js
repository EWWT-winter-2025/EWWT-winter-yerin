import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Grouplist.module.css';

const Grouplist = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('그룹 목록을 불러오는 데 실패했습니다:', error);
      }
    };
    fetchGroups();
  }, []);
  
  const handleGroupClick = (group) => {
    onGroupSelect(group);
  };

  return (
    <div className={styles.groupListContainer}>
      {groups.length === 0 ? (
        <p className={styles.noGroups}>그룹이 없습니다.</p>
      ) : (
        <div className={styles.groupList}>
          {groups.map(group => (
            <div 
              key={group._id} 
              className={styles.groupItem}
              onClick={() => handleGroupClick(group)}
            >
              <span className={styles.groupName}>{group.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grouplist;
