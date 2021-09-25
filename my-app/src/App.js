import React, { useEffect, useState } from 'react';
import './App.scss';
import { CanvasContent } from './customcomponents/CanvasContent';
import { CustomCanvas } from './customcomponents/CustomCanvas';
import LeftBuildPage from './customcomponents/LeftBuildPage';
import LeftCongratsPage from './customcomponents/LeftCongratsPage';
import { ReactComponent as ProductSpeichern } from './Icons/ProductSpeichern.svg';

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
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
