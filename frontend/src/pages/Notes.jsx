import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeProvider';

function Notes() {
  const { theme } = useContext(ThemeContext);

  const [copyText, setCopyText] = useState("Copy");
  const [isPaused, setIsPaused] = useState(false);
  const [files, setFiles] = useState([]);
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);
  const [rate,setRate]=useState(1);
  const [speaking,setSpeaking]=useState(false)

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      setSpeaking(false)
      setIsPaused(false)
      setAns("")
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
const speak = () => {
    if (!window.speechSynthesis || !ans) return;

    // cancel anything currently playing
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(ans);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1;

    setSpeaking(true);
    setIsPaused(false);

    utterance.onend = () => {
      setSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    
    if (synth.speaking) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    }
  };


  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const final = selectedFiles.map(item => ({
      id: crypto.randomUUID(),
      item,
      preview: URL.createObjectURL(item),
    }));
    setFiles(prev => [...prev, ...final]);
  };

  const handleDelete = (id) => {
    const del = files.find(f => f.id === id);
    if (del) URL.revokeObjectURL(del.preview);
    setFiles(files.filter(f => f.id !== id));
  };

  const handleCopyText = () => {
    if (!ans) return;
    setCopyText("Copied!");
    navigator.clipboard.writeText(ans);
    setTimeout(() => setCopyText("Copy"), 1500);
  };

  const handleSubmit = async () => {
    if (files.length > 5) {
      alert("At most 5 images allowed at once.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach(img => formData.append("pics", img.item));
//      // Multer parses content of type multipart/form-data for Express to 'understand'. we cant pass files as JSON objects to Multer thereby, must convert to form data type.
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/summarize`,
        { method: "POST", body: formData, credentials: "include" }
      );

      if (!res.ok) {
      // If the backend sent a 429, show the specific message
      if (res.status === 429) {
        alert( "Daily limit reached!");
        return;
      }
      throw new Error("Upload failed");
    }

      const info = await res.json();
      setAns(info.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        
        <div className="flex flex-wrap flex-1 flex-col bg-green-700 justify-center items-center">
          <NavLink to="/">
            <button className="button-53 m-2">Home</button>
          </NavLink>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleSelect}
          />

          <label htmlFor="file-upload" className=" max-w-max rounded-xl border-0 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100 dark:bg-violet-600 dark:text-violet-100 dark:hover:bg-violet-500 m-5">
            Upload images
          </label>

          <p className='m-2'>{files.length} images chosen</p>

                    <div className='max-h-[40vh] overflow-y-auto'>
            
            {files.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((img) => (
                  <div
                    key={img.id}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-full h-40 object-contain bg-gray-100"
                    />

                    <button
                      onClick={() => handleDelete(img.id)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button disabled={loading} onClick={handleSubmit} className="button-89 m-2">
            {loading ? "Summarizing" : "Summarize"}
          </button>
        </div>

        <div className="max-h-screen overflow-y-auto flex-1 p-2">


          <div className=" flex flex-wrap justify-center">
            <input title="Speed" 
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className='bg-gradient-to-r from-violet-500 to-pink-500
    rounded-lg
    cursor-pointer
    accent-violet-600'/>
            <button title="Pause" onClick={handlePause} className=" m-2 hover:opacity-40 transition-all duration-300 text-3xl active:scale-70" disabled={!speaking}>
              {isPaused ? "▶️" : "⏸️"}
            </button>

            <button disabled={!ans||loading||speaking} title="Mic" onClick={speak} className=' m-2 hover:opacity-40 transition-all duration-300 text-3xl active:scale-70'>🎙️</button>

            <button disabled={!ans} onClick={handleCopyText} className="button-89 m-2">
              {copyText}
            </button>
      <button onClick={()=>{setAns("");}} className="button-89 m-2">
              Clear
            </button>
          </div>
                    <textarea
            className="p-2 w-full h-full border-2"
            value={loading ? "Loading..." : ans}
            readOnly
          />
        </div>
      </div>
    </>
  );
}

export default Notes;
