import React, { useCallback, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./estilos.css";

function ContentUpload(props) {
  const { telegram_id, triggerReloadThumbs } = props;
  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = useCallback(async (acceptedFiles) => {
    // Crea un FormData para enviar los archivos al servidor
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files[]", file);
      formData.append("telegram_id", telegram_id);
    });

    try {
      const response = await axios.post(
        "http://localhost/ruletav2/files.php",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
          },
        }
      );

      console.log(response.data);
      //triggerReloadThumbs();
    } catch (error) {
      console.error("Error al cargar archivos:", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <Box p={3} backgroundColor={"white"} style={{ marginTop: "15px" }}>
          Arrastra y suelta archivos aquí o haz clic para seleccionar archivos
        </Box>
      </div>
      <div
        className="progress-container"
        style={uploadProgress > 0 ? { display: "block" } : { display: "none" }}
      >
        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
          {uploadProgress > 10 && uploadProgress.toFixed(0) + "%"}
        </div>
      </div>
    </>
  );
}

export default ContentUpload;
