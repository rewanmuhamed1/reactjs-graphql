
import React from 'react';

const ImageCrop = ({ src, alt ,outOfStock }) => {
  return (
    <div className=" h-64 flex   overflow-hidden rounded-lg relative">
      <img src={src} alt={alt} className="absolute top-0 left-0 w-full h-auto" />
{
  outOfStock ?<div className="absolute inset-0 h-64	  flex items-center justify-center bg-slate-400 bg-opacity-50 text-white text-xl font-bold  ">
  Out of Stock
</div> : null
}
      

    </div>
  );
};

export default ImageCrop;