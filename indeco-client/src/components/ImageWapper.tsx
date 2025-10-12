import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import FullScreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ImageWapperProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    images: string[];
    index: number;
}

const ImageWapper = ({ open, setOpen, images, index }: ImageWapperProps ) => {

  return (
    <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({ src: img }))}
        index={index}
        captions={{
          showToggle: true,
          descriptionTextAlign: "end",
        }}
        plugins={[Zoom, Slideshow, Captions, FullScreen, Thumbnails, Download]}
        animation={{ fade: 300, swipe: 300 }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          doubleClickDelay: 300,
        }}
        styles={
          { 
            root: { backgroundColor: "#000000ba" },
            container: { backgroundColor: "transparent" },
            thumbnailsContainer: { backgroundColor: "transparent" },
            // thumbnailsTrack: { backgroundColor: "transparent" },
            thumbnail: { backgroundColor: "transparent" },
          }
        }
      />
  );
};

export default ImageWapper;
