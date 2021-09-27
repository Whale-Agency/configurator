import React, { useEffect, useState } from 'react';
import { styled, connect } from 'frontity'
import { CanvasContent } from './customcomponents/CanvasContent';
import { CustomCanvas } from './customcomponents/CustomCanvas';
import LeftBuildPage from './customcomponents/LeftBuildPage';
import LeftCongratsPage from './customcomponents/LeftCongratsPage';
import productSpeichern from "./Icons/ProductSpeichern.svg";
import backgroundImage from './white-background.jpg'



const App = ({ actions, libraries }) => {

  const [imagePath, setImagePath] = useState(null);
  const [curImage, setCurrentImage] = useState(null);
  const [imageAdded, setImageAdded] = useState(false);

  const [images, setImages] = useState([]);
  const { toggleCustomizer } =  actions.customizer;

  const { XmarksTheSpot } = libraries.theme.components.icons
  const { ScrollLock } = libraries.theme.components


  useEffect(() => {
    if (images.length > 0) {
      // Update the image path
      setImagePath(images[images.length - 1])
      
      // Mark the image as added so we show congrats
      setImageAdded(true);

    };
  }, [images]);

  function onProductPichernClick() {
    if (curImage) {
      setImageAdded(true);
    }
  }
  return (
    <StyledApp
      className="App"
      backgroundImage={backgroundImage}
      curImage={curImage}
    >
      <ScrollLock />
      <header className="App-header">
        <div className="Inline-flex">
          <div
            className="Left-Content"
            align="left"
          >
            {!imageAdded ? (
              <LeftBuildPage
                images={images}
                setImagePath={setImagePath}
                setImages={setImages}
              />
            ) : (
              <LeftCongratsPage />
            )}
          </div>
          <div className="Right-Content">
            {imagePath === null ? (
              <CanvasContent setImagePath={setImagePath} />
            ) : (
              <CustomCanvas
                setCurrentImage={setCurrentImage}
                imageSrc={imagePath.image}
              />
            )}
            <div
              className="BottomProductSelection"
              onClick={() => onProductPichernClick()}
            >
              <img
                src={productSpeichern}
                className="BottomProductSelectionIcon"
              />
              <>Product Speichern</>
            </div>
          </div>
        </div>
      </header>
      <CloseCustomizer onClick={toggleCustomizer}>
        Editor schließen <XmarksTheSpot />
      </CloseCustomizer>
    </StyledApp>
  );
}

export default connect(App);

const StyledApp = styled.div`
  position: fixed;
  top: 96px;
  left: 0;
  right: 0;
  bottom: 0;

  .App-header {
    background-image: url(${backgroundImage});
    background-size: cover; /* <------ */
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .Inline-flex {
    display: flex;
    min-width: 100%;
    height: 100vh;
  }

  .Left-Content {
    width: 33%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 5%;
  }

  .Right-Content {
    width: 67%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Canvas-Content {

  }

  .Sub-heading {
    color: #42444a;
    font-weight: 800;
    font-size: 30px;
    font-family: Calibri, sans-serif;
    margin-top: 5%;
  }

  .hr {
    border: none;
    height: 0.5px;
    /* Set the hr color */
    color: rgb(56, 56, 56); /* old IE */
    background-color: rgb(56, 56, 56); /* Modern Browsers */
  }

  .accordion-item {
    border: none;
  }

  .accordion-button:not(.collapsed) {
    background: none;
    color: black;
    border: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 6px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #bdbdbd;
    border-radius: 6px;
  }

  .accordion-button:not(.collapsed)::after {
    background-image: url("./minus.svg");
  }

  .accordion-button::after {
    background-image: url("./plus.svg");
    color: gray;
  }

  .accordion-button {
    color: gray;
  }

  .accordion-body {
    display: flex;
    flex-wrap: wrap;
    color: black;
    padding: 5px;
    /* padding-left: 10%; */
    max-height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
  }

  #snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  .accordion-item {
    font-weight: normal;
    font-family: Roboto Slab;
    font-size: 16px;
  }

  #getFile {
    display: none;
  }

  .AccordionItem {
    height: 134px;
    width: 134px;
    margin: 5px;
    outline: 2px dashed orange;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 51px;
      height: 43px;
      margin-left: -10px;
      margin-top: -10px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .AccordionItemUnselected {
    height: 134px;
    width: 134px;
    margin: 5px;
  }

  .AccordionSelectedImages {
    display: block;
    max-width: 134px;
    max-height: 134px;
    width: auto;
    height: auto;
  }

  .BottomProductSelection {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 18px;
    font-family: roboto;
    background: #5eab3d;
    padding: 10px;
    border-radius: 5px;
    display: flex;
  }

  .BottomProductSelectionIcon {
    margin: auto;
    margin-right: 10px;
  }

  .EntdeckemehrBilder {
    font-size: 18px;
    font-family: roboto;
    background: #f47e17;
    padding: 10px;
    border-radius: 5px;
    width: 200px;
  }
`;

const CloseCustomizer = styled.button`
  position: fixed;
  z-index: 999;
  top: 115px;
  right: 20px;
  svg {
    cursor: pointer;
    vertical-align: middle;
    margin-top: -2px;
  }
`;
