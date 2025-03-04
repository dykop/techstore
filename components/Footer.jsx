import { FaChrome, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/origami.importados/",
      label: "Instagram",
    },

    {
      icon: FaWhatsapp,
      url: "https://api.whatsapp.com/send/?phone=%2B541123551939&text&type=phone_number&app_absent=0",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="footer bg-gray-800 text-white py-6 w-full">
      <div className="w-full px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="mb-0 text-lg">
              &copy; {currentYear}{" "}
              <a
                className="text-blue-600 hover:text-blue-600 text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                TIVBEXE
              </a>{" "}
              Origami Importados || Todos los derechos reservados.
            </p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                className="text-blue-400 hover:text-blue-600"
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
