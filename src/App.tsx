import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import { MapPin, Calendar, Clock, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { attendanceOptions, guestOptions, strings as t } from "./i18n";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Brandon & Christina
 * Background: White
 * Accents: Burgundy wine / a little navy blue
 */

/**
 * iOS Safari often throttles or skips IntersectionObserver callbacks
 * during fast momentum scrolling, causing whileInView elements to
 * stay at their initial (hidden) state. We detect iOS and simply
 * never hide elements initially — they render visible immediately.
 */
const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as unknown as { MSStream?: unknown }).MSStream;

/** Phones & tablets: skip heavy effects and hidden-first animations */
function detectLiteExperience(): boolean {
  if (typeof window === "undefined") return false;
  if (isIOS) return true;
  if (window.matchMedia("(max-width: 768px)").matches) return true;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

const preferLiteExperience = detectLiteExperience();

/** No initial hidden state — content stays visible (fixes iOS scroll / IO glitches) */
function scrollInit(props: TargetAndTransition): TargetAndTransition | false {
  return preferLiteExperience ? false : props;
}

const safeViewport = {
  once: true,
  ...(preferLiteExperience ? { margin: "200px 0px 200px 0px", amount: 0 as const } : {}),
};


const mandalaImage = "/images/mandala_gold.png";

/** Web app URL from deploying google-apps-script.js (Deploy > Web app) */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzy8gpNYgr3NJ3qY3ot0oH0cqisNWHTVCdg5N1IMpSwMDY8kTx1mXZqwaZkrElrQP5ZeQ/exec";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({
  eager = false,
  loading,
  decoding,
  className = "",
  onLoad,
  ...props
}: InviteImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const markLoaded = () => setLoaded(true);
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
      return;
    }

    img.addEventListener("load", markLoaded);
    img.addEventListener("error", markLoaded);
    return () => {
      img.removeEventListener("load", markLoaded);
      img.removeEventListener("error", markLoaded);
    };
  }, [props.src]);

  const fadeClass =
    preferLiteExperience || loaded ? "is-visible" : "";

  return (
    <img
      ref={imgRef}
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...(eager && preferLiteExperience ? { fetchPriority: "high" as const } : {})}
      className={`invite-image-fade ${fadeClass} ${className}`.trim()}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      {...props}
    />
  );
}

function LazyMapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src="https://maps.google.com/maps?q=Ranowell%20Hotel,%20Chilaw%20Road,%20Kochchikade,%20Negombo&t=&z=14&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full grayscale-[0.3] md:hover:grayscale-0 transition-all duration-1000"
        title="Venue location map"
      />
    </div>
  );
}

function FloatingPetals({ disabled = false }: { disabled?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion || isMobile || preferLiteExperience) {
      setPetals([]);
      return;
    }

    const colors = ["#dca5b1", "#8a2c43", "#1b2a4a", "#f8eaed"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled]);

  if (disabled || preferLiteExperience) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(113,163,211,0.5)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}


const envelopeImage ="/images/envelope_burgundy.png";

