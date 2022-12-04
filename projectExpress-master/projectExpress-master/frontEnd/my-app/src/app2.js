import React, { useState, useEffect } from "react";

function Info() {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState([]);
  const [inner, setInner] = useState("");
  

  function eraser(path){
    fetch(`http://localhost:3009${path}`,{"method":"delete"})
      .then((i) => i.json())
      .then((files) => setFiles(files));
  }

  function makeButons(path) {
    fetch(`http://localhost:3009/${path}`)
      .then((i) => i.json())
      .then((files) => setFiles(files));
  }

  useEffect(() => {
    makeButons("");
  }, []);

  return (
    <div>
      <div>jbh programing course</div>
      {files.map((file) => (
        <div>
          <p>{file.name}</p>
          <button
            onClick={() => {
              setInfo(file);
              file.type=="folder" && makeButons(file.path)
            }}
          >
                       {file.name}

          </button>
          <button onClick={()=>{eraser(file.path)}}>delete</button>
          {file.type!=="folder" && <button
            onClick={() => {
              setInner(file.path)
            }}
          >
           show
          </button>}
        </div>
      ))}

      <div>
        the info is:{" "}
        {info &&
          Object.entries(info).map(([key, value]) => {
            return (
              <div>
                {key}: {value}
              </div>
            );
          })}
      </div>
      <iframe src={`http://localhost:3009/${inner}`}height="1000" width={1000}/>

      {/* <div>the birth is:{files}</div> */}
    </div>
  );
        }
export default Info;

