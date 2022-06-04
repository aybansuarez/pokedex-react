import { Link } from "react-router-dom";
import githubLogo from "/src/assets/github.svg";

function Header() {
  return (
    <header className="select-none bg-slate-800">
      <div className="dex-layout mx-auto h-20 w-full">
        <div className="flex h-full w-full">
          <div className="flex flex-1 justify-between text-white">
            <Link to="/" className="flex items-center gap-x-2">
              <p className="font-stencil_one text-4xl ">POKEDEX</p>
            </Link>
            <div className="hidden items-center gap-x-8 md:flex">
              <Link to="/">
                <p className="font-montserrat">Home</p>
              </Link>
              <Link to="/all">
                <p className="font-montserrat">Master List</p>
              </Link>
              <Link to="/regions">
                <p className="font-montserrat">Regions</p>
              </Link>
              <a href="https://github.com/aybansuarez">
                <img src={githubLogo} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
