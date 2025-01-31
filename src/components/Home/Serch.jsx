import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import image from "./../img/image.png";
import "./Serch.css"
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import SerchPlace from '../SerchPlace/SerchPlace';

function Serch({ prof }) {
    console.log(prof);
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
    const [serch, setSerch]=useState('');
    const [posts, setPosts]=useState([]);
    useEffect(() => {
      const fetchFilteredPosts = async () => {
        try {
          const prefRef = collection(db, "Posts");
          const q = query(prefRef, where("place", "==", prof.place),/*orderBy('time','desc')*/);
          const querySnapshot = await getDocs(q);
          const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const filterResult = filteredPosts.filter((item) => item.kind === serch);
          setPosts(filterResult);

            // const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
            // const querySnapshot = await getDocs(q);
            // const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // const filterResult = filteredPosts.filter((item) => item.kind === serch);
            // setPref(filterResult);
        } catch (error) {
            console.error('Error fetching filtered posts:', error);
        }
      };
      fetchFilteredPosts();  
    }, [serch]);

    // useEffect(() => {
    //   setPosts(pref);
    // }, [pref]);

    const handleSerch = (type) => {
      setSerch(type === serch ? 'all' : type);
    };

    const handleClick=(item)=>{
      localStorage.setItem("postid", item.id);
      navigate("/login/home/finder");
    };
    
  return (
    <div className='select-BackGround'>
        <img src={image} className='select-Back' onClick={back} />
          <h2 className='serch-Title'>絞り込み検索</h2>
          <button onClick={()=>handleSerch('人')}>人</button>
          <button onClick={()=>handleSerch('ペット')}>ペット</button>
          <button onClick={()=>handleSerch('もの')}>もの</button>
          <div>
            {posts.map((item, index)=>(
              <div key={index}>
                <div onClick={()=>handleClick(item)}>
                  <strong>{item.kind}</strong>
                  <div>
                    <img src={item.file} width='50%' alt='Post' />
                  </div>
                  <div>
                    <p>{item.text}</p>
                    {/* <p>{item.time.toDate().toLocaleString()}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Serch