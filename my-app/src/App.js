import React from 'react';
import './App.scss';
import LocalAccordian from './customcomponents/Accordian/LocalAccordian';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='Inline-flex'>
          <div className='Left-Content' align='left'>
          <button type="button" class="btn Product-designer">Product Designer</button>
          <h2 className='Sub-heading'>Wunschmotiv Series</h2>
          <hr className='hr'/>
          <LocalAccordian />
          </div>
          <div className='Right-Content'>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
