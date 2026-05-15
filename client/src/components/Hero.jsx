import { motion } from "framer-motion";
import MyImage from "../assets/my-image.jpg";

function Hero () {

  return (
    <div className="relative bg-white p-10 md:p-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] z-98">
      <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-y-10 md-gap-y-0"
      >

        <div className="flex flex-col gap-y-4 text-center md:text-left items-center md:items-baseline">
          <div>
            <p className="text-hero text-2xl">
              Hello There!
            </p>
            <p className="text-secondary text-6xl font-bold">
              I'm Dika
            </p>
            <p className="text-secondary text-2xl">
              Programmed & Graphic Designer
            </p>
            <p className="text-third max-w-md">
              Crafting interfaces in visual design with a balance of creativity and functionality
            </p>
          </div>
          <button 
          onClick={() => {
            document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
          }}
          className="bg-hero hover:bg-hero-hover transition duration-300 rounded-full py-3 px-6 text-white w-fit"
          >
            Find me more
          </button>
        </div>

        <div className="w-full flex justify-center md:justify-end items-center">
          <img
          src={MyImage}
          alt="img"
          className="w-50 md:w-sm shrink-0 object-cover"
          />
        </div>

      </motion.div>
    </div>
  );
};

export default Hero;