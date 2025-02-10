import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Grouplist.module.css';

const Grouplist = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grouplist');
        console.log('서버 응답:', response.data);
        setGroups(response.data);
      } catch (error) {
        console.error('그룹 목록을 불러오는 데 실패했습니다:', error);
      }
    };
  
    fetchGroups();
  }, []);
  

  return (
    <div className={styles.groupListContainer}>
      {groups.length === 0 ? (
        <p className={styles.noGroups} />
      ) : (
        <div className={styles.groupList}>
          {groups.map(group => (
            <div key={group._id} className={styles.groupItem}>
              <span className={styles.groupName}>{group.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grouplist;
