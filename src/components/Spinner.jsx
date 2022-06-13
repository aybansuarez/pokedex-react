import pokeball from "/assets/pokeball.svg";

function Spinner({ className }) {
  return (
    <img className={`animate-spin ${className}`} src={pokeball} alt="spinner" />
  );
}

export default Spinner;
