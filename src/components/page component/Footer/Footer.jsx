import { useEffect, useState } from "react";
import footerData from "./data/Footer.json";
const Footer = () => {
  const [data, setData] = useState(footerData);

  useEffect(() => {
    const saved = localStorage.getItem("footerData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <footer className="bg-red-700 text-white p-6">
      <div>
        <img src={data.logoUrl} alt="Logo" className="w-24 mb-4" />
        <p>{data.description}</p>
      </div>

      <div>
        <h4>{data.newsletterText}</h4>
        <input placeholder="Your email" className="p-2" />
      </div>

      <div>
        <h4>Resources</h4>
        <ul>
          {data.resources.map((link) => (
            <li key={link.title}>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Repeat for Quick Links, Legal, Contact, Social */}
    </footer>
  );
};
export default Footer;
