import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import "react-toastify/dist/ReactToastify.css";
// template_kaud3hh
// service_5jdwapg
// y1ba3qhl5YBXS8mV7

const Contact = () => {
  const formRef = useRef();
  const toastId = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // toast.success("Error Notification !", {
    //   position: toast.POSITION.BOTTOM_LEFT,
    // });
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const notify = () =>
    (toastId.current = toast.loading("Submitting your message.", {
      autoClose: false,
    }));

  const update = () =>
    toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });

  const handleSubmit = (e) => {
    e.preventDefault();
    notify();
    setLoading(true);

    emailjs
      .send(
        "service_5jdwapg",
        "template_kaud3hh",
        {
          from_name: form.name,
          to_name: "Nimesh",
          from_email: form.email,
          to_email: "nimeshvishwav@gmail.com",
          message: form.message,
        },
        "y1ba3qhl5YBXS8mV7"
      )
      .then(() => {
        setLoading(false);
        toast.success("Thank you. I will get back to you as soon as possible", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 9000,
        });
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 9000,
        });
      })
      .finally(() => {
        toast.dismiss(toastId.current);
        setLoading(false);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      });
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your name</span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
