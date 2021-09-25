import React from 'react';
import AccordionItem from './AccordianItem';
import { ReactComponent as AddImage } from '../../Icons/add_Image_Bar.svg';
import { showSnackBar } from '../SnackBar';
function LocalAccordian({images, setImages, setImagePath}) {
  const onButtonClick = () => {
    document.getElementById("getFile").click();
};
const onImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
        img.onload = function() {
          if(this.width < 1400 || this.height < 1000) {
            showSnackBar('The minimum width & height of the image should be 1400 x 1000.')
            document.getElementById("getFile").click();
            return;
          }
          setImages([ ...images, {
            image: URL.createObjectURL(event.target.files[0])
          }]);
        };
      
  }
 }
 function getBody() {
   return(<div class="accordion-body">
  <div className='AccordianItem' align='center' onClick={() => onButtonClick()}><AddImage className='AccordianItemSVG' /></div>
  {images.map(i => {
    return (<div className='AccordianItem' align='center' onClick={() => setImagePath(i)}>
      <img className='AccordianSelectedImages' src={i.image} width='400' height='400' alt='Not-Found' />
    </div>)
  })}
  
  <input type="file" id="getFile" onChange={onImageChange} accept="image/*"  /></div>)
 }
  return (
    <div className="accordion" id="mainAccordian">
      <AccordionItem
      title={'Meine hochgeladenen Bilder'}
      body={getBody()}
      headingId={'headingOne'}
      collapseId={'collapseOne'}
      parentAccordian={'mainAccordian'}
      />
      {/* <AccordionItem
      title={'Könighaus HD Image Gallery (Free)'}
      body={'Empty for now'}
      headingId={'headingTwo'}
      collapseId={'collapseTwo'}
      parentAccordian={'mainAccordian'}
      />

      <AccordionItem
          title={'Depositphotos (Paid)'}
          body={'Empty for now'}
          headingId={'headingThree'}
          collapseId={'collapseThree'}
          parentAccordian={'mainAccordian'}
      /> */}
    </div>
  );
}

export default LocalAccordian;