import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Calendar, Copy, Eye, PencilLine, Trash2, Share2 } from "lucide-react";
import { FormatDate } from '../utlis/formatDate';



const Paste = () => {
  
  const pastes = useSelector((state)=>state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState(''); // Search Notes 

  const filteredData = pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const dispatch = useDispatch();

  function handleDelete(paste){
    dispatch(removeFromPaste(paste));
  }
  return (
    <div className="w-full h-full max-w-[1200px] mx-auto px-5 lg:px-0">
       
       <input 
          className='p-2 rounded-lg mt-6 min-w-[600px]'
          type="search" 
          placeholder='Search Notes...'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          />

        <div className='flex flex-col gap-5 mt-6 border border-white/20 rounded-lg min-w-[950px] max-w-[900px] px-4'>
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Notes
          </h2>
          {
              filteredData.length > 0 ? ( filteredData.map((paste)=>{
                      return (
                        <div className="flex flex-row border place-content-between border-white/20 rounded-lg p-5 mb-4">
                            <div className='flex flex-col place-content-start'>
                                {/* Title */}
                                <h2 className="text-3xl font-bold mb-2 capitalize line-clamp-1 text-left">{paste.title}</h2>

                                {/* Content Preview */}
                                <p className="text-sm text-white/80 line-clamp-3 mb-4 break-words">{paste.content}</p>
                            </div>

                            {/* Footer Row */}
                            <div className="flex flex-col  justify-between items-start md:items-center gap-3">

                              {/* Button group */}
                              <div className="flex gap-2">
                                
                                <button
                                  className="p-2 rounded-[0.2rem] bg-transparent border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                                  // onClick={() => toast.error("Not working")}
                                >
                                  <a href={`/?pasteId=${paste?._id}`}>
                                    <PencilLine
                                      className="text-white group-hover:text-blue-500"
                                      size={20}
                                    />
                                  </a>
                                </button>
                                <button
                                  className="p-2 rounded-[0.2rem] bg-transparent border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                                  onClick={() => handleDelete(paste)}
                                >
                                  <Trash2
                                    className="text-white group-hover:text-pink-500"
                                    size={20}
                                  />
                                </button>

                                <button className="p-2 rounded-[0.2rem] bg-transparent border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                                  <a href={`/paste/${paste._id}`} target="_blank">
                                    <Eye
                                      className="text-white group-hover:text-orange-500"
                                      size={20}
                                    />
                                  </a>
                                </button>
                                <button
                                  className="p-2 rounded-[0.2rem] bg-transparent border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                                  onClick={() => {
                                    navigator.clipboard.writeText(paste?.content);
                                    toast.success("Copied to Clipboard");
                                  }}
                                >
                                  <Copy
                                    className="text-white group-hover:text-green-500"
                                    size={20}
                                  />
                                </button>


                                <button
                                  onClick={() => {
                                    const shareUrl = `${window.location.origin}/paste/${paste._id}`;
                                    navigator.clipboard.writeText(shareUrl);
                                    toast.success('Link copied to clipboard!');
                                  }}
                                  className="p-2 rounded-[0.2rem] bg-transparent text-white border border-[#c7c7c7] hover:border-blue-500 group inline-flex items-center"
                                >
                                  <Share2 className="text-white group-hover:text-blue-500" size={20} />
                                </button>
                              </div>

                              {/* Date and Tag */}
                                <div className="gap-x-2 flex ">
                                  <Calendar className="text-white" size={20} />
                                  {FormatDate(paste.createdAt)}
                                </div>
                            </div>
                          </div>

                      )
                  }
                )) : (
              <div className="text-2xl text-center w-full text-chileanFire-500 mb-4">
                No Data Found
              </div>
            )
            
              }
        </div>
    </div>
  )
}

export default Paste





