import React from "react";
import SingleImage from "./SingleImage";

const Images = ({ images }) => {
  console.log(images);
  return images.map((image) => (
    <SingleImage key={image.id} imageURL={image.urls.small} />
  ));
};
export default Images;