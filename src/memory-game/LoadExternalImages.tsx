import React from 'react';

const LoadExternalImages = (props: any) => {
  const { images } = props;
  if (images.length > 1) {
    // const ImagesToShow = images.map((imageUrl: any) => (
    //   <img src={imageUrl} alt="dd" />
    // ));
    const ImagesToShow = () => <img src={images[1]} alt="3" />;
    return (
      <>
        <ImagesToShow />
      </>
    );
  }
  return <></>;
};

export default LoadExternalImages;
