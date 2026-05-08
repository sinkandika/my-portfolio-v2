import SnkIcon from "../assets/sinkandika-icon.svg";

function Footer () {
  return (
    <div className="relative bg-fourth p-10 md:px-40 py-10 flex flex-col md:flex-row gap-10 justify-between">
 
      <img
      src={SnkIcon}
      alt="snk"
      className="w-8 h-8"
      />

      <div className="flex flex-1 flex-col gap-y-5">
        <div className="flex gap-x-5 text-secondary">
          <button
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-hero transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => {
              document
                .getElementById("myPortfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-hero transition duration-300"
          >
            Portfolio
          </button>
          <button
            onClick={() => {
              document
                .getElementById("contactMe")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-hero transition duration-300"
          >
            Contact
          </button>
        </div>
        <div className="flex gap-x-5 text-secondary">
          <a
            href="https://github.com/sinkandika"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hero transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-y-5 text-secondary">
        <div className="flex gap-x-5">
          <p>React JS</p>
          <p>Axios</p>
        </div>
        <div className="flex gap-x-5">
          <p>Express JS</p>
          <p>PostgresSQL</p>
        </div>
        <p className="text-sm text-gray-400 mt-5">
          © 2026 Andika. All rights reserved.
        </p>
      </div>

    </div>
  );
}

export default Footer;