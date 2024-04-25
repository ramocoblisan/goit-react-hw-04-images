import React, { useState, useEffect } from "react";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import { config } from "./data/config";
import imageGalleryStyles from "./ImageGallery/ImageGallery.module.css"

export function App()  {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  

  useEffect(() => {
    if (searchPerformed) {
      const fetchGallery = async () => {
        const abortController = new AbortController();
        const { signal } = abortController;
        setIsLoading(true);

        try {
          const response = await fetch(`${config.URL}?q=${query}&page=${page}&key=${config.KEY}&image_type=photo&orientation=horizontal&per_page=12`, { signal });
          const data = await response.json();
          setGallery(prevGallery => [...prevGallery, ...data.hits]);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching gallery:', error);
          setIsLoading(false);
        } finally {
          console.log('Fetching gallery completed');
        }
      };

      fetchGallery();

      return () => {
        const abortController = new AbortController();
        abortController.abort();
      };
    }
  }, [query, page, searchPerformed]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newQuery = ev.target.elements.query.value;

    if (newQuery.toLowerCase().trim() !== "") {
      setQuery(newQuery);
      setPage(1);
      setGallery([]);
      setSearchPerformed(true);
    }

    ev.target.reset();
  };

  const handlerLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    // Find the element with the class name 'newImagesContainer' using styles imported from ImageGallery component
    const newImagesContainer = document.querySelector(`.${imageGalleryStyles.newImagesContainer}`);

    // Scroll the new images container into view
    if (newImagesContainer) {
      newImagesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (image) => {
    setIsOpenModal(true);
    setModalImage(image.largeImageURL);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalImage('');
  };

    return (
      <>
      <Searchbar onSubmit={handleSubmit} value={query} />
      {searchPerformed && (
        <>
        {isLoading ? <Loader /> : <ImageGallery images={gallery} openModal={openModal} />}
        {gallery.length > 0 && !isLoading && <Button onLoadMore={handlerLoadMore} />}
        {isOpenModal && <Modal closeModal={closeModal} image={modalImage} />}
      </>
      )}
      </>
    );
};
