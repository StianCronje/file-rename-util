import React, { useState } from 'react';
import './App.css';



const App = () => {

  const [files, setFiles] = useState([]);
  const [regex, setRegex] = useState("(some)(.*)(text)");
  const [testInput, setTestInput] = useState("some [fancy] text");
  const [testOutput, setTestOutput] = useState("");
  const [matches, setMatches] = useState([]);
  const [replacements, setReplacements] = useState([]);

  const openFileDialog = () => {
    console.log('click');
  }

  const filesChanged = (e) => {
    debugger;
    console.log(e.target.files);
    var fileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      fileList.push(e.target.files[i]);
    }
    setFiles(fileList);
  }

  const handleInputChange = (value) => {
    setRegex(value);
    processRegex(value, testInput);
  }

  const handleTestInputChange = (value) => {
    setTestInput(value);
    processRegex(regex, value);
  }

  const processRegex = (regex, input) => {
    try {
      let output = new RegExp(`${regex}`).exec(input);
      console.log(output);
      setTestOutput(output);
      setMatches(output);
    } catch (e) { }
  }

  const handleReplaceTextChange = (value, index) => {
    const newReplace = [...replacements];
    newReplace[index] = value;
    setReplacements(newReplace);
  }
  /*
  \[(.*)\]
  (some)(.*)(text)
  
  some [fancy] text
  */
  return (
    <div className="App">
      <div>
        <span>Regex:</span> <input type="text" value={regex} onChange={e => handleInputChange(e.target.value)} />
        <ul>
          {matches && matches.map((match, index) => {
            return (<li key={index}>
              <span>({index}) - {match} ({replacements[index]})</span>
              <input type="text" value={replacements[index]} onChange={e => handleReplaceTextChange(e.target.value, index)} />
            </li>);
          })}
        </ul>
      </div>
      <div>
        <span>Test Input:</span> <input type="text" value={testInput} onChange={e => handleTestInputChange(e.target.value)} />
      </div>
      <div>
        <span>Output:</span> <input type="text" value={testOutput} />
      </div>
      <div>
        <input type="file" multiple onClick={openFileDialog} onChange={filesChanged} />
        <table>
          <table>
            <tr>
              <th>#</th>
              <th>Original</th>
              <th>Renamed</th>
            </tr>
            {files.map((file, index) => {
              return <tr>
                      <td>{index}</td>
                      <td>{file.name}</td>
                      <td>{file.name}</td>
                    </tr>
            })}
          </table>
        </table>
      </div>
    </div>
  );
}

export default App;
