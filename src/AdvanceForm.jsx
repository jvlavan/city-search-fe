import React from 'react'
import AdvanceSearch from './AdvanceSearch'
import { useState,useEffect } from 'react'
import BacktoHome from './BacktoHome'
function AdvanceForm() {
  const[cityInput,setcityInput]=useState("")
  
  // useEffect(()=>{

  //   setcityInput((value)=>{value})
  // },[cityInput])
  return (
    
    <div>
      <input type="text" className="text-black" value={cityInput} onChange={(e)=>setcityInput(e.target.value)}/>
      {/* {cityInput} */}
      { (cityInput==undefined||cityInput.trim().length==0)?
        (<div className='block'>Type something <BacktoHome/></div>):<AdvanceSearch cityName ={cityInput}/>}
     
      
    </div>
  )
}

export default AdvanceForm
