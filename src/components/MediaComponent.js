import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const MediaComponent = ({ url }) => {
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = url;

    const canPlayHandler = () => {
      setIsVideo(true);
    };

    const errorHandler = () => {
      setIsVideo(false);
    };

    video.addEventListener('canplay', canPlayHandler);
    video.addEventListener('error', errorHandler);

    // Comienza a cargar el video
    video.load();

    // Función de limpieza
    return () => {
      video.removeEventListener('canplay', canPlayHandler);
      video.removeEventListener('error', errorHandler);
      video.remove();
    };
  }, [url]);

  const mediaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Esto mantiene la relación de aspecto y evita estiramientos
  };

  return (
    <Box position="relative" width="100%" paddingTop="100%">
      {/* Esto crea un contenedor cuadrado */}
      {isVideo ? (
        <video src={url} controls style={mediaStyle} />
      ) : (
        <img src={url} alt="media" style={mediaStyle} />
      )}
    </Box>
  );
};

export default MediaComponent;
