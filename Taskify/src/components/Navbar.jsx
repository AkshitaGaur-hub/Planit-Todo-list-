import React from 'react'

const navbar = () => {
  return (
    <nav className = 'flex justify-between bg-purple-900 text-white p-4'>
      <div className="logo">
        <span className ='font-bold text-xl mx-8'>Planit</span>
      </div>
<ul className = 'flex gap-6 mx-8'>
  <li className ='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
  <li className ='cursor-pointer hover:font-bold transition-all duration-300'>Your Task</li>
    <button id='toggle' className='bg-none cursor-pointer ' onClick={() => document.body.classList.toggle('dark-mode')}><span class="material-symbols-outlined">
    sunny
</span></button>
</ul>
    </nav>
    
  )
}

export default navbar
