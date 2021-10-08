import React, { useEffect, useState } from 'react';
import './App.scss';
import { CanvasContent } from './customcomponents/CanvasContent';
import { CustomCanvas } from './customcomponents/CustomCanvas';
import LeftBuildPage from './customcomponents/LeftBuildPage';
import LeftCongratsPage from './customcomponents/LeftCongratsPage';
import { ReactComponent as ProductSpeichern } from './Icons/ProductSpeichern.svg';
import { ReactComponent as Redo } from './Icons/redo.svg';
import { ReactComponent as Undo } from './Icons/undo.svg';

let RedoClickRef = null, UndoClickRef = null;
function App() {
  const [imagePath, setImagePath] = useState(null);
  const [curImage, setCurrentImage] = useState(null);
  const [productSpeichernClick, setProductSpeichernClick] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (images.length > 0) setImagePath(images[images.length - 1]);
  }, [images]);
  function onProductPichernClick() {
    if (curImage) {
      setProductSpeichernClick(true);
    }
  }
  function RedoClick(e) {
    if(RedoClickRef)
      RedoClickRef();
  }
  function UndoClick(e) {
    if(UndoClickRef)
      UndoClickRef();
  }
  function setUndoClickRef(ref) {
    UndoClickRef = ref;
  }
  
  function setRedoClickRef(ref) {
    RedoClickRef = ref;
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Inline-flex'>
          <div className='Left-Content' align='left' style={{padding: productSpeichernClick ? '2%' : '5%'}}>
            {!productSpeichernClick ? (
              <LeftBuildPage
                images={images}
                setImagePath={setImagePath}
                setImages={setImages}
              />
            ) : (
              <LeftCongratsPage
                setProductSpeichernClick={setProductSpeichernClick}
              />
            )}
          </div>
          <div className='Right-Content'>
            {imagePath === null ? (
              <CanvasContent setImagePath={setImagePath} />
            ) : (
              <CustomCanvas
                setCurrentImage={setCurrentImage}
                imageSrc={imagePath.image}
                setImagePath={setImagePath}
                setUndoClickRef={setUndoClickRef}
                setRedoClickRef={setRedoClickRef}
              />
            )}
            <div
              className='BottomProductSelection'
              onClick={() => onProductPichernClick()}
            >
              {' '}
              <ProductSpeichern className='BottomProductSelectionIcon' />{' '}
              <>Product Speichern</>{' '}
            </div>
              <div className='undo' onClick={UndoClick}>
                <Undo style={{width: 50, height: 50}}/>
                <div className='undo-Text'>
                    Rückgängig
                </div>
              </div>
              <div className='redo' onClick={RedoClick}>
              <Redo style={{width: 50, height: 50}}/>
              <div className='redo-Text'>
                Wiederherstellen
              </div>
              </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
