import React from 'react';
export default function AccordionItem({
  title,
  body,
  headingId,
  collapseId,
  parentAccordion,
  isExpanded = false,
}) {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id={headingId}>
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
    </div>
  );
}
