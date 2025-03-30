import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { allChars, allWeapons } from "../../util/Constants";
import SoundContext from "../context/SoundContext";
import ResizeContext from "../context/ResizeContext";
import { useTranslation } from "react-i18next";
import { inventoryService } from "../../services/inventoryService";

export default function DataBankOverlay({ show, setShow, handleSelect }) {
  const { getWidth } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);

  const [playMenuOpen] = useSound("../assets/audio/sfx/db-menu-open.mp3");
  const [playMenuClose] = useSound("../assets/audio/sfx/db-menu-close.mp3");
  const [playSelect] = useSound("../assets/audio/sfx/db-select.mp3");

  const handleClose = () => setShow(false);

  const [stash, setStash] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await inventoryService.getInventoryForDataBank();
        setStash(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchInventory();
    }
  }, [show]);

  const total = Object.entries(stash).reduce(
    ([accLC, accC], [name, count]) => {
      if (allChars.includes(name)) return [accLC, accC + (count > 0 ? 1 : 0)];
      else return [accLC + (count > 0 ? 1 : 0), accC];
    },
    [0, 0]
  );

  const { t } = useTranslation();

  return (
    <Modal
      className="db"
      style={{ backgroundColor: "rgba(24, 29, 49, 0.8)" }}
      show={show}
      onHide={handleClose}
      centered
      onEntering={() => {
        if (sound) playMenuOpen();
      }}
      onExiting={() => {
        if (sound) playMenuClose();
      }}
    >
      <div className="db-type-group">
        <LazyLoadImage
          className="db-type-icon"
          style={{ margin: `0 ${getWidth(10, 5)}px` }}
          type="weap"
          effect="opacity"
          alt="Light Cones Icon"
          src="/assets/db/db-weap-icon.webp"
          onClick={() => {
            if (sound) playSelect();
            handleSelect("weap");
          }}
          draggable="false"
        />
        <div style={{ color: "white" }}>{t("db.type1")}</div>
        <div style={{ color: "#dac291" }}>
          {loading ? "..." : error ? "?" : `${total[0]}/${allWeapons.length}`}
        </div>
      </div>
      <div className="db-type-group">
        <LazyLoadImage
          className="db-type-icon"
          style={{ margin: `0 ${getWidth(10, 5)}px` }}
          type="char"
          effect="opacity"
          alt="Characters Icon"
          src="/assets/db/db-char-icon.webp"
          onClick={() => {
            if (sound) playSelect();
            handleSelect("char");
          }}
          draggable="false"
        />
        <div style={{ color: "white" }}>{t("db.type2")}</div>
        <div style={{ color: "#dac291" }}>
          {loading ? "..." : error ? "?" : `${total[1]}/${allChars.length}`}
        </div>
      </div>
    </Modal>
  );
}
