import React from 'react'
import err from './Images/404-not-found.gif'

export default function NotFound() {
    return (
        <div style={{position:"relative",left:"48vw",top:"10vh",transform:"translateX(-50%)",color:"#7075aa",width:"fit-content"}}>
            <h1 style={{textAlign:"center",textTransform:"uppercase",fontWeight:"bolder"}}>Link Not Found</h1>
            <img style={{width:"21rem"}} src={err} alt="404"/>
        </div>
    )
}
