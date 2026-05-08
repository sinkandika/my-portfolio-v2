import SnkIcon from "../assets/sinkandika-icon.svg";

function NavBar () {
  return (
    <div className="bg-white flex py-5 px-7 justify-between items-center sticky z-99 top-0">
      <div>
        <a href="#homePage">
          <img
            src={SnkIcon}
            alt="snk"
            className="w-8 h-8 cursor-pointer"
          />
        </a>
      </div>
      <div className="flex gap-x-5 md:gap-x-20">
        <a 
        href="#about"
        className="text-secondary hover:text-hero transition duration-300"
        >
          About me
        </a>
        <a
        href="#myPortfolio" 
        className="text-secondary hover:text-hero transition duration-300">
          My Portfolio
        </a>
        <a 
        href="#contactMe"
        className="text-secondary hover:text-hero transition duration-300">
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default NavBar;