import React, { useRef, useEffect } from 'react';
import '../App.css'; // Ensure this path is correct

// Import images from src/images
import brokenImg from '../images/broken.jpeg';
import chetImg from '../images/chet.jpg';
import evansBlueImg from '../images/evansblue.jpg';
import guardiansImg from '../images/gaurdians.jpg';
import glassanimalImg from '../images/glassanimal.jpeg';
import hotelpoolsImg from '../images/hotelpools.jpg';
import iJustDiedImg from '../images/I-Just-Died-In-Your-Arms.jpg';
import rhythmDancerImg from '../images/rhythm is a dancer.jpeg';
import sawyerImg from '../images/sawyer.jpeg';
import purityImg from '../images/purity.jpg';
import theflaming from '../images/theflaming.jpg';
import kiss from '../images/kiss.jpg';
import pinkpony from '../images/pinkpony.jpg';

const GalleryComponent = () => {
  const galleryContainerRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const galleryContainer = galleryContainerRef.current;
    const indicator = indicatorRef.current;

    const galleryItems = galleryContainer.querySelectorAll(".gallery-item");
    const defaultItemFlex = "0 1 20px";
    const hoverItemFlex = "1 1 400px";

    const updateGalleryItems = () => {
      galleryItems.forEach((item) => {
        const isHovered = item.getAttribute('data-hovered') === 'true';
        item.style.flex = isHovered ? hoverItemFlex : defaultItemFlex;
      });
    };

    galleryItems[0].setAttribute('data-hovered', 'true');
    updateGalleryItems();

    const handleMouseEnter = (item) => () => {
      galleryItems.forEach((otherItem) => {
        otherItem.setAttribute('data-hovered', otherItem === item ? 'true' : 'false');
      });
      updateGalleryItems();
    };

    const handleMouseMove = (e) => {
      const rect = galleryContainer.getBoundingClientRect();
      indicator.style.left = `${e.clientX - rect.left}px`;
    };

    galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter(item));
    });

    galleryContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      galleryItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter(item));
      });
      galleryContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="gallery-container">
      <div ref={galleryContainerRef} className="gallery">
        <div className="gallery-item"><img src={brokenImg} alt="Broken" /></div>
        <div className="gallery-item"><img src={chetImg} alt="Chet" /></div>
        <div className="gallery-item"><img src={evansBlueImg} alt="Evans Blue" /></div>
        <div className="gallery-item"><img src={guardiansImg} alt="Guardians" /></div>
        <div className="gallery-item"><img src={glassanimalImg} alt="Glass Animals" /></div>
        <div className="gallery-item"><img src={hotelpoolsImg} alt="Hotel Pools" /></div>
        <div className="gallery-item"><img src={iJustDiedImg} alt="I Just Died In Your Arms" /></div>
        <div className="gallery-item"><img src={rhythmDancerImg} alt="Rhythm Is a Dancer" /></div>
        <div className="gallery-item"><img src={sawyerImg} alt="Sawyer" /></div>
        <div className="gallery-item"><img src={purityImg} alt="Purity" /></div>
        <div className="gallery-item"><img src={theflaming} alt="The Flaming" /></div>
        <div className="gallery-item"><img src={kiss} alt="Kiss" /></div>
        <div className="gallery-item"><img src={pinkpony} alt="Pink Pony" /></div>
      </div>
      <div ref={indicatorRef} className="indicator"></div>
    </div>
  );
};

export default GalleryComponent;
