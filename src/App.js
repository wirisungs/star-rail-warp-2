import React, { useState, useCallback, useEffect, Suspense } from "react";
import "./css/App.css";
import "./css/Lazy.css";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import useWindowSize from "./components/hooks/useWindowSize";
import WarpSingle from "./components/WarpSingle";
import useSound from "use-sound";
import { SoundProvider } from "./components/context/SoundContext";
import { ResizeProvider } from "./components/context/ResizeContext";
import Main from "./components/Main";
import DataBank from "./components/db/DataBank";
import { AnimatePresence } from "framer-motion";
import { usePageVisibility } from "react-page-visibility";
import DetailsMain from "./components/details/DetailsMain";
import StatsMain from "./components/stats/StatsMain";
import useBGM from "./components/hooks/useBGM";
import StartModal from "./components/modals/StartModal";
import { BGM } from "./util/Constants";
import BannerFactory from "./components/factory/BannerFactory";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import './css/Auth.css';
import { warpService } from './services/warpService';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from "./components/Loading";

// Protected Route component
const ProtectedRouteComponent = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("main");
  const [showStart, setShowStart] = useState(process.env.NODE_ENV === "production");
  const [bannerType, setBannerType] = useState(
    sessionStorage.getItem("bannerType") || "beginner"
  );
  const [currentWarp, setCurrentWarp] = useState([]);
  const [history, setHistory] = useState([]);
  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);
  const [showDB, setShowDB] = useState(false);
  const [DBType, setDBType] = useState("char");
  const [newItems, setNewItems] = useState([]);

  const [bannerState, setBannerState] = useState({
    beginner: {
      pityFive: 0,
      pityFour: 0,
      guaranteeFive: false,
      guaranteeFour: false,
      maxPity: 50,
      softPity: 40,
      rateFive: 0.006,
    },
    char: {
      pityFive: 0,
      pityFour: 0,
      guaranteeFive: false,
      guaranteeFour: false,
      maxPity: 90,
      softPity: 75,
      rateFive: 0.006,
    },
    weap: {
      pityFive: 0,
      pityFour: 0,
      guaranteeFive: false,
      guaranteeFour: false,
      maxPity: 80,
      softPity: 65,
      rateFive: 0.008,
    },
    standard: {
      pityFive: 0,
      pityFour: 0,
      guaranteeFive: false,
      guaranteeFour: false,
      maxPity: 90,
      softPity: 75,
      rateFive: 0.006,
      typeCount: 0,
    },
  });

  const [sound, setSound] = useState(false);
  const [continueSound, setContinueSound] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("bgm") ? JSON.parse(localStorage.getItem("bgm")) : true
  );

  const randBGM = () => {
    let keys = Object.keys(BGM);
    let album = keys[(keys.length * Math.random()) << 0];
    let tracks = BGM[album];
    // return "ooc-science-fiction";
    return album + "-" + tracks[Math.floor(Math.random() * tracks.length)];
  };

  const {
    BGMVolume,
    setBGMVolume,
    track,
    setTrack,
    setMuted,
    loaded,
    setLoaded,
    soundComponent,
  } = useBGM(randBGM(), "./assets/audio/bgm/");

  useEffect(() => {
    if (sound && soundEnabled) setMuted(false);
    return () => setMuted(true);
  }, [soundEnabled, sound, setMuted]);

  const soundValue = {
    sound,
    setSound,
    setContinueSound,
    soundEnabled,
    setSoundEnabled,
    useSound,
    loaded: loaded,
  };

  const isVisible = usePageVisibility();

  const size = useWindowSize();

  const getWidth = useCallback(
    (width, minWidth = 0) => {
      return window.innerWidth > 1280
        ? width
        : Math.max((size.width * width) / 1280, minWidth);
    },
    [size]
  );

  const getHeight = useCallback(
    (height, width, minHeight = 0, minWidth = 0) => {
      return window.innerWidth > 1280
        ? height
        : Math.max((getWidth(width, minWidth) * height) / width, minHeight);
    },
    [getWidth]
  );

  const resizeValue = { getWidth, getHeight };

  // pauses sound when focus is lost
  useEffect(() => {
    if (!isVisible) setSound(false);
    else setSound(continueSound);
  }, [isVisible, sound, continueSound]);

  const handleTrack = (newTrack, loaded = false) => {
    if (newTrack === track) return;
    setLoaded(loaded);
    setTrack(newTrack);
  };

  const [playWarpBGM, warpData] = useSound("/assets/audio/bgm/warp-loop.mp3", {
    loop: true,
  });

  useEffect(() => {
    if (!sound) {
      warpData.stop();
      return;
    }

    let warpTimeout;

    if (
      content === "main" ||
      content === "data-bank" ||
      content === "details"
    ) {
      if (
        localStorage.getItem("bgm")
          ? JSON.parse(localStorage.getItem("bgm"))
          : true
      )
        setSoundEnabled(true);
      warpData.stop();
    } else if (content === "single") {
      if (BGMVolume > 0) setBGMVolume(0);
      if (warpData.sound.playing()) return;
      playWarpBGM();
      warpData.sound.fade(0, 1, 500);
    }
    return () => {
      if (content === "main") {
        clearTimeout(warpTimeout);
      }
      if (content === "video") {
        clearTimeout(warpTimeout);
        warpData.stop();
      }
      if (content === "results") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 500);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 500);
      }
    };
  }, [
    content,
    sound,
    currentWarp.length,
    playWarpBGM,
    warpData,
    BGMVolume,
    setBGMVolume,
  ]);

  // Load banner state from database
  useEffect(() => {
    const loadBannerStates = async () => {
      try {
        setLoading(true);
        const bannerTypes = ['beginner', 'char', 'weap', 'standard'];
        const states = {};

        for (const type of bannerTypes) {
          try {
            const state = await warpService.getBannerState(type);
            if (state) {
              states[type] = {
                ...bannerState[type], // Keep default values
                ...state, // Override with values from database
              };
            }
          } catch (error) {
            console.warn(`Failed to load state for banner ${type}:`, error);
            states[type] = bannerState[type]; // Use default values
          }
        }

        setBannerState(states);
      } catch (error) {
        console.error('Error loading banner states:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadBannerStates();
    }
  }, [user]);

  // Load warp history
  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;

      try {
        const data = await warpService.getWarpHistory();
        setHistory(data.history || []);
      } catch (error) {
        console.error('Error loading warp history:', error);
      }
    };

    loadHistory();
  }, [user]);

  if (authLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ResizeProvider value={resizeValue}>
      <SoundProvider value={soundValue}>
        {soundComponent}
        <div className="App">
          <StartModal show={showStart} setShow={setShowStart} />
          <AnimatePresence>
            {content === "main" && (
              <Main
                bannerType={bannerType}
                bannerState={bannerState}
                setBannerState={setBannerState}
                showDB={showDB}
                setShowDB={setShowDB}
                setBannerType={setBannerType}
                setNewItems={setNewItems}
                setHasFive={setHasFive}
                setHasFour={setHasFour}
                setContent={setContent}
                setCurrentWarp={setCurrentWarp}
                setDBType={setDBType}
                showStart={showStart}
                history={history}
                setHistory={setHistory}
                bgm={[track, handleTrack]}
              />
            )}
            {content === "video" && (
              <WarpVideo
                rarity={hasFive ? "five" : hasFour ? "four" : "three"}
                event={
                  bannerType.includes("char") || bannerType.includes("weap")
                }
                onEnded={() => {
                  setContent("single");
                }}
                warpBGM={{ playWarpBGM, warpData }}
              />
            )}
            {content === "single" && (
              <WarpSingle
                currentWarp={currentWarp}
                hasFive={hasFive}
                newItems={newItems}
                setNewItems={setNewItems}
                setContent={setContent}
              />
            )}
            {content === "results" && (
              <WarpResults
                currentWarp={currentWarp}
                hasFive={hasFive}
                newItems={newItems}
                onClose={() => {
                  setContent("main");
                  setNewItems([]);
                }}
              />
            )}
            {content === "data-bank" && (
              <DataBank
                type={DBType}
                setContent={setContent}
                setShowDB={setShowDB}
              />
            )}
            {content === "details" && (
              <DetailsMain
                setContent={setContent}
                bannerType={bannerType}
                history={history}
              />
            )}
            {content === "stats" && (
              <StatsMain
                setContent={setContent}
                bannerType={bannerType}
                setBannerType={setBannerType}
                bannerState={bannerState}
                setBannerState={setBannerState}
              />
            )}
          </AnimatePresence>
        </div>
      </SoundProvider>
    </ResizeProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
