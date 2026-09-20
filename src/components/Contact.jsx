import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { socialLinks } from "../constants";
import "react-toastify/dist/ReactToastify.css";

const contactItems = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: socialLinks.phone,
    href: socialLinks.phoneHref,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: socialLinks.location,
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "Nimesh9172",
    href: socialLinks.github,
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "nimesh-vishwakarma",
    href: socialLinks.linkedin,
  },
];

const Contact = () => {
  const formRef = useRef();
  const toastId = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toastId.current = toast.loading("Submitting your message.", {
      autoClose: false,
    });
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
    <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-8 lg:gap-12">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="w-full lg:w-1/2 bg-black-100 p-6 sm:p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={`${styles.sectionHeadText} cursor-invert`}>Contact.</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">
          A role, a collaboration, or a quick hello — I usually reply within a day.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {contactItems.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3 min-w-0">
              <span className="mt-0.5 w-8 h-8 shrink-0 rounded-full bg-tertiary flex items-center justify-center text-[#915EFF] text-sm">
                <Icon />
              </span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="min-w-0 hover:text-white"
                >
                  <span className="block text-[11px] uppercase tracking-wider text-secondary">
                    {label}
                  </span>
                  <span className="block text-sm text-white-100 break-all">{value}</span>
                </a>
              ) : (
                <div className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-secondary">
                    {label}
                  </span>
                  <span className="block text-sm text-white-100">{value}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your name</span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="contact-field bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className="contact-field bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows="6"
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="A role, a project, or just a hello..."
              className="contact-field bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium resize-none"
            />
          </label>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-[#915EFF] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="w-full lg:w-1/2 h-[320px] sm:h-[420px] lg:h-[560px] lg:sticky lg:top-28 overflow-hidden"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
