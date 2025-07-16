import React, { useState } from "react";

export const HomePage = () => {
    const [counter, setCounter] = useState(0);
    const [theme, setTheme] = useState('light');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const themeStyles = {
        light: {
            background: "bg-gradient-to-b from-blue-100 to-white",
            card: "bg-white",
            text: "text-blue-800",
            subtext: "text-gray-700",
            button: "bg-blue-500 text-white",
            input: "border bg-white text-gray-700"
        },
        dark: {
            background: "bg-gradient-to-b from-gray-900 to-gray-800",
            card: "bg-gray-800",
            text: "text-white",
            subtext: "text-gray-300",
            button: "bg-blue-600 text-white",
            input: "border border-gray-600 bg-gray-700 text-white"
        }
    };


    const currentTheme = themeStyles[theme as keyof typeof themeStyles];

    return (
        <div className={`min-h-screen ${currentTheme.background}`}>
            <div className="container mx-auto px-4 py-12">
                <h1 className={`text-5xl font-bold ${currentTheme.text} mb-8 text-center`}>
                    Selamat Datang di Pelatihan React JS
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className={`${currentTheme.card} p-8 rounded-xl shadow-lg`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${currentTheme.text}`}>Counter Example</h2>
                        <p className={currentTheme.subtext}>Count: {counter}</p>
                        <button
                            onClick={() => setCounter(prev => prev + 1)}
                            className={`${currentTheme.button} px-4 py-2 rounded`}
                        >
                            Increment
                        </button>
                    </div>

                    <div className={`${currentTheme.card} p-8 rounded-xl shadow-lg`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${currentTheme.text}`}>Theme Switcher</h2>
                        <p className={currentTheme.subtext}>Current theme: {theme}</p>
                        <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className={`${currentTheme.button} px-4 py-2 rounded`}
                        >
                            Toggle Theme
                        </button>
                    </div>

                    <div className={`${currentTheme.card} p-8 rounded-xl shadow-lg`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${currentTheme.text}`}>User Input</h2>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your name"
                            className={`${currentTheme.input} p-2 rounded mb-4 w-full`}
                        />
                        <p className={currentTheme.subtext}>Hello, {userName || 'Guest'}!</p>
                    </div>

                    <div className={`${currentTheme.card} p-8 rounded-xl shadow-lg`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${currentTheme.text}`}>Loading State</h2>
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                setTimeout(() => setIsLoading(false), 2000);
                            }}
                            className={`${currentTheme.button} px-4 py-2 rounded`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Click Me'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}