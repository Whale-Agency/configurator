import React from 'react';
import { ReactComponent as AddImage } from '../Icons/add_Image.svg';
export function CanvasContent({ setImagePath }) {
  const onButtonClick = () => {
    document.getElementById('getFile').click();
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImagePath({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  return (
    <>
      <div
        className='Canvas-Content'
        align='center'
        onClick={() => onButtonClick()}
      >
        <div className='Canvas-Image'>
          <AddImage />
        </div>
        <div className='canvas-Select-Image-Text'>
          Klicken Sie hier, um das Foto hochzuladen, oder wählen sie eins aus
          der Galerie.
        </div>
      </div>
      <input
        type='file'
        id='getFile'
        onChange={onImageChange}
        accept='image/*'
      />
    </>
  );
}
