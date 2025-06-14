import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
    const [count, setCount] = useState(0);
    const [isDark, setIsDark] = useState(true);

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}
        >
            {/* Header */}
            <header
                className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
                <div className="w-full px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Baião de Dois
                    </h1>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`p-2 rounded-lg transition-colors ${
                            isDark
                                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                                : 'bg-white hover:bg-gray-100 text-gray-800 shadow-md'
                        }`}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-4 py-6">
                {/* Hero Section */}
                <div className="text-center py-12 max-w-6xl mx-auto">
                    <div className="flex justify-center gap-8 mb-8">
                        <div className="group">
                            <a
                                href="https://vite.dev"
                                target="_blank"
                                className="block"
                            >
                                <img
                                    src={viteLogo}
                                    className="h-20 w-20 hover:drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                                    alt="Vite logo"
                                />
                            </a>
                        </div>
                        <div className="group">
                            <a
                                href="https://react.dev"
                                target="_blank"
                                className="block"
                            >
                                <img
                                    src={reactLogo}
                                    className="h-20 w-20 animate-spin hover:drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                                    alt="React logo"
                                />
                            </a>
                        </div>
                    </div>

                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Stack Implementada!
                    </h2>

                    <p
                        className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                        Agora já podemos criar nossos componentes e páginas
                    </p>
                </div>

                {/* Interactive Counter */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div
                        className={`p-8 rounded-2xl border text-center ${
                            isDark
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-white border-gray-200 shadow-xl'
                        }`}
                    >
                        <h3 className="text-3xl font-bold mb-6">Contador</h3>
                        <div className="text-8xl font-bold mb-8 text-blue-500">
                            {count}
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => setCount(count - 1)}
                                className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Decrease
                            </button>
                            <button
                                onClick={() => setCount(0)}
                                className="px-8 py-4  text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setCount(count + 1)}
                                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Increase
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center py-12 max-w-4xl mx-auto">
                    <p
                        className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        Hora de atualizar{' '}
                        <code
                            className={`px-2 py-1 rounded font-mono text-sm ${
                                isDark
                                    ? 'bg-gray-800 text-blue-300'
                                    : 'bg-gray-100 text-blue-600'
                            }`}
                        >
                            src/App.tsx
                        </code>{' '}
                        e criar nossos componentes!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white">
                            React
                        </span>
                        <span className="px-4 py-2 text-sm rounded-full bg-green-500 text-white">
                            Vite
                        </span>
                        <span className="px-4 py-2 text-sm rounded-full bg-purple-500 text-white">
                            Tailwind v4
                        </span>
                        <span className="px-4 py-2 text-sm rounded-full bg-orange-500 text-white">
                            TypeScript
                        </span>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default App;
