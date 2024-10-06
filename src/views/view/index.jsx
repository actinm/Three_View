import React from 'react';
import { useEffect } from 'react';
import VIewFn from './model'
function Index() {
  useEffect(() => {
   let model= document.querySelector('.model')
  let destroy= VIewFn(model,'/public/gaming_chair.glb')

  return ()=>{
    destroy()
  }
  },[])
  return (
    <div className='w-[100vw] h-[100vh] model'>
    </div>
  );
}

export default React.memo(Index);