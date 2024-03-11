import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  
  const [length, setlength] = useState(8)
  const [charAllowed, setcharAllowed] = useState(false)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
    if (numberAllowed) str += "0123456789"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
      
    }

    setpassword(pass)

  },[length, numberAllowed, charAllowed, setpassword])

 
  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, charAllowed, numberAllowed, generatePassword])

  return (
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type='text'
          value={password}
          className="outline-none w-full py-1 px-3"
          readOnly
          placeholder='Password'>
          </input>
          <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range' 
          min={6} 
          max={16}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}}></input>
          <label>length : {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input 
          type='checkbox'
          defaultChecked = {numberAllowed}
          id='numberInput'
          onChange={() => {
            setnumberAllowed((prev) => !prev)
          }}></input>
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input 
          type='checkbox'
          defaultChecked = {charAllowed}
          id='numberInput'
          onChange={() => {
            setcharAllowed((prev) => !prev)
          }}></input>
          <label htmlFor="charInput">Character</label>
      </div>
    </div>
    </div>
    
  )
  }
  
export default App
