interface Window {
  lenis: any; // windowにlenisを追加するために指定
  isPlaying: boolean
  isLoadingSpaceship: boolean
  isLoadingStar: boolean
  isLoadingMeteorite: boolean
  isLoading: boolean
  isSp: boolean
}

declare module '*.glsl' {
  const value: string
  export default value
}