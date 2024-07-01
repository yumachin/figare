import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"
import sampleimg from "../../img/sampleimg.png"


function Mono() {
  const navigation = useNavigate()
  const ok = () => {
    navigation("/login/home/addpost/mono/suremono")
  }
  const back = () => {
    navigation("/login/home/addpost")
  }
  return (
    <div>
      <div className='blue'></div>
      <div className='dis-head'>
        <img src={image} height='50px' className='back-btn' onClick={back} alt='戻る' />
        <div style={{ textAlign: "center", width: "100vw" }}>
          <p style={{ fontSize: '28px' }}>詳細情報を入力してね</p>
        </div>
      </div>
      <div style={{marginTop:"50px"}}>

      </div>
      <div className='maigoimg'>
        <img src={sampleimg} width="200px" height="200px" />
      </div>
      <div>
        <div className='dis-info'>
          <div className="name">
            <label>　　名前　:</label>
            <input type='text' />
          </div>
          <div className='name'>
            <label>　　場所　:</label>
            <input type='text' />
          </div>
          <div className='name'>
            <label>　目撃時間:</label>
            <input type='text' />
          </div>
          <div className='tokuryou'>
            <label>特徴 :</label>
            <textarea className='tokutyou-area' />
          </div>
        </div>
        <div className='okbtn-posi'>
          <button className='ok-btn' onClick={ok}>OK</button>

        </div>
      </div>
    </div>
  )
}

export default Mono