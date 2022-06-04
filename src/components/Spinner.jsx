function Spinner({ image, className }) {
  return (
    <img className={`animate-spin ${className}`} src={image} alt="spinner" />
  );
}

export default Spinner;
