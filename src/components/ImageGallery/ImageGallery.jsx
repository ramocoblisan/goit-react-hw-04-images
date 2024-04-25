import React, { useState, useEffect, useRef } from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

function ImageGallery({ images, openModal }) {
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        setNewImages([]);
    }, [images]); // Reset newImages when images change

    return (
        <>
            <ul className={styles.ImageGallery}>
                {images.map((image) => (
                    <li key={image.id}>
                        <ImageGalleryItem image={image} openModal={openModal} />
                    </li>
                ))}
            </ul>
            <div className={styles.newImagesContainer}>
                {newImages.map((image) => (
                    <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
                ))}
            </div>
        </>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGallery;