import React, { useRef } from 'react';
import AccordionItem from './AccordionItem';
import addImage from '../../Icons/add_Image_Bar.svg';
import { useConnect, connect } from 'frontity'

const LocalAccordion = ({ images, setImages, setImagePath }) => {
  const { state } = useConnect();
  // const { images } = state.customizer;
  // const { setImagePath } = actions.customizer;

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // clean the error state
      state.customizer.error = false;

      const img = new Image();
      img.src = URL.createObjectURL(event.target.files[0]);
      img.onload = function () {
        if (this.width < 1400 || this.height < 1000) {
          state.customizer.error =
            "Die Mindestbreite und -höhe des Bildes sollte 1400 x 1000 betragen.";
          fileInputRef.current.click();
          return;
        }
        setImages([
          ...images,
          {
            image: URL.createObjectURL(event.target.files[0]),
          },
        ]);
      };
    }
  };

  function getBody() {
    return (
      <div className="accordion-body">
        <div
          className="AccordionItem"
          align="center"
          onClick={() => onButtonClick()}
        >
          <img src={addImage} className="AccordionItemSVG" />
        </div>
        {images.map((i) => {
          return (
            <div
              className="AccordionItem"
              align="center"
              onClick={() => setImagePath(i)}
              key={i}
            >
              <img
                className="AccordionSelectedImages"
                src={i.image}
                width="400"
                height="400"
                alt="Not-Found"
              />
            </div>
          );
        })}

        <input
          type="file"
          id="getFile"
          onChange={onImageChange}
          accept="image/*"
          ref={fileInputRef}
        />
      </div>
    );
  }

  return (
    <div className="accordion" id="mainAccordion">
      <AccordionItem
        title={"Meine hochgeladenen Bilder"}
        body={getBody()}
        headingId={"headingOne"}
        collapseId={"collapseOne"}
        parentAccordion={"mainAccordion"}
      />
      {/* <AccordionItem
      title={'Könighaus HD Image Gallery (Free)'}
      body={'Empty for now'}
      headingId={'headingTwo'}
      collapseId={'collapseTwo'}
      parentAccordion={'mainAccordion'}
      />

      <AccordionItem
          title={'Depositphotos (Paid)'}
          body={'Empty for now'}
          headingId={'headingThree'}
          collapseId={'collapseThree'}
          parentAccordion={'mainAccordion'}
      /> */}
    </div>
  );
};

export default connect(LocalAccordion);