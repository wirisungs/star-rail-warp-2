import React, { useState, useContext, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SoundContext from "./context/SoundContext";
import ResetModal from "./modals/ResetModal";
import VersionModal from "./modals/VersionModal";
import ResizeContext from "./context/ResizeContext";
import DataBankOverlay from "./db/DataBankOverlay";
import CreditsModal from "./modals/CreditsModal";
import PhonoModal from "./modals/PhonoModal";
import LangModal from "./modals/LangModal";
import { useTranslation } from "react-i18next";
import soundService from "./services/SoundService";

const Settings = ({
  vers,
  showDB,
  setShowDB,
  setVers,
  setDBType,
  setContent,
  showStart,
  bgm,
  bannerType,
  setBannerType,
}) => {
  const { getWidth } = useContext(ResizeContext);

  const [showSettings, setShowSettings] = useState(false);

  const handleClose = () => {
    setShowSettings(false);
    if (sound) soundService.playSound('menu-close');
  };
  const handleShow = () => {
    setShowSettings(true);
    if (sound) soundService.playSound('menu-open');
  };

  const { sound, setSound, setContinueSound } = useContext(SoundContext);

  const [showReset, setShowReset] = useState(false);

  const [showVersion, setShowVersion] = useState(false);

  const [showCredits, setShowCredits] = useState(false);

  const [showLang, setShowLang] = useState(false);

  const [showPhono, setShowPhono] = useState(false);

  const handleDBSelect = (type) => {
    setDBType(type);
    setContent("data-bank");
    if (sound) soundService.playSound('db-load');
  };

  const { i18n } = useTranslation();

  const trackInfo = () => {
    const fileName = bgm[0];
    const regex = /^(.+?)-(.+?)$/;
    const match = fileName.match(regex);
    const title = match[2];
    const album = match[1].replace(/-/g, " ");
    return [album, title];
  };

  useEffect(() => {
    function handleKeyDown({ keyCode }) {
      if (keyCode === 27 && !showSettings && !showDB && !showStart) {
        if (sound) soundService.playSound('menu-select');
        setShowSettings(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSettings, showDB, sound, showStart]);

  return (
    <React.Fragment>
      <LazyLoadImage
        effect="opacity"
        id="settings-button"
        alt="Settings Button"
        src="assets/menu/phone.webp"
        width={getWidth(33, 18)}
        onClick={() => {
          handleShow();
          if (sound) soundService.playSound('menu-select');
        }}
        draggable="false"
      />
      <ResetModal show={showReset} setShow={setShowReset} />
      <VersionModal
        show={showVersion}
        setShow={setShowVersion}
        currentVers={vers}
        setVers={setVers}
        bannerType={bannerType}
        setBannerType={setBannerType}
      />
      <DataBankOverlay
        show={showDB}
        setShow={setShowDB}
        handleSelect={handleDBSelect}
      />
      <CreditsModal show={showCredits} setShow={setShowCredits} />
      <LangModal show={showLang} setShow={setShowLang} />
      <PhonoModal
        show={showPhono}
        setShow={setShowPhono}
        handleSelect={bgm[1]}
        currentAlbum={trackInfo()[0]}
        currentTrack={trackInfo()[1]}
      />
      <Offcanvas
        show={showSettings}
        onHide={handleClose}
        placement="end"
        style={{
          backgroundColor: "#111213",
          color: "#e9e9eb",
          width: getWidth(450, 200),
        }}
        onEntering={() => {
          if (sound) setTimeout(() => soundService.playSound('menu-open'), 200);
        }}
      >
        <Offcanvas.Header>
          <LazyLoadImage
            effect="opacity"
            alt="Game Logo"
            src={`assets/menu/${i18n.resolvedLanguage}/logo.webp`}
            draggable="false"
            width={getWidth(356, 160)}
          />
          <CloseButton onClose={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: getWidth(20),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: getWidth(20),
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Banner Version Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/banner-version.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) soundService.playSound('button-select');
                setShowVersion(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Data Bank Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/data-bank.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) soundService.playSound('button-select');
                setShowDB(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Phonograph Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/phono.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) soundService.playSound('button-select');
                setShowPhono(true);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: getWidth(20),
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Audio Toggle Button"
              className="menu-button"
              src={`./assets/menu/${i18n.resolvedLanguage}/audio-${
                sound ? "on" : "off"
              }.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                soundService.playSound('button-select');
                setSound(!sound);
                setContinueSound(!sound);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Reset Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/reset.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) soundService.playSound('button-select');
                setShowReset(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Language Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/language.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) soundService.playSound('button-select');
                setShowLang(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Credits Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/credits.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) soundService.playSound('button-select');
                setShowCredits(true);
              }}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default Settings;
