export const checkLoading = () => {
  if(!window.isLoadingSpaceship && !window.isLoadingStar) {
    document.body.classList.add('is-loaded');
    window.isLoading = false
  }
}

export const getFileSize = async (url: string): Promise<number> => {
  const response = await fetch(url, { method: "HEAD" });
  const contentLength = response.headers.get("Content-Length");
  return contentLength ? parseInt(contentLength, 10) : 0;
}

// async function loadModel(url: string) {
//   const totalSize = await getFileSize(url);

//   const loader = new GLTFLoader();
//   loader.load(
//     url,
//     (gltf) => console.log("Model loaded", gltf),
//     (xhr) => {
//       const total = totalSize > 0 ? totalSize : xhr.loaded;
//       const progress = (xhr.loaded / total) * 100;
//       console.log(`Progress: ${progress}%`);
//     },
//     (error) => console.log("Error loading model", error)
//   );
// }

