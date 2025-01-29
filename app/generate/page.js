'use client'
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const Generate = () => {
  const searchParams = useSearchParams()
  const [links, setLinks] = useState([{ link: '', linkText: '' }])
  const [handle, setHandle] = useState(searchParams.get('handle'))
  const [pic, setPic] = useState('')

  const addLink = () => {
    setLinks(links.concat([{ link: '', linkText: '' }]))
  }

  const handleChange = (index, link, linkText) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linkText }
        } else {
          return item
        }
      })
    })
  }


  const submitLinks = async (links, handle, pic) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "pic": pic
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const r = await fetch("/api/add", requestOptions)
    const result = await r.json()

    if (result.success) {
      toast.success(result.message)
      setHandle('')
      setPic('')
      setLinks([])
    } else {
      toast.error(result.message)
    }

  }

  return (
    <div className="min-h-screen bg-[#770016] grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center pl-5 pt-32 sm:pl-10 lg:pl-24">
        <h1 className="font-[800] text-5xl sm:text-6xl py-7 text-[#e9c0ea]">Create your Linktree</h1>
        <div className="flex flex-col gap-5">

          <span>
            <p className='pb-1 font-light text-[#e9c0ea]'>Step 1: Claim your Handle</p>
            <input
              onChange={e => setHandle(e.target.value)}
              value={handle || ''}
              type="text"
              name=""
              id=""
              className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white'
              placeholder='Choose a Handle'
            />
          </span>

          <span>
            <p className='pb-1 font-light text-[#e9c0ea]'>Step 2: Add Links</p>

            {links && links.map((item, index) => {
              return <span
                key={index}
                className='flex flex-col sm:flex-row gap-5'>
                <input
                  onChange={e => handleChange(index, item.link, e.target.value)}
                  value={item.linkText || ''}
                  type="text"
                  name=""
                  id=""
                  className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white my-2'
                  placeholder='example'
                  required
                />
                <input
                  onChange={e => handleChange(index, e.target.value, item.linkText)}
                  value={item.link || ''}
                  type="text"
                  name=""
                  id=""
                  className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white my-2'
                  placeholder='https://example.com'
                  required
                />
              </span>
            })}

            <button
              onClick={() => addLink()}
              className="my-5 px-4 py-2 text-[#770016] bg-[#e9c0ea] rounded-lg">
              Add Link
            </button>
          </span>

          <span>
            <p className='pb-1 font-light text-[#e9c0ea]'>Step 3: Add a Picture</p>

            <span className='flex flex-col'>
              <input
                onChange={e => setPic(e.target.value)}
                value={pic || ''}
                type="text"
                name=""
                id=""
                className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white'
                placeholder='Enter link to your Picture'
              />
              <button
                onClick={() => { return submitLinks(links, handle, pic) }}
                className="w-fit my-5 px-4 py-2 text-[#770016] bg-[#e9c0ea] rounded-lg">
                Create your Linktree
              </button>
            </span>
          </span>
          <ToastContainer />
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* IMAGE HERE */}
      </div>
    </div>
  );
};

export default Generate;
