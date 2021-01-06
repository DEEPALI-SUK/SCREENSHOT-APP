import React,{useState,useEffect} from 'react';


function App() {
  const API_KEY="a81b0b1af0634c04af03cebcccad61ff";
  const[search,setSearch]=useState("");
  const[img,setImg]=useState("");
  const[error,setError]=useState(false);
  const[loading,setLoading]=useState(false);
  const URl=`https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;
  const getScreenshots=async()=>{
    setSearch("");
    setError(false);
    setLoading(true);
    const response=await fetch(URl);
    if(response.ok){
      setImg(response);
      setLoading(false);
    }
    else{
      setError(true);
    }
  }
  const searcScreenshots=(e)=>{
     e.preventDefault();
     getScreenshots();
  };
  useEffect(()=>{
    setSearch("");
    getScreenshots();
  },[]);

  return (
    <div className="App">
      <nav>
        <div className="container">
          <form onSubmit={searcScreenshots}>
            <input autofocus type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button type="submit">Take Screenshot</button>
          </form>
        </div>
      </nav>
      <div className="hero">
        {!loading&&!error?(
          <div className="container">
            {img && (
              <a href={img.src} target="_blank">
              <img src={img.url} alt="background"/>
              </a>
            )}
          </div>
        ):!error&& loading?(
          <div className="loading"></div>
        ):error?(
          <div className="container"><h2>Please Enter a valid url</h2></div>
        ):("")
        }
      </div>
    </div>
  );
}

export default App;
