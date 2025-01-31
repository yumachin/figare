import React, { useState } from 'react';
import image from "../../img/image.png";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import "./SureMono.css";

function SureMono({ disInfo, setDisInfo, myInfo }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const back = () => {
    navigate("/login/home/addpost/mono");
  };

  const ok = async () => {
    setLoading(true);
    try {
      const storageRef = ref(storage, disInfo.storagePath);
      await uploadBytes(storageRef, disInfo.file); // ファイルをまずアップロード
      const url = await getDownloadURL(storageRef); // その後にURLを取得

      const docRef = doc(collection(db, 'Posts')); // 'Post'はコレクション名
      const newDisInfo = {
        ...disInfo,
        file: url,
        time: Timestamp.now(),
        poster: localStorage.getItem("uid"),
        place: myInfo.place,
        id: docRef.id
      }; // URLを含めて新しいオブジェクトを作成
      await setDoc(docRef, newDisInfo); // Firestoreに新しいオブジェクトを保存

      setDisInfo({ kind: "", text: "", img: "", file: "", time: "" });
      navigate("/login/home");
    } catch (error) {
      console.error("Error uploading file or saving document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className='load'>
            <h1>送信中</h1>
            <div className='loader'></div>
        </div>
      ) : (
        <>
          <div className='mono-blue'>figare</div>
          <img src={image} height="50px" className='back-btn' onClick={back} alt="戻る" />
          <div className='mono-sure'>＜情報を確認してね＞​</div>
          <div className='con-text'>
            <div className='kind-check'>種類 : {disInfo.kind}</div>
            <div className='picture-check'>写真 :</div>
            <div className='preview-check'><img src={disInfo.img ? disInfo.img : {}} height="200px" alt="プレビュー" /></div>
            <div className='text-check'>記述 :</div>
            <div className='context-check'>{disInfo.text}</div>
          </div>
          <div className="con-btn-posi">
            <button onClick={ok} className='con-btn'>確定する</button>
          </div>
        </>
      )}
    </>
  );
}

export default SureMono;
