import React, { Fragment, FC } from 'react';

interface Props {
  length: number;
  currentIndex: number;
  next: () => void;
  disabled: boolean;
}

export const PortfolioActions: FC<Props> = ({
  length,
  currentIndex,
  disabled,
  next,
}) => {
  const actionIndicators = () => {
    let elements: JSX.Element[] = [];
    for (let i = 0; i < length; i++) {
      elements = [
        ...elements,
        <div
          key={i}
          className={`line line--${i + 1} ${
            currentIndex === i ? 'active' : ''
          }`}
        ></div>,
      ];
    }
    return elements;
  };

  return (
    <Fragment>
      <div className="actions-list">
        <button className="btn btn-next" onClick={next} disabled={disabled}>
          <svg className="icon icon-next">
            <use href="./assets/icons.svg#icon-arrow-long-right"></use>
          </svg>
        </button>
      </div>
      <div className="read-more">Read More</div>
      <div className="action-indicators">
        <span>01</span>
        {actionIndicators()}
        <span>0{length}</span>
      </div>
    </Fragment>
  );
};
