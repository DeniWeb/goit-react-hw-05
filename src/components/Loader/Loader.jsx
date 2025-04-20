import { useState } from 'react';
import { RiseLoader } from 'react-spinners';

const Loader = () => {
  const [loaderColor, setLoaderColor] = useState('#4fc3f7');

  return <RiseLoader color={loaderColor} />;
};

export default Loader;
