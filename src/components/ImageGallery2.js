import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import CreatorCard from "components/CreatorCard";
import { Logo } from "components/Logo";
import { SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { debounce } from "lodash";

const fetchImages = async (page) => {
  try {
    const response = await axios.get(
      `https://civitai.com/api/v1/images?limit=5&query=women&page=${page}`
    );
    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const ImageGallery2 = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [contador, setContador] = useState(0);
  useEffect(() => {
    setContador((prev) => prev + 1);
  }, []);
  var alreadyLoading = false;
  useEffect(() => {
    const loadImages = async () => {
      if (alreadyLoading) {
        return;
      }
      // Establecer un indicador para evitar cargas duplicadas
      alreadyLoading = true;

      const newImages = await fetchImages(page);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setHasMore(newImages.length > 0);

      alreadyLoading = false;
    };

    loadImages();
  }, [page]);

  const loadMoreImages = useCallback(
    debounce(() => {
      console.log("Cargando más imágenes", page);
      setPage((prevPage) => prevPage + 1);
    }, 1500),
    []
  );
  // Animación de Framer Motion para cada elemento
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={loadMoreImages}
      hasMore={hasMore}
      loader={
        <Center>
          <Spinner />
        </Center>
      }
      style={{ overflow: "hidden" }}
      scrollThreshold="10px"
    >
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[1, 2, 3, 15]}>
        {images.map((image, index) => (
          <motion.div
            key={image.id + index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <CreatorCard apiData={image} />
          </motion.div>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default ImageGallery2;
