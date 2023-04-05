import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
const Domain = 'http://localhost:6001/';

const visibilityHidden = {
    visibility: 'hidden'
}

const visibilityInherit = {
    visibility: 'inherit'
}

export default function Card(props) {
    const [hover, setHover] = useState(false)
    const [style, setStyle] = useState(visibilityHidden)

    useEffect(()=>{
        if(hover){
          setStyle(visibilityInherit)
        }else{
          setStyle(visibilityHidden)
        }
    
      },[hover, style])

    const deleteHandler = (e, id) => {
        Axios.delete(`${Domain}${id}`)
            .then((res) => {
                console.log(res)
            })
        props.setData([])
    }
    return (
        <div className='imageCard'  onMouseEnter={(event) => setHover(true)} onMouseLeave={(event) => setHover(false)}>
            <button style={style} onClick={(event) => deleteHandler(event, props.data._id)}>Delete</button>
            <img src={props.data.url} alt='imgPic' />
            <p style={style}>{props.data.label}</p>
        </div>
    )
}
