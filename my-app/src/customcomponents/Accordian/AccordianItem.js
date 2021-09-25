import React from 'react';
export default function AccordionItem({
  title,
  body,
  headingId,
  collapseId,
  parentAccordian,
  isExpanded = false,
}) {
  return (
    <div class='accordion-item'>
      <h2 class='accordion-header' id={headingId}>
        <button
          class='accordion-button collapsed'
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
        class='accordion-collapse collapse'
        aria-labelledby={{ headingId }}
        data-bs-parent={'#' + parentAccordian}
      >
        {body}
      </div>
    </div>
  );
}
