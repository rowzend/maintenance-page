"use client";

export default function MaintenancePage() {
  const title = process.env.NEXT_PUBLIC_MAINTENANCE_TITLE || "Sedang Dalam Perbaikan";
  const subtitle = process.env.NEXT_PUBLIC_MAINTENANCE_SUBTITLE || "Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan";
  const whatHappening = process.env.NEXT_PUBLIC_MAINTENANCE_WHAT || "Sistem sedang dalam proses pembaruan untuk meningkatkan performa dan keamanan. Mohon bersabar menunggu hingga proses selesai.";
  const whenFinish = process.env.NEXT_PUBLIC_MAINTENANCE_WHEN || "Kami akan kembali online secepatnya. Silakan coba refresh halaman ini secara berkala.";
  const estimatedTime = process.env.NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-cyan-200/30 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float-delayed-2"></div>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 animate-fadeIn relative z-10">
        {/* Icon */}
        <div className="flex justify-center animate-slideDown">
          <div className="relative">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-4 animate-slideUp hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
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
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Apa yang sedang terjadi?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {whatHappening}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1"
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
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Kapan akan selesai?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {whenFinish}
              </p>
              {estimatedTime && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-semibold">
                  {estimatedTime}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Refresh Halaman
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Terima kasih atas kesabaran Anda
          </p>
          {process.env.NEXT_PUBLIC_MAINTENANCE_CONTACT && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {process.env.NEXT_PUBLIC_MAINTENANCE_CONTACT}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://it.bkpsdm.pesisirselatankab.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
            >
              IT BKPSDM Kabupaten Pesisir Selatan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
