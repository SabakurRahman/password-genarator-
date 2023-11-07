import { useState,useEffect, useCallback,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[length, setLength] = useState(8)
  const[number,setNumber]=useState(false)
  const[char,setChar]=useState(false)
  const[password,setPassword]=useState('')

  const passwordGenarator = useCallback(() => {
    let pas=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   if(number) str+='0123456789'
   if(char) str+='!@#$%^&*()_+'
   for(let i=0;i<length;i++){
     pas+=str.charAt(Math.floor(Math.random()*str.length+1))
   }
   setPassword(pas)

  }, [length, number, char,setPassword])

  const passwordRef = useRef(null)

  const passwordCopyToClipBoard = useCallback(() => {
    passwordRef.current.select()
    navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => { passwordGenarator()}, [length, number, char,passwordGenarator])

  return (
    <div className='w-full max-w-md max-auto shadow-md  rounded-lg px-4 py-3 my-4 bg-gray-800 text-orange-500'>
     <h1 className=' text-white text-center my-3'>Password Genarator</h1>
     <div className='flex shadow rounded-lg overflow-hidden md-4'>
       <input type='text'
        className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordRef} value={password} readOnly 
        />
        <button onClick={passwordCopyToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
     </div>
     <div className='flex items-center gap-x-1'>
      <input type='range' max={50} min={8} value={length} onChange={(e)=>setLength(e.target.value)}/>
        <label >Password: {length}</label>
     </div>
     <div className='flex items-center gap-x-1'>
     <input type='checkbox' defaultChecked={number} onChange={()=>setNumber((prev)=>!prev)}/>
     <label >Number</label>
     </div>
     <div className='flex items-center gap-x-1'>
     <input type='checkbox' checked={char} onChange={()=>setChar((prev)=>!prev)}/>
     <label >Char</label>
     </div>
    </div>

  )
}

export default App
