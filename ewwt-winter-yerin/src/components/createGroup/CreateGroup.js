import styles from "./CreateGroup.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import axios from "axios";

const CreateGroup = () => {
  const [color, setColor] = useState("#aabbcc");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/groups', { name, description, color });
      alert(response.data.message);
      // input 초기화
      setName("");
      setDescription("");
      setColor("#aabbcc");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || '그룹 추가에 실패했습니다.');
    }
  };

  return (
    <div className={styles.group_create_container}>
      <div className={styles.group_create_title}>
        <div className={styles.title}>
          + 그룹 추가
          <hr className={styles.divider} />
        </div>
        <div className={styles.description}>관심있는 그룹을 추가해보세요!</div>
      </div>
      <form onSubmit={handleSubmit} className={styles.group_input_container}>
        <div className={styles.input_box}>
          <div className={styles.input_title}>
            <p className={styles.text}>그룹명</p>
          </div>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.input_box}>
          <div className={styles.input_title}>
            <p className={styles.text}>그룹 소개</p>
          </div>
          <input
            className={styles.input}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.input_box}>
          <div className={styles.input_title}>
            <p className={styles.text}>그룹 색상</p>
          </div>
          <div className={styles.color_picker_container}>
            <button
              type="button"
              className={styles.color_button}
              style={{ backgroundColor: color }}
              onClick={toggleColorPicker}
            >
              {color}
            </button>
            {showColorPicker && (
              <div className={styles.color_picker_popup}>
                <HexColorPicker color={color} onChange={setColor} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.input_box}>
          <div className={styles.input_title}></div>
          <button type="submit" className={styles.create_button}>그룹 추가하기</button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
