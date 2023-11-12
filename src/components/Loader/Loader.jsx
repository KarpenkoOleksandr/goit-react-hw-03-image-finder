import React from 'react';
import { Dna } from 'react-loader-spinner';
import { LoadWrapper } from './Loader.styled'

export  const Loader = () => {
  return (
    <LoadWrapper>
      <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
    </LoadWrapper>
  );
};