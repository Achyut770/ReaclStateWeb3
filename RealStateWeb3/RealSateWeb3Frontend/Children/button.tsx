import React from 'react'

function Buttons({children} : {children:string}) {

    const style={
        borderRadius:"5px",
    background:"tomato",
    color:"white",
    padding:"7px 12px",
    minWidth:"100px"
    }
  return (
    <div style={style}>{children}</div>
  )
}

export default Buttons