import { useState, useContext } from "react";
import ResizeContext from "../context/ResizeContext";
import SoundContext from "../context/SoundContext";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import RecordsTable from "./RecordsTable";

export default function RecordsContent({ type, history, title }) {
  const { t } = useTranslation();
  const { getWidth } = useContext(ResizeContext);
  const [pagIndex, setPagIndex] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);

  const { sound, useSound } = useContext(SoundContext);
  const [playNext] = useSound("/assets/audio/sfx/next.mp3");
  const [playPrev] = useSound("/assets/audio/sfx/prev.mp3");
  const [playNone] = useSound("/assets/audio/sfx/none.mp3", { volume: 0.8 });

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);

  const showNext = () => {
    if (pagIndex < totalPages) {
      setPagIndex(pagIndex + 1);
      setCurrentPosition(currentPosition + ITEMS_PER_PAGE);
      if (sound) playNext();
    } else if (sound) playNone();
  };

  const showPrev = () => {
    if (pagIndex > 1) {
      setPagIndex(pagIndex - 1);
      setCurrentPosition(currentPosition - ITEMS_PER_PAGE);
      if (sound) playPrev();
    } else if (sound) playNone();
  };

  // Lấy 5 item cho trang hiện tại, bắt đầu từ cuối mảng
  const slicedHistory = history.slice(
    Math.max(0, history.length - (currentPosition + ITEMS_PER_PAGE)),
    history.length - currentPosition
  );

  return (
    <div
      className="h-100 d-flex flex-column align-items-center justify-content-between"
      style={{ padding: `0 ${getWidth(50)}px` }}
    >
      <p
        className="mt-2 mb-0"
        style={{
          fontWeight: "bold",
          fontSize: getWidth(38, 20),
          alignSelf: "flex-start",
        }}
      >
        {type.includes("char")
          ? t("modal.vers.event1")
          : type.includes("weap")
          ? t("modal.vers.event2")
          : title}
      </p>
      <RecordsTable history={slicedHistory} type={type} title={title} />
      <div className="d-flex justify-content-center align-items-center">
        <LazyLoadImage
          effect="opacity"
          alt="Right Pagination Arrow"
          src="./assets/details/pag-arrow.webp"
          style={{ rotate: "-180deg" }}
          width={getWidth(22, 11)}
          onClick={showPrev}
        />
        <p style={{ color: "#767676", margin: "0 40px" }}>{pagIndex}</p>
        <LazyLoadImage
          effect="opacity"
          alt="Left Pagination Arrow"
          src="./assets/details/pag-arrow.webp"
          width={getWidth(22, 11)}
          onClick={showNext}
        />
      </div>
    </div>
  );
}
