import { connect, useConnect, styled } from 'frontity'

const AccordionItem = ({
  title,
  body,
  headingId,
  collapseId,
  parentAccordion,
  isExpanded = false,
}) => {

  const { libraries} = useConnect()
  return (
    <StyledAccorionItem font={libraries.theme.fonts.slab}>
      <h2 id={headingId}>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={'#' + collapseId}
          aria-expanded={isExpanded}
          aria-controls={collapseId}
        >
          {title}
        </button>
      </h2>
      <div
        id={collapseId}
        className='accordion-collapse collapse'
        aria-labelledby={{ headingId }}
        data-bs-parent={'#' + parentAccordion}
      >
        {body}
      </div>
    </StyledAccorionItem>
  );
}

export default connect(AccordionItem);

const StyledAccorionItem = styled.div`
  font-weight: normal;
  h2 {
    font-family: ${props => props.font};
    font-size: 16px;
    margin-bottom: 18px;
  }
  border: none;
  margin-bottom
`;