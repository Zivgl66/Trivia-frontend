import React from "react";
import CircleFadeLoader from "react-loaders-kit/lib/bars/CircleFadeLoader";

const Loader = () => {
  let loading = true;
  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ["#5e22f0", "#f6b93b"],
  };

  return <CircleFadeLoader {...loaderProps} />;
};

export default Loader;
