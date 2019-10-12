import React, { useState, useEffect } from 'react';
import './App.css';
const fs = window.fs;

const App = () => {

  const [files, setFiles] = useState([]);
  const [newFileNames, setNewFileNames] = useState([]);

  const [regex, setRegex] = useState(".*");
  const [replace, setReplace] = useState("$&");

  useEffect(() => {
    processRegex();
  }, [regex, replace, files]);

  const processRegex = () => {
    try {
      let newNames = [];

      files.forEach((file, i) => {
        newNames[i] = file.name.replace(new RegExp(regex), replace);;
      });

      setNewFileNames(newNames);
    } catch (e) { }
  }

  const filesChanged = (e) => {
    var fileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      fileList.push(e.target.files[i]);
    }

    setFiles(fileList);
  }

  const applyRenaming = () => {
    files.forEach((file, i) => {
      const pathFolder = file.path.replace(file.name, "");
      const sourceFile = file.path;
      const newFile = pathFolder + newFileNames[i];

      fs.rename(sourceFile, newFile, (err) => {
        if(err) throw err;
      });
    });
  }

  return (
    <div className="App">
      <div>
        <label>Regex:</label>
        <input type="text" value={regex} onChange={e => setRegex(e.target.value)} />
      </div>
      <div>
        <label>Replace:</label>
        <input type="text" value={replace} onChange={e => setReplace(e.target.value)} />
      </div>
      <div>
        <input type="file" multiple onChange={filesChanged} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Original</th>
              <th>New Name</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => {
              return <tr key={i}>
                <td>{i}</td>
                <td>{file.name}</td>
                <td>{newFileNames[i]}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <button onClick={applyRenaming}>Apply</button>
    </div>
  );
}

export default App;
