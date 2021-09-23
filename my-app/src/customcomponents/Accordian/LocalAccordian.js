import React from 'react';
import AccordionItem from './AccordianItem';
function LocalAccordian() {
  return (
    <div className="accordion" id="mainAccordian">
      <AccordionItem
      title={'Meine hochgeladenen Bilder'}
      body={'Empty for now'}
      headingId={'headingOne'}
      collapseId={'collapseOne'}
      parentAccordian={'mainAccordian'}
      />
      <AccordionItem
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
      />
    </div>
  );
}

export default React.memo(LocalAccordian);