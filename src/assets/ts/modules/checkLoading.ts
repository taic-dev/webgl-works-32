export const checkLoading = () => {
  if(!window.isLoadingSpaceship && !window.isLoadingStar) {
    document.body.classList.add('is-loaded');
    window.isLoading = false
  }
}