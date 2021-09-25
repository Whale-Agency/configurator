import LocalAccordian from "./Accordian/LocalAccordian";

export default function LeftBuildPage({images, setImagePath, setImages}) {
    return (  <><button type="button" className="btn Product-designer">Produkt Designer</button>
    <h2 className='Sub-heading'>Individuelle Fotomotive</h2>
    <hr className='hr'/>
    <LocalAccordian images={images} setImages={setImages} setImagePath={setImagePath}/> </>)
  }