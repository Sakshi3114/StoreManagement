import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image1 from "../assets/homepage.jpg";
import Image2 from "../assets/homepage2.jpg";
import Image3 from "../assets/homepage3.jpg";

const images = [Image1, Image2, Image3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <section
        className="hero poppins"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>
            Smart Store Management <br /> for Billing & Inventory
          </h1>

          <p>
            Manage stock, generate bills, track profit/loss, and grow your
            business with a single platform.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Watch Demo</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
