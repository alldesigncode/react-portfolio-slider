import React, { FC } from 'react';
import { DataModel } from '../../store/reducers/portfolio-settings.reducer';

interface Props {
  data: DataModel;
}

export const PortfolioList: FC<Props> = ({ data }) => {
  return (
    <div className="portfolio-c">
      <h1>{data.title}</h1>
      <figure className="portfolio-image">
        <img src={data.imageUrl} alt="urll" />
      </figure>
    </div>
  );
};
