

function MarkerSVG({ color }) {
  // Function to generate marker SVG with dynamic color
  function generateMarkerSVG(color) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path fill="${color}" d="M15.9999 0C10.8899 0 6.3999 4.49 6.3999 9.6C6.3999 16.8 15.9999 32 15.9999 32C15.9999 32 25.5999 16.8 25.5999 9.6C25.5999 4.49 21.1099 0 15.9999 0ZM15.9999 14.4C13.7599 14.4 11.9999 12.64 11.9999 10.4C11.9999 8.16 13.7599 6.4 15.9999 6.4C18.2399 6.4 19.9999 8.16 19.9999 10.4C19.9999 12.64 18.2399 14.4 15.9999 14.4Z"/>
      </svg>
    `;
  }

  const svgString = generateMarkerSVG(color);

  // Convert SVG string to data URL
  const dataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

  return dataURL;
}

export default MarkerSVG;
