import React from 'react';
import addImage from '../Icons/add_Image.svg';
import { connect, styled, useConnect } from 'frontity'

const CanvasContent = ({ setImagePath }) => {
  const onButtonClick = () => {
    document.getElementById("getFile").click();
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
      <StyledCanvasContent align="center" onClick={() => onButtonClick()}>
        <CanvasImageWrapper>
          <img src={addImage} />
        </CanvasImageWrapper>
        <HelperText className="canvas-Select-Image-Text">
          Klicken Sie hier, um das Foto hochzuladen, oder wählen sie eins aus
          der Galerie.
        </HelperText>
      </StyledCanvasContent>
      <input
        type="file"
        id="getFile"
        onChange={onImageChange}
        accept="image/*"
      />
    </>
  );
};

export default connect(CanvasContent);


const StyledCanvasContent = styled.div`
  background: white;
  width: 400px;
  height: 500px;
  outline: 5px #ebebeb solid;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HelperText = styled.div`
  font-size: 20px;
  font-weight: bold;
  opacity: 40%;
  color: #3a373a;
  width: 70%;
  margin: 0 auto;
`

const CanvasImageWrapper = styled.div`
  width: 100%;
  img {
    margin-left: -20px;
    margin-bottom: 20px;
  }
`