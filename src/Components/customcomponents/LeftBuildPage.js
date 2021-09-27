import LocalAccordion from "./Accordion/LocalAccordion";

export default function LeftBuildPage({images, setImagePath, setImages}) {
    return (  
      <>
        <button type="button" className="btn Product-designer">Produkt Designer</button>
        <h2 className='Sub-heading'>Wunschmotiv Series</h2>
        <hr className='hr'/>
        <LocalAccordion images={images} setImages={setImages} setImagePath={setImagePath}/> 
      </>
    )
  }