import React, { useEffect, useState } from 'react';
import { styled, connect, useConnect, loadable } from 'frontity'
import CanvasContent from "./customcomponents/CanvasContent";
import CustomCanvas from "./customcomponents/CustomCanvas";
import LeftBuildPage from './customcomponents/LeftBuildPage';
import LeftCongratsPage from './customcomponents/LeftCongratsPage';
import backgroundImage from './white-background.jpg'
const SnackBar = loadable(()=> import('./customcomponents/SnackBar'))

const App = ({ }) => {
  const { actions, libraries, state } = useConnect();

  // State
  const { imagePath, curImage, imageAdded } = state.customizer;
  const [images, setImages] = useState([]);

  // Actions
  const { setImagePath, setCurrentImage, toggleCustomizer, setImageAdded } = actions.customizer

  // Components
  const { XmarksTheSpot } = libraries.theme.components.icons;
  const { ScrollLock } = libraries.theme.components;

  useEffect(() => {
    if (images.length > 0) {
      // Update the image path
      setImagePath(images[images.length - 1]);
      // Mark the image as added so we show congrats
      setImageAdded(true);
    }
  }, [images]);

  return (
    <StyledApp
      className="App"
      backgroundImage={backgroundImage}
      curImage={curImage}
    >
      <ScrollLock />
      <header className="App-header">
        <div className="Inline-flex">
          <div className="Left-Content" align="left">
            {!imageAdded ? (
              <LeftBuildPage
                images={images}
                setImagePath={setImagePath}
                setImages={setImages}
              />
            ) : (
              <LeftCongratsPage setImages={setImages}/>
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
          </div>
        </div>
      </header>
      <CloseCustomizer onClick={toggleCustomizer}>
        Editor schließen <XmarksTheSpot />
      </CloseCustomizer>
      {state.customizer.error && <SnackBar error={state.customizer.error} />}
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
    padding: 5%;

    background: transparent;
    border: 1px solid rgba(112, 112, 112, 0.2);
    /* Note: currently only Safari supports backdrop-filter */
    backdrop-filter: blur(19.55780029296875px);
    --webkit-backdrop-filter: blur(19.55780029296875px);
    background-color: rgba(255, 255, 255, 0);
    /* (plus shape's fill blended on top as a separate layer with 74.61% opacity) */
  }

  .Right-Content {
    width: 67%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
