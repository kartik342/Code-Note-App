import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state)=>state.paste.pastes);

  const paste = allPastes.filter((p)=>p._id === id)[0];

  return (
    <div>

      {/* input and button div  */}

      <div className='flex flex-row gap-4 place-content-center'>
        <input 
        className='p-2 pl-3 rounded-lg mt-3 w-[60%]'
          type="text"
          placeholder='Enter Title Here'
          disabled // to only view the the notes => you can't change them
          value={paste.title} 
          onChange={(e)=>setTitle(e.target.value)}
        />

        {/* <button onClick={createPaste} className='p-2 rounded-lg mt-3'>
          {
              pasteId ? "Update Paste" : "Create paste"
          }
        </button> */}
      </div>

      <div className='mt-8'>
        <textarea 
          className='rounded-lg p-3 min-w-[600px]'
          value={paste.content}
          placeholder='Keep Notes Here...'
          disabled // to only view the the notes => you can't change them
          onChange={(e)=>setValue(e.target.value)}
          rows={20}
        />
      </div>

    </div>
  )
}

export default ViewPaste
