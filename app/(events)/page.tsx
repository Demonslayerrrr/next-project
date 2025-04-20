"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            🎮 Odkryj Niesamowite Wydarzenia Gamedev!
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Dołącz do największych spotkań twórców gier! Od inspirujących konferencji po warsztaty prowadzone przez ekspertów branży – tutaj znajdziesz wszystko, czego potrzebujesz, aby rozwijać swoje umiejętności i nawiązać cenne kontakty.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            🔎 Zobacz wydarzenia
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-200">
            <h3 className="text-xl font-bold text-white mb-3">🔹 Konferencje Gamedev</h3>
            <p className="text-blue-200">Poznaj najnowsze trendy w branży i dowiedz się, jak tworzyć gry, które zachwycą graczy na całym świecie.</p>
          </div>
          <div className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-200">
            <h3 className="text-xl font-bold text-white mb-3">🔹 Game Jamy i Konkursy</h3>
            <p className="text-blue-200">Pokaż swoje umiejętności, twórz gry w ograniczonym czasie i rywalizuj z najlepszymi!</p>
          </div>
          <div className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-200">
            <h3 className="text-xl font-bold text-white mb-3">🔹 Warsztaty z Ekspertami</h3>
            <p className="text-blue-200">Ucz się od profesjonalistów z wieloletnim doświadczeniem i odkryj tajniki projektowania, programowania i marketingu gier.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
