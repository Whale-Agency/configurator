import LocalAccordion from "./Accordion/LocalAccordion";
import { styled } from 'frontity'

const LeftBuildPage = ({images, setImagePath, setImages}) => {
  return (  
    <>
      <ProductDesignerLabel>Produkt Designer</ProductDesignerLabel>
      <h2 className='Sub-heading'>Wunschmotiv Series</h2>
      <hr className='hr'/>
      <LocalAccordion images={images} setImages={setImages} setImagePath={setImagePath}/> 
    </>
  )
}

export default LeftBuildPage

const ProductDesignerLabel = styled.div`
  background-color: #fc5c03;
  color: white;
  min-width: 200px !important;
  border-radius: 0.1rem;
  font-size: large;
  font-weight: 600;
  border-color: #fc5c03;
  display: inline-block;
  text-align: center;
  padding: 0.375rem 0.75rem;
`;