/** Opening screen: guest taps the envelope to reveal the invitation */
function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [sparkles] = useState(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      scale: Math.random() * 0.6 + 0.6,
      delay: Math.random() * 4,
    })),
  );
  const [petals] = useState(() =>
    Array.from({ length: preferLiteExperience ? 8 : 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      scale: Math.random() * 0.8 + 0.55,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * -18,
    })),
  );

  return (
    <motion.section
      key="envelope-intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-[60] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(138,44,67,0.10),transparent_40%),linear-gradient(135deg,#ffffff_0%,#fbf8f9_38%,#ffffff_65%,#fdf7f8_100%)]" />
      <div className="absolute inset-0 pointer-events-none decorative-blur">
        <div className="absolute top-[-12rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-theme-300/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-navy-700/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, rgba(138, 44, 67, 0.35) 1.2px, transparent 1.2px), linear-gradient(rgba(138, 44, 67, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 44, 67, 0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px, 80px 80px, 80px 80px",
          }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="envelope-sparkle absolute h-1 w-1 rounded-full bg-theme-300"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              transform: `scale(${sparkle.scale})`,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="envelope-petal absolute top-[-10%]"
            style={{
              left: `${petal.left}%`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div
              className="h-5 w-3 bg-gradient-to-b from-theme-100 via-theme-300 to-theme-600 shadow-[0_0_14px_rgba(138,44,67,0.18)]"
              style={{ transform: `scale(${petal.scale}) rotate(18deg)`, borderRadius: "70% 30%" }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-20 flex min-h-[100dvh] flex-col items-center justify-center px-6">
        <motion.div
          initial={scrollInit({ opacity: 0, y: -20 })}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-theme-400/70" />
            <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-theme-700 font-bold">{t.envelopeTitle}</p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-theme-400/70" />
          </div>
          <h1 className="font-serif uppercase font-normal text-[32px] md:text-5xl leading-[1.2] tracking-[0.12em] text-theme-800">
            {t.groom} <span className="text-navy-800">{t.ampersand}</span> {t.bride}
          </h1>
        </motion.div>

        <motion.div
          initial={scrollInit({ opacity: 0, scale: 0.92 })}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: preferLiteExperience ? 0 : 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-theme-300/20 blur-3xl scale-105 decorative-blur" />
          <motion.button
            type="button"
            onClick={onOpen}
            aria-label={t.openEnvelope}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative block cursor-pointer isolate"
          >
            <img
              alt="Wedding Envelope"
              src={envelopeImage}
              className="w-[450px] max-w-full h-auto drop-shadow-[0_20px_40px_rgba(62,16,28,0.35)]"
            />
          </motion.button>
          <p className="envelope-hint mt-6 text-center text-[11px] uppercase tracking-[0.45em] text-theme-700/80 font-bold">
            {t.touchToUnveil}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CountdownTimer() {
  const targetDate = new Date("December 18, 2026 17:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: t.days, value: days },
    { label: t.hours, value: hours },
    { label: t.minutes, value: minutes },
    { label: t.seconds, value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={scrollInit({ opacity: 0, y: 30 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={safeViewport}
          transition={
            preferLiteExperience
              ? { duration: 0.25 }
              : { delay: i * 0.15, type: "spring", stiffness: 80 }
          }
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-serif text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function WeddingInvitation({ guestName }: { guestName?: string | null }) {
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [heroSparkles] = useState(() =>
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: 12 + Math.random() * 76,
      top: 8 + Math.random() * 84,
      scale: Math.random() * 0.7 + 0.5,
      delay: Math.random() * 4,
    })),
  );

  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(() =>
    typeof window !== "undefined" ? detectLiteExperience() : false,
  );

  const [rsvpData, setRsvpData] = useState({
    "Full Name": guestName || "",
    "Attendance": "Joyfully accepts",
    "Guests": "1 guest",
    "Guest Names": "",
    "Message": ""
  });
  const isAttending = rsvpData["Attendance"] === "Joyfully accepts";
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const submitToGoogleSheets = async (sheetName: string, data: Record<string, string>) => {
    const scriptUrl = GOOGLE_SCRIPT_URL;

    const formData = new URLSearchParams();
    formData.append("sheetName", sheetName);
    // Guests who decline have no party size or guest names to record
    const finalData: Record<string, string> = { ...data, "Invited As": guestName || "" };
    if (sheetName === "RSVP" && data["Attendance"] !== "Joyfully accepts") {
      finalData["Guests"] = "0";
      finalData["Guest Names"] = "";
    }
    formData.append("data", JSON.stringify(finalData));

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.ok) throw new Error("Network error");
      const result = await response.json();
      if (result.status !== "success") throw new Error(result.message || "Script error");
      return result;
    } catch (error) {
      console.error("Submission error:", error);
      throw error;
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData["Full Name"].trim()) return;
    if (isAttending && !rsvpData["Guest Names"].trim()) return;
    setRsvpStatus("submitting");
    try {
      await submitToGoogleSheets("RSVP", rsvpData);
      setRsvpStatus("success");
    } catch {
      setRsvpStatus("error");
    }
  };

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  useEffect(() => {
    const audio = backgroundMusicRef.current;
    if (!audio) return;

    const startMusic = () => {
      void audio.play().then(() => setIsMusicPlaying(true)).catch(() => {
        // Browsers may block autoplay until the visitor interacts with the page.
      });
    };

    startMusic();
    window.addEventListener("pointerdown", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
    };
  }, []);

  const toggleMusic = () => {
    const audio = backgroundMusicRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => setIsMusicPlaying(true)).catch(() => {
        setIsMusicPlaying(false);
      });
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  return (
    <main
      className={`h-[100dvh] w-full bg-[#ffffff] overflow-y-auto overflow-x-hidden relative font-montserrat smooth-mobile-scroll ${preferLiteExperience ? "mobile-lite ios-scroll-stable" : "scroll-smooth"}`}
    >
      <audio
        ref={backgroundMusicRef}
        src="/Dreams%20Come%20True%20-%20Dylan%20Carwyn%20Romantic%20Wedding%20Song%202025%20(Lyrics)%20-%20Dazzling%20Tunes%20(128k).mp3"
        loop
        preload="auto"
        aria-label="Background music"
      />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? t.musicOff : t.musicOn}
        aria-pressed={isMusicPlaying}
        className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-theme-200 bg-white/90 text-theme-800 shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-105"
      >
        {isMusicPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
      <AnimatePresence>
        {!isEnvelopeOpen && <EnvelopeIntro onOpen={() => setIsEnvelopeOpen(true)} />}
      </AnimatePresence>
      <FloatingPetals disabled={isLowPerformanceMode || !isEnvelopeOpen} />

      <motion.div
        key="website-stage"
        initial={preferLiteExperience ? false : { opacity: 0 }}
        animate={preferLiteExperience ? undefined : { opacity: 1 }}
        className="website-shell relative z-20 w-full"
      >

            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-[#fdf9f3]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Elegant%20Watercolor%20Floral%20Arch%20Invitation.png')" }}
                aria-hidden="true"
              />

              {/* Soft glow behind the text so it lifts off the paper */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.4)_38%,transparent_65%)]" aria-hidden="true" />
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {heroSparkles.map((sparkle) => (
                  <span
                    key={sparkle.id}
                    className="envelope-sparkle absolute h-1 w-1 rounded-full bg-gold-400"
                    style={{
                      left: `${sparkle.left}%`,
                      top: `${sparkle.top}%`,
                      transform: `scale(${sparkle.scale})`,
                      animationDelay: `${sparkle.delay}s`,
                    }}
                  />
                ))}
              </div>

              <div
                className="relative z-10 w-full max-w-[560px] min-h-[100dvh] flex flex-col items-center justify-center text-center px-14 py-20 md:py-24"
              >
                <p
                  className={`max-w-[230px] md:max-w-none text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.6em] leading-loose text-gold-600 font-semibold ${isEnvelopeOpen ? "hero-in" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {t.pleaseJoinUs}
                </p>

                <h1 className="mt-8 flex w-full flex-col items-center font-serif uppercase font-normal leading-none tracking-[0.1em]">
                  <span
                    className={`hero-names block text-[38px] sm:text-[44px] md:text-[60px] ${isEnvelopeOpen ? "hero-in" : ""}`}
                    style={{ animationDelay: "0.6s" }}
                  >
                    {t.groom}
                  </span>
                  <span
                    className={`my-1 flex items-center justify-center gap-3 ${isEnvelopeOpen ? "hero-in" : ""}`}
                    style={{ animationDelay: "0.8s" }}
                  >
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400" />
                    <span className="italic normal-case tracking-normal text-3xl md:text-4xl text-gold-500">{t.ampersand}</span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400" />
                  </span>
                  <span
                    className={`hero-names block text-[38px] sm:text-[44px] md:text-[60px] ${isEnvelopeOpen ? "hero-in" : ""}`}
                    style={{ animationDelay: "1s" }}
                  >
                    {t.bride}
                  </span>
                </h1>

                <p
                  className={`mt-5 font-serif italic text-base md:text-lg text-navy-800/80 ${isEnvelopeOpen ? "hero-in" : ""}`}
                  style={{ animationDelay: "1.2s" }}
                >
                  {t.gettingMarried}
                </p>

                {/* Date block: weekday | day | month */}
                <div
                  className={`mt-8 w-full max-w-[300px] ${isEnvelopeOpen ? "hero-in" : ""}`}
                  style={{ animationDelay: "1.4s" }}
                >
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center font-serif text-navy-800">
                    <span className="border-y border-gold-400/60 py-2 text-[11px] md:text-xs uppercase tracking-[0.3em]">{t.heroWeekday}</span>
                    <span className="px-4 text-5xl md:text-6xl leading-none text-theme-700">{t.heroDay}</span>
                    <span className="border-y border-gold-400/60 py-2 text-[11px] md:text-xs uppercase tracking-[0.3em]">{t.heroMonth}</span>
                  </div>
                  <p className="mt-2 font-serif text-lg tracking-[0.5em] text-gold-600">{t.heroYear}</p>
                </div>

                <p
                  className={`mt-5 inline-flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-theme-600 font-semibold ${isEnvelopeOpen ? "hero-in" : ""}`}
                  style={{ animationDelay: "1.6s" }}
                >
                  <MapPin className="h-3 w-3" />
                  {t.heroPlace}
                </p>
              </div>

              <div className="absolute bottom-16 md:bottom-10 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
                <div
                  className={`flex flex-col items-center gap-1 text-gold-600 ${isEnvelopeOpen ? "hero-in" : ""}`}
                  style={{ animationDelay: "2s" }}
                >
                  <span className="text-[8px] uppercase tracking-[0.4em]">{t.scrollDown}</span>
                  <ChevronDown className="hero-scroll-cue h-4 w-4" />
                </div>
              </div>
            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-12 md:py-20 w-full flex flex-col items-center px-4 relative">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                {/* Top-left: mandala on desktop */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -left-10 top-8 w-[460px] h-auto mix-blend-multiply opacity-[.33] -rotate-[8deg]" alt="" />
                {/* Top-right: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -right-10 top-2 w-[430px] h-auto mix-blend-multiply opacity-30 rotate-[12deg]" alt="" />
                {/* Bottom-left: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -left-6 bottom-8 w-[420px] h-auto mix-blend-multiply opacity-24 rotate-[180deg]" alt="" />
                {/* Bottom-right: mandala on desktop */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -right-8 bottom-14 w-[470px] h-auto mix-blend-multiply opacity-[.27] -rotate-[170deg]" alt="" />
              </div>

              {/* left.png / right.png on mobile: kept outside the dimmed overlay so they show in their original colors */}
              <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden z-0">
                <img src="/images/left.png" className="absolute -left-4 -top-4 w-[200px] h-auto object-contain" alt="" />
                <img src="/images/right.png" className="absolute -right-4 bottom-0 w-[200px] h-auto object-contain" alt="" />
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={scrollInit({ opacity: 0, y: -20 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={safeViewport}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-px h-10 md:h-16 bg-gradient-to-b from-transparent to-theme-400 mb-4 md:mb-8" />
                  <div className="bg-white/95 md:bg-transparent md:backdrop-blur-none px-6 py-3 md:p-0 rounded-2xl md:rounded-none shadow-[0_4px_20px_rgba(255,255,255,0.8)] md:shadow-none border border-white/60 md:border-none relative z-10">
                    <p className="font-serif uppercase text-navy-800 text-sm md:text-xl tracking-[0.15em] md:tracking-[0.2em] font-bold text-center leading-relaxed mb-4 md:mb-6">
                      {t.groomParents}
                      <span className="block font-serif italic text-theme-500 text-xl md:text-3xl font-normal tracking-normal my-1">{t.ampersand}</span>
                      {t.brideParents}
                    </p>
                    <p className="text-theme-700 text-[9px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-center leading-loose">
                      {guestName ? (
                        <>
                          {t.requestHonourOfPresenceOf}
                          <span className="block font-serif uppercase text-[28px] md:text-5xl text-theme-800 tracking-[0.1em] my-4 font-normal">
                            {guestName}
                          </span>
                          {t.toCelebrate}
                        </>
                      ) : (
                        <>{t.requestHonourOfYourPresence}<br className="hidden md:block" /> {t.toCelebrate}</>
                      )}
                    </p>
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-8 md:my-14 z-10 px-2 lg:px-8">

                  {/* Groom's Card */}
                  <motion.div
                    initial={scrollInit({ opacity: 0, x: -30, y: 20 })}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={safeViewport}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-3 py-4 md:py-8">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">{t.belovedSonOf}</p>
                        <p className="text-xs md:text-sm font-serif uppercase text-stone-600 tracking-wide leading-relaxed">{t.groomParents}</p>
                      </div>
                      <h3 className="font-serif uppercase font-normal text-[36px] md:text-[52px] tracking-[0.12em] text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6">{t.groom}</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={scrollInit({ scale: 0, rotate: -45 })}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={safeViewport}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-500 to-theme-700 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/20 border-4 border-[#ffffff]"
                    >
                      <span className="text-3xl md:text-5xl font-serif italic text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Bride's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={scrollInit({ opacity: 0, x: 30, y: 20 })}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={safeViewport}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-3 py-4 md:py-8">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">{t.belovedDaughterOf}</p>
                        <p className="text-xs md:text-sm font-serif uppercase text-stone-600 tracking-wide leading-relaxed">{t.brideParents}</p>
                      </div>
                      <h3 className="font-serif uppercase font-normal text-[36px] md:text-[52px] tracking-[0.12em] text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6">{t.bride}</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={scrollInit({ opacity: 0, y: 30 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={safeViewport}
                  className="flex flex-col items-center space-y-8 mt-2 md:mt-10 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">{t.theDate}</p>
                      <p className="font-serif text-xl md:text-3xl text-navy-800 tracking-widest font-bold whitespace-nowrap">{t.dateLine}</p>
                      <p className="font-serif text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">{t.year}</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">{t.theTime}</p>
                      <p className="font-serif text-xl md:text-3xl text-navy-800 tracking-widest font-bold whitespace-nowrap">{t.timeLine}</p>
                      <p className="font-serif text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">{t.ceremonyPlace}</p>
                    </div>
                  </div>

                  <div className="pt-8 w-full px-4">
                    <div className="relative inline-flex items-center justify-center w-full max-w-md mx-auto group">
                      <div className="absolute inset-0 bg-theme-100 blur-lg opacity-40 group-hover:opacity-60 transition-opacity decorative-blur hidden md:block" />
                      <p className="relative text-theme-800 bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] text-[9px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase px-6 lg:px-10 py-4 lg:py-5 rounded-full border border-theme-200 flex items-center justify-center gap-4 w-full md:w-auto">
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                        <span className="whitespace-nowrap">{t.reception}</span>
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section
              className="cv-auto py-14 md:py-24 bg-[#fbf8f9] bg-cover bg-center relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden"
              style={{ backgroundImage: 'url("/Vintage Floral Countdown Frame.png")' }}
            >
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none decorative-blur hidden md:block" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={scrollInit({ opacity: 0, y: 20 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={safeViewport}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif uppercase tracking-[0.15em] text-[16vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    {t.forever}
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <h2 className="font-serif uppercase font-normal text-[36px] md:text-[52px] leading-[1.15] tracking-[0.12em] text-theme-900 mb-8 relative z-10 px-4">
                    {t.waitForThe} <span className="italic text-theme-700">{t.magic}</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/95 md:bg-white/80 md:backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    {t.countingDown}
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="cv-auto pt-24 pb-14 md:py-24 bg-[#ffffff] relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none decorative-blur hidden md:block" />
              <InviteImage
                src="/mi.png"
                alt=""
                aria-hidden="true"
                className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-32 md:w-44 h-auto object-contain pointer-events-none z-0"
                loading="eager"
              />
              <InviteImage
                src="/mi.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 w-32 md:w-44 h-auto object-contain pointer-events-none z-0"
                loading="lazy"
              />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={scrollInit({ opacity: 0, x: -30 })}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={safeViewport}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-theme-400" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">{t.theVenue}</span>
                      </div>
                      <h2 className="font-serif uppercase font-normal text-[36px] md:text-[52px] leading-[1.15] tracking-[0.12em] text-theme-900">
                        {t.venueName}
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-serif uppercase font-medium leading-relaxed tracking-wide">
                          {t.venueAddress[0]}<br /> {t.venueAddress[1]}
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 uppercase text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                        {t.venueDescription}
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/6KWT5zCJq4DXnB9X8?g_st=ic', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-navy-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-navy-900 hover:shadow-xl hover:shadow-navy-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        {t.getDirections}
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={scrollInit({ opacity: 0, scale: 0.95 })}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={safeViewport}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full md:scale-[1.2] md:group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <LazyMapEmbed className="absolute inset-0 w-full h-full" />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/95 md:bg-white/90 md:backdrop-blur-md px-5 py-2 rounded-full shadow-sm inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        {t.viewOnMap}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="cv-auto py-14 md:py-24 bg-[#3e101c] text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-800 blur-[150px] rounded-full opacity-30 pointer-events-none decorative-blur hidden md:block" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-900 blur-[150px] rounded-full opacity-40 pointer-events-none decorative-blur hidden md:block" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={scrollInit({ opacity: 0, y: 30 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={safeViewport}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-theme-300 font-bold mb-6">{t.willYouJoinUs}</p>
                  <h2 className="font-serif uppercase font-normal text-[36px] md:text-[52px] leading-[1.15] tracking-[0.12em] text-white mb-6">{t.rsvpTitle}</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-stone-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10 tracking-wide font-light">
                    {t.rsvpIntro}
                    <span className="block mt-6 font-serif text-theme-200 text-xs md:text-sm tracking-[0.2em] uppercase font-bold">{t.rsvpBy}</span>
                  </p>

                  <div className="mb-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-theme-200 font-bold">{t.rsvpContactTitle}</p>
                    <div className="flex flex-col items-center justify-center gap-2 text-sm md:flex-row md:gap-6">
                      <a className="font-serif text-white transition-colors hover:text-theme-200" href="tel:+94741422733">
                        {t.rsvpContactBrandon} - +94 741422733
                      </a>
                      <a className="font-serif text-white transition-colors hover:text-theme-200" href="tel:+94771178060">
                        {t.rsvpContactChristina} - +94 771178060
                      </a>
                    </div>
                  </div>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/10 md:bg-white/5 md:backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    {rsvpStatus === "success" ? (
                      <div className="text-center space-y-4 py-8 animate-in fade-in zoom-in duration-500">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="font-serif uppercase text-[28px] tracking-[0.12em] text-white">{t.thankYou}</h3>
                        <p className="text-stone-300 font-light">{t.rsvpReceived}</p>
                      </div>
                    ) : (
                    <form className="space-y-8 text-left" onSubmit={handleRsvpSubmit}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.fullName}</label>
                        <input
                          type="text"
                          value={rsvpData["Full Name"]}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, "Full Name": e.target.value }))}
                          placeholder={t.fullNamePlaceholder}
                          required
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-serif text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.attendanceQuestion}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {attendanceOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              aria-pressed={rsvpData["Attendance"] === option}
                              onClick={() => setRsvpData(prev => ({ ...prev, "Attendance": option }))}
                              className={`rounded-full border px-4 py-3 font-serif text-sm md:text-base tracking-wide transition-colors ${rsvpData["Attendance"] === option ? "bg-theme-200 text-stone-900 border-theme-200" : "bg-transparent text-white border-white/20 hover:border-theme-300"}`}
                            >
                              {t.attendance[option]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {isAttending && (
                        <>
                          <div className="space-y-3">
                            <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.guestsQuestion}</label>
                            <div className="relative">
                              <select
                                value={rsvpData["Guests"]}
                                onChange={(e) => setRsvpData(prev => ({ ...prev, "Guests": e.target.value }))}
                                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors font-serif text-lg md:text-xl tracking-wide appearance-none cursor-pointer"
                              >
                                {guestOptions.map((option) => (
                                  <option key={option} value={option} className="bg-[#3e101c] text-white">{t.guests[option]}</option>
                                ))}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                              </div>
                            </div>
                            <p className="text-white/50 text-xs font-light tracking-wide ml-2">{t.guestsHint}</p>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.guestNames}</label>
                            <textarea
                              rows={3}
                              value={rsvpData["Guest Names"]}
                              onChange={(e) => setRsvpData(prev => ({ ...prev, "Guest Names": e.target.value }))}
                              placeholder={t.guestNamesPlaceholder}
                              required
                              className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-serif text-lg md:text-xl tracking-wide resize-none"
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.specialMessage}</label>
                        <textarea
                          rows={3}
                          value={rsvpData["Message"]}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, "Message": e.target.value }))}
                          placeholder={t.messagePlaceholder}
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-serif text-lg md:text-xl tracking-wide resize-none"
                        />
                      </div>


                      <div className="pt-10">
                        {rsvpStatus === "error" && (
                          <p className="text-red-400 text-xs text-center mb-4">{t.errorMessage}</p>
                        )}
                        <button
                          type="submit"
                          disabled={rsvpStatus === "submitting"}
                          className="w-full bg-theme-200 text-stone-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 group inline-flex justify-center items-center gap-4 disabled:opacity-70"
                        >
                          <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                          {rsvpStatus === "submitting" ? t.sending : t.sendRsvp}
                          <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                        </button>
                      </div>
                    </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Questions & Answers Section */}
            <section className="cv-auto py-14 md:py-24 bg-[#ffffff] relative overflow-hidden flex flex-col items-center">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="container mx-auto px-4 max-w-5xl relative z-10 w-full">
                <motion.div
                  initial={scrollInit({ opacity: 0, y: 20 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={safeViewport}
                  className="flex flex-col items-center text-center mb-8 md:mb-14"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-px bg-theme-400" />
                    <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">{t.goodToKnow}</span>
                    <div className="w-8 h-px bg-theme-400" />
                  </div>
                  <h2 className="font-serif uppercase font-normal text-[36px] md:text-[52px] leading-[1.15] tracking-[0.12em] text-theme-900">
                    {t.faqTitle}
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {t.faq.map((item, i) => (
                    <motion.div
                      key={item.question}
                      initial={scrollInit({ opacity: 0, y: 20 })}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={safeViewport}
                      transition={preferLiteExperience ? { duration: 0.25 } : { delay: i * 0.1 }}
                      className="relative bg-white p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-theme-100/50 rounded-tr-[3rem] rounded-bl-[3rem] text-left"
                    >
                      <div className="absolute inset-2 border-[0.5px] border-theme-200/50 rounded-tr-[2.6rem] rounded-bl-[2.6rem] pointer-events-none" />
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                          <h3 className="font-serif uppercase text-base md:text-lg text-navy-800 font-bold tracking-wide leading-snug">{item.question}</h3>
                        </div>
                        <p className="font-serif text-stone-600 text-base md:text-lg font-normal leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Closing and Footer Wrapper */}
            <div className="relative bg-[#ffffff]">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-14 md:py-24 relative flex flex-col items-center overflow-hidden">
                <InviteImage src="/images/left - Copy.png" alt="" className="absolute -right-2 top-2 w-[160px] md:w-[220px] h-auto opacity-100 object-contain pointer-events-none z-20" loading="eager" />
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={scrollInit({ opacity: 0, scale: 0.95 })}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={safeViewport}
                    className="flex flex-col items-center"
                  >
                    <div className="mt-4 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif uppercase tracking-[0.1em] text-[18vw] md:text-[180px] text-theme-100/40 whitespace-nowrap pointer-events-none z-0 select-none">
                        {t.thankYouWatermark}
                      </div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-[#ffffff] px-6 py-2 rounded-full border border-theme-100/50 shadow-sm">{t.withLove}</p>
                      <h3 className="font-serif uppercase font-normal text-[36px] md:text-[52px] leading-[1.15] tracking-[0.12em] text-theme-900 relative z-10 px-4 pt-4">{t.couple}</h3>

                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-12 border-t border-theme-200/30 text-center relative z-10 space-y-4 px-4">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                  © 2026 Brandon & Christina. <span className="hidden md:inline">|</span><br className="md:hidden block mt-2" /> {t.allRightsReserved}
                </p>
                <p className="text-stone-500 text-[9px] md:text-[10px] mt-2 font-sans tracking-widest uppercase">
                  {t.wantWebsite} <br className="md:hidden block mt-1" /> {t.createYoursWith} <a target="_blank" rel="noreferrer" className="text-theme-600 hover:text-theme-800 underline font-bold transition-colors" href="https://wa.me/94707819074">invitemint</a>
                </p>
              </footer>
            </div>
          </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
          background: #c27486;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
