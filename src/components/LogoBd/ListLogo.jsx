import { useState, useEffect } from 'react';

const ListLogo = ({ list, altura }) => {
  return (
    <div>
      <div>
        {list.map((product, index) => (
          <div key={index}>
            <img src={product.img} alt="img" height={`${altura.altura}px`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListLogo;
