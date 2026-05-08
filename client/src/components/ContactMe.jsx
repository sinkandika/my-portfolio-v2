function ContactMe () {
  return (
    <div 
    id="contactMe"
    className="relative bg-white p-10 md:p-40 flex flex-col gap-y-10 ">
      <p className="text-2xl text-hero">
        Contact Me
      </p>
      <form 
      action="https://formspree.io/f/mnjwbrjj"
      method="POST"
      className="flex flex-col gap-y-5"
      >
        <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="bg-fourth p-4 rounded-md w-full max-w-lg"
         />
         <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="bg-fourth p-4 rounded-md w-full max-w-lg"
        />
        <textarea
        name="message"
        placeholder="Message"
        className="bg-fourth p-4 rounded-md w-full max-w-lg min-h-md"
         />
         <button 
        type="submit"
        className="bg-hero hover:bg-hero-hover text-white rounded-md w-full max-w-lg p-4"
         >
          Submit
         </button>
      </form>
    </div>
  );
};

export default ContactMe;