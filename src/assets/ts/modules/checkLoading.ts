export const checkLoading = () => {
  if(!window.isLoadingSpaceship && !window.isLoadingStar) {
    setTimeout(() => {
      document.body.classList.add('is-loaded');
      window.isLoading = false
    }, 1000)
  }
}

export const getFileSize = async (url: string): Promise<number> => {
  const response = await fetch(url, { method: "HEAD" });
  const contentLength = response.headers.get("Content-Length");
  return contentLength ? parseInt(contentLength, 10) : 0;
}
