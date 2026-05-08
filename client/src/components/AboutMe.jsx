import { motion } from "framer-motion";
function AboutMe () {
  return (
    <div 
    id="about"
    className="relative bg-white p-10 md:p-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] z-97 "
    >
      <motion.div
      initial={{ opacity: 0, y:-100}}
      whileInView={{ opacity: 1, y: 0}}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex justify-between gap-10 flex-col xl:flex-row"
      >
        <div className="flex-1 flex flex-col gap-y-5 max-w-xl">
          <p className="text-2xl text-hero">
            About Me
          </p>
          <div className="text-secondary flex flex-col gap-y-4">
            <p>
              My name is Andika, a Computer Science graduate with a passion for both technology and visual design. I enjoy creating modern digital experiences through system development, UI/UX, branding, and creative problem-solving.
            </p>
            <p>
              With experience in both programming and graphic design, I've worked on various projects ranging from application development to logo and illustration design. My background allows me to combine technical thinking with creativity to build clean, functional, and engaging user experiences.
            </p>
            <p>
              I’m always exploring new ideas, technologies, and design approaches to continue growing as a developer and designer.
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-y-5 max-w-xl">
          <p className="text-2xl text-hero">
            What I'm Good At
          </p>
          <div className="flex flex-col gap-y-5">
            <p className="text-secondary">
              Programming:
            </p>
            <div className="flex flex-wrap gap-2">
              <p className="bg-tag1 p-3 rounded-xl w-fit text-white">Java</p>
              <p className="bg-tag2 p-3 rounded-xl w-fit text-secondary">JavaScript</p>
              <p className="bg-tag3 p-3 rounded-xl w-fit text-secondary">Typescript</p>
              <p className="bg-tag4 p-3 rounded-xl w-fit text-white">React JS</p>
              <p className="bg-tag5 p-3 rounded-xl w-fit text-white">Next JS</p>
              <p className="bg-tag6 p-3 rounded-xl w-fit text-secondary">C#</p>
              <p className="bg-tag7 p-3 rounded-xl w-fit text-secondary">C++</p>
              <p className="bg-tag8 p-3 rounded-xl w-fit text-white">CSS</p>
              <p className="bg-tag9 p-3 rounded-xl w-fit text-white">Tailwind</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <p className="text-secondary">
              Design & Editing:
            </p>
            <div className="flex flex-wrap gap-2">
              <p className="bg-tag6 p-3 rounded-xl w-fit text-secondary">UI & UX</p>
              <p className="bg-tag7 p-3 rounded-xl w-fit text-secondary">Illustrator</p>
              <p className="bg-tag8 p-3 rounded-xl w-fit text-white">Photoshop</p>
              <p className="bg-tag9 p-3 rounded-xl w-fit text-white">Premiere Pro</p>
              <p className="bg-tag1 p-3 rounded-xl w-fit text-white">InDesign</p>
              <p className="bg-tag2 p-3 rounded-xl w-fit text-secondary">Figma</p>
              <p className="bg-tag3 p-3 rounded-xl w-fit text-secondary">GIMP</p>
              <p className="bg-tag4 p-3 rounded-xl w-fit text-white">Clip Studio Paint</p>
              <p className="bg-tag5 p-3 rounded-xl w-fit text-white">Inkscape</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;