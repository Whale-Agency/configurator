import React, { useRef } from 'react';
import AccordionItem from './AccordionItem';
import addImage from '../../Icons/add_Image_Bar.svg';
import { showSnackBar } from '../SnackBar';

const LocalAccordion = ({ images, setImages, setImagePath }) => {
  const fileInputRef = useRef(null);

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = new Image();
      img.src = URL.createObjectURL(event.target.files[0]);
      img.onload = function () {
        if (this.width < 1400 || this.height < 1000) {
          showSnackBar(
            "The minimum width & height of the image should be 1400 x 1000."
          );
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

export default LocalAccordion;