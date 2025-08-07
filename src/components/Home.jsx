import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Copy, PlusCircle } from "lucide-react";
import toast from 'react-hot-toast';


const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');  // the Actual content of notes
    const [searchParams, setSearchParams] = useSearchParams(); // used to work with the query parameters in the URL
    const pasteId = searchParams.get('pasteId');  // if there is an pasteId in URL then store it in pasteId Variable, else pasteId will be empty => used to change content of button

    const dispatch = useDispatch();  // for sending content to the slice

    const allPastes = useSelector((state)=>state.paste.pastes);

    useEffect(()=>{
      if(pasteId){ // paste already exist
        const currPaste = allPastes.find((p)=>p._id === pasteId);
        if(currPaste){
          setTitle(currPaste.title);
          setValue(currPaste.content);
        }
        
      }
    }, [pasteId])


    function createPaste(e){
        const paste = {
          title : title,
          content : value,
          _id : pasteId || Date.now().toString(36)  + Math.random().toString(36).substring(2),  // if pasteId already exist assign it otherwise make a new unique id using current timestamp
          createdAt : new Date().toISOString()
        }

        e.preventDefault();
  
        if (!value.trim()) {
          toast.error('Cannot save an empty note');
          return;
        }

        if(pasteId){
          // Update Paste
          dispatch(updateToPaste(paste));
        }
        else{
          // Create Paste
          dispatch(addToPaste(paste));
        }  

        // after creation or updation clear the UI
        setTitle('');
        setValue('');
        setSearchParams({});
    }



  return (
    <div className="w-full h-full py-5 max-w-[1200px] mx-auto px-5 lg:px-0">

      {/* input and button div  */}

      <div className='flex flex-row gap-4 place-content-center'>
        <input 
          className='p-2 pl-3 rounded-lg mt-3 w-[60%]'
          type="text"
          placeholder='Enter Title Here'
          value={title} 
          onChange={(e)=>setTitle(e.target.value)}
        />

        <button onClick={createPaste} className='p-2 rounded-lg mt-3 bg-blue-600'>
          {
              pasteId ? "Update Note" : "Create Note"
          }
        </button>

      </div>

      <div className={`w-full mt-8 flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}>
        <div className={`w-full flex flex-row items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}>
          <div className="w-full flex gap-x-[6px] items-center select-none group p-4">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}/>

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />

          </div>


            {/* Circle and copy btn */}
          <div className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}>
                {/*Copy  button */}
                <button
                  className={`flex justify-center items-center bg-transparent transition-all duration-300 ease-in-out group`}
                  onClick={(paste) => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard", {
                      position: "top-right",
                    });
                  }}
                >
                  <Copy size={20} />
                </button>
          </div>
        </div>
        <textarea 
          className='rounded-sm p-3 min-w-[950px] border border-white/30'
          value={value}
          placeholder='Keep Notes Here...'
          onChange={(e)=>setValue(e.target.value)}
          rows={20}
        />
      </div>

    </div>
  )
}

export default Home
