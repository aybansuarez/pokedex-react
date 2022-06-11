import pokeball from "/assets/pokeball.svg";

function Spinner({ image, className }) {
  return (
    <img className={`animate-spin ${className}`} src={pokeball} alt="spinner" />
  );
}

export default Spinner;
