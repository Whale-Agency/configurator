import React, { useEffect, useState } from 'react';
import './App.scss';
import LocalAccordian from './customcomponents/Accordian/LocalAccordian';
import { CanvasContent } from './customcomponents/CanvasContent';
function App() {
  const [imagePath, setImagePath] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(()=> {
    const img = new window.Image();
    img.src = imagePath;
    setImage(img);
  }, [imagePath])
  return (
    <div className="App">
      <header className="App-header">
        <div className='Inline-flex'>
          <div className='Left-Content' align='left'>
          <button type="button" className="btn Product-designer">Produkt Designer</button>
          <h2 className='Sub-heading'>Individuelle Fotomotive</h2>
          <hr className='hr'/>
          <LocalAccordian />
          </div>
          <div className='Right-Content'>
            {/* {
              imagePath === null ? <CanvasContent setImagePath={setImagePath} />: <img src={imagePath} />
            } */}
            <CanvasContent setImagePath={setImagePath} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
