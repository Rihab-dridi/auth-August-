import React from 'react'
import {useEffect  } from "react";
import axios from "axios"

export default function Home() {

useEffect(() => {
axios.get('http://localhost:5000/api/user/all')
.then((res)=>console.log(res.data))
.catch(err=>console.log(err))
}, [])

    return (
        <div>
          
            <img src='/images/home.png' alt='pic'/>
        </div>
    )
}
