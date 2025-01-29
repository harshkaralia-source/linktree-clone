'use client'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const GenerateContent = () => {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: '', linkText: '' }]);
  const [handle, setHandle] = useState('');
  const [pic, setPic] = useState('');

  // Update handle from searchParams inside useEffect
  useEffect(() => {
    setHandle(searchParams.get('handle') || '');
  }, [searchParams]);

  const addLink = () => {
    setLinks([...links, { link: '', linkText: '' }]);
  };

  const handleChange = (index, link, linkText) => {
    setLinks((prevLinks) =>
      prevLinks.map((item, i) =>
        i === index ? { link, linkText } : item
      )
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setPic(reader.result);
    }
  };

  const submitLinks = async () => {
    try {
      const response = await fetch("/api/add", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links, handle, pic }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setHandle('');
        setPic('');
        setLinks([{ link: '', linkText: '' }]);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#770016] grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center pl-5 pt-32 sm:pl-10 lg:pl-24">
        <h1 className="font-[800] text-5xl sm:text-6xl py-7 text-[#e9c0ea]">Create your Linktree</h1>
        <div className="flex flex-col gap-5">
          <span>
            <p className='pb-1 font-light text-[#e9c0ea]'>Step 1: Claim your Handle</p>
            <input
              onChange={e => setHandle(e.target.value)}
              value={handle}
              type="text"
              className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white'
              placeholder='Choose a Handle'
            />
          </span>

          <span>
            <p className='pb-1 font-light text-[#e9c0ea]'>Step 2: Add Links</p>
            {links.map((item, index) => (
              <span key={index} className='flex flex-col sm:flex-row gap-5'>
                <input
                  onChange={e => handleChange(index, item.link, e.target.value)}
                  value={item.linkText}
                  type="text"
                  className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white my-2'
                  placeholder='example'
                  required
                />
                <input
                  onChange={e => handleChange(index, e.target.value, item.linkText)}
                  value={item.link}
                  type="text"
                  className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white my-2'
                  placeholder='https://example.com'
                  required
                />
              </span>
            ))}
            <button onClick={addLink} className="my-5 px-4 py-2 text-[#770016] bg-[#e9c0ea] rounded-lg">Add Link</button>
          </span>

          <span>
            <p className='pb-1 font-light text-[#e9c0ea]'>Step 3: Add a Picture</p>
            <span className='flex flex-col'>
              <input
                onChange={e => setPic(e.target.value)}
                value={pic}
                type="text"
                className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white'
                placeholder='Enter link to your Picture'
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='w-fit p-4 rounded-lg focus:border-2 focus:border-double border-white mt-2'
              />
              <button onClick={submitLinks} className="w-fit my-5 px-4 py-2 text-[#770016] bg-[#e9c0ea] rounded-lg">Create your Linktree</button>
            </span>
          </span>
          <ToastContainer />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {pic && <img src={pic} alt="Preview" className="max-w-xs max-h-60 rounded-lg" />}
      </div>
    </div>
  );
};

const Generate = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GenerateContent />
  </Suspense>
);

export default Generate;
