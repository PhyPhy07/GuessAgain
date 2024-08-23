import { useRef, useEffect } from 'react';
import './App.css';

// Import images from the src/assets folder
import bakamitaiImg from './assets/bakamitai.jpg';
import brokenImg from './assets/broken.jpeg';
import chetImg from './assets/chet.jpg';
import evansBlueImg from './assets/evansblue.jpg';
import guardiansImg from './assets/gaurdians.jpg';
import glassanimalImg from './assets/glassanimal.jpeg';
import hotelpoolsImg from './assets/hotelpools.jpg';
import iJustDiedImg from './assets/I-Just-Died-In-Your-Arms.jpg';
import rhythmDancerImg from './assets/rhythm is a dancer.jpeg';
import sawyerImg from './assets/sawyer.jpeg';

function App() {
  const galleryContainerRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const galleryContainer = galleryContainerRef.current;
    const indicator = indicatorRef.current;

    const galleryItems = galleryContainer.querySelectorAll(".gallery-item");
    const defaultItemFlex = "0 1 20px";
    const hoverItemFlex = "1 1 400px";

    // Update gallery items flex style based on hover state
    const updateGalleryItems = () => {
      galleryItems.forEach((item) => {
        const isHovered = item.getAttribute('data-hovered') === 'true';
        item.style.flex = isHovered ? hoverItemFlex : defaultItemFlex;
      });
    };

    // Set initial hover state for the first item
    galleryItems[0].setAttribute('data-hovered', 'true');
    updateGalleryItems();

    // Event handler for mouse enter
    const handleMouseEnter = (item) => () => {
      galleryItems.forEach((otherItem) => {
        otherItem.setAttribute('data-hovered', otherItem === item ? 'true' : 'false');
      });
      updateGalleryItems();
    };

    // Attach mouse enter event listeners
    galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter(item));
    });

    // Event handler for mouse move
    const handleMouseMove = (e) => {
      const rect = galleryContainer.getBoundingClientRect();
      indicator.style.left = `${e.clientX - rect.left}px`;
    };

    // Attach mouse move event listener
    galleryContainer.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listeners on component unmount
    return () => {
      galleryItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter(item));
      });
      galleryContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div ref={galleryContainerRef} className="gallery">
          <div className="gallery-item"><img src={bakamitaiImg} alt="Baka Mitai" /></div>
          <div className="gallery-item"><img src={brokenImg} alt="Broken" /></div>
          <div className="gallery-item"><img src={chetImg} alt="Chet" /></div>
          <div className="gallery-item"><img src={evansBlueImg} alt="Evans Blue" /></div>
          <div className="gallery-item"><img src={guardiansImg} alt="Guardians" /></div>
          <div className="gallery-item"><img src={glassanimalImg} alt="Glass Animals" /></div>
          <div className="gallery-item"><img src={hotelpoolsImg} alt="Hotel Pools" /></div>
          <div className="gallery-item"><img src={iJustDiedImg} alt="I Just Died In Your Arms" /></div>
          <div className="gallery-item"><img src={rhythmDancerImg} alt="Rhythm Is a Dancer" /></div>
          <div className="gallery-item"><img src={sawyerImg} alt="Sawyer" /></div>
        </div>
        <div ref={indicatorRef} className="indicator"></div>
      </div>
    </div>
  );
}

export default App;
