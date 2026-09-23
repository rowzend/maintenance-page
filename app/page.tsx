"use client";

import { useCallback, useEffect, useState } from "react";
import MatrixRain from "./matrix-rain";

const title =
  process.env.NEXT_PUBLIC_MAINTENANCE_TITLE || "Sedang Dalam Perbaikan";
const subtitle =
  process.env.NEXT_PUBLIC_MAINTENANCE_SUBTITLE ||
  "Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan";
const whatHappening =
  process.env.NEXT_PUBLIC_MAINTENANCE_WHAT ||
  "Sistem sedang dalam proses pembaruan untuk meningkatkan performa dan keamanan.";
const whenFinish =
  process.env.NEXT_PUBLIC_MAINTENANCE_WHEN ||
  "Kami akan kembali online secepatnya.";
const estimatedTime = process.env.NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME;
const contact = process.env.NEXT_PUBLIC_MAINTENANCE_CONTACT;
const endTime = process.env.NEXT_PUBLIC_MAINTENANCE_END_TIME;

function formatTimeLeft(targetDate: string) {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const diff = target - now;
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: false,
  };
}

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<
    typeof formatTimeLeft
  > | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    if (!endTime) return;
    setTimeLeft(formatTimeLeft(endTime));
    const interval = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const estimatedFromEndTime =
    timeLeft && !timeLeft.expired
      ? `Estimasi selesai: ${timeLeft.hours > 0 ? `${timeLeft.hours} jam ` : ""}${timeLeft.minutes} menit lagi`
      : estimatedTime;

  const handleEmailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!emailInput.trim()) return;
      setEmailStatus("success");
      setEmailInput("");
      setTimeout(() => setEmailStatus("idle"), 3000);
    },
    [emailInput],
  );

  const progressPercent =
    timeLeft && !timeLeft.expired
      ? Math.max(
          0,
          Math.min(
            100,
            ((timeLeft.days * 86400 +
              timeLeft.hours * 3600 +
              timeLeft.minutes * 60 +
              timeLeft.seconds) /
              7200) *
              100,
          ),
        )
      : 100;

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      <MatrixRain />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-3 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto text-center space-y-5 sm:space-y-6 lg:space-y-7 animate-fadeIn">
          <div className="flex justify-center animate-slideDown">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-300 opacity-5 blur-lg" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-white/20 dark:border-white/10 relative">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
              </div>
              <div className="absolute -inset-1 rounded-2xl border-2 border-blue-400/30 dark:border-blue-500/20 animate-pulse-ring" />
              <div className="absolute -inset-[6px] rounded-2xl border border-blue-400/10 dark:border-blue-500/5" />
            </div>
          </div>

          <div
            className="space-y-2 animate-slideUp"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-md bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold">
              <svg
                aria-hidden="true"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Sedang Maintenance
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed px-2">
              {subtitle}
            </p>
          </div>

          <div
            className="glass-card gradient-border rounded-2xl p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6 animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[var(--text-primary)] mb-0.5 text-sm sm:text-base">
                  Apa yang sedang terjadi?
                </h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">
                  {whatHappening}
                </p>
              </div>
            </div>

            <div className="section-divider" />

            <div className="flex items-start space-x-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[var(--text-primary)] mb-0.5 text-sm sm:text-base">
                  Kapan akan selesai?
                </h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">
                  {whenFinish}
                </p>
                {estimatedFromEndTime && (
                  <p className="text-xs sm:text-sm text-blue-400 dark:text-blue-300 mt-1 font-semibold">
                    {estimatedFromEndTime}
                  </p>
                )}
              </div>
            </div>

            {endTime && timeLeft && (
              <div
                className="pt-2 animate-slideUp"
                style={{ animationDelay: "0.35s" }}
              >
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[var(--text-secondary)]">Progress</span>
                  <span className="font-mono text-blue-400 text-xs">
                    {timeLeft.expired
                      ? "Selesai"
                      : `${progressPercent.toFixed(1)}%`}
                  </span>
                </div>
                <div className="w-full h-2 backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-center gap-2 sm:gap-3 mt-3">
                  {timeLeft.days > 0 && (
                    <div className="text-center flex-1">
                      <div className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] stat-glow">
                        {timeLeft.days}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        Hari
                      </div>
                    </div>
                  )}
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 stat-glow">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Jam
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-blue-300 stat-glow">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Menit
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-sky-400 stat-glow">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Detik
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="space-y-3 animate-slideUp"
            style={{ animationDelay: "0.35s" }}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="gradient-btn w-full text-white font-semibold py-3 px-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Halaman
            </button>

            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan email Anda"
                className="flex-1 px-3 py-2.5 backdrop-blur-md bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl text-[var(--text-primary)] dark:text-white placeholder:text-[var(--text-secondary)] text-xs sm:text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
              <button
                type="submit"
                disabled={!emailInput.trim()}
                className="px-3 py-2.5 backdrop-blur-md bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-blue-500 hover:text-white hover:border-blue-400 text-[var(--text-primary)] dark:text-white text-xs sm:text-sm font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Notifikasi
              </button>
            </form>

            {emailStatus === "success" && (
              <p className="text-emerald-400 text-xs sm:text-sm animate-fadeIn">
                ✓ Notifikasi berhasil! Kami akan mengirim email saat sudah
                online.
              </p>
            )}

            {contact && (
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] px-2">
                {contact}
              </p>
            )}
          </div>

          <div className="animate-slideUp" style={{ animationDelay: "0.45s" }}>
            <div className="section-divider mb-3" />
            <p className="text-center text-[10px] sm:text-xs text-[var(--text-secondary)]">
              <a
                href="https://it.bkpsdm.pesisirselatankab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
              >
                IT BKPSDM Kabupaten Pesisir Selatan
              </a>
            </p>
            <p className="text-center text-[10px] sm:text-xs text-[var(--text-secondary)] mt-1">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
