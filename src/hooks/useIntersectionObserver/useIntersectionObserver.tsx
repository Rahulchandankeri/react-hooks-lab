import React, { useState } from 'react';

const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  return {
    isIntersecting,
  };
};

export default useIntersectionObserver;
