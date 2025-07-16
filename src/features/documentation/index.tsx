import gambar1 from "./documentation.jpg"
import gambar2 from "./doc-2.jpg"
import gambar3 from "./doc-3.jpg"
export const DocumentationPage = () => {
    const learningMoments = [
        {
            date: "2024-03-15",
            title: "Day 1: Belajar Fundamental React JS",
            description: "Sesi pembelajaran dasar-dasar React JS bersama mentor. Membahas konsep penting seperti component lifecycle, hooks, dan state management untuk membangun aplikasi React yang solid.",
            image: gambar1,
            keyLearnings: [
                "Memahami React Component Lifecycle",
                "Implementasi React Hooks", 
                "Penerapan State Management"
            ]
        },
        {
            date: "2024-03-16",
            title: "Day 2: Persiapan Menuju Jakarta",
            description: "Sesi zoom terakhir sebelum keberangkatan ke Jakarta. Membahas persiapan teknis, review materi sebelumnya, dan diskusi tentang ekspektasi pembelajaran di Jakarta.",
            image: gambar2,
            keyLearnings: [
                "Express.js Server Setup and Routing",
                "EJS Template Engine Integration",
                "Building Dynamic Web Apps with Express & EJS"
            ]
        },
        {
            date: "2024-03-17",
            title: "Day 3: Clean Architecture",
            description: "Pendalaman tentang clean architecture dalam pengembangan aplikasi React. Fokus pada pemisahan concerns, maintainability, dan best practices dalam struktur project.",
            image: gambar3,
            keyLearnings: [
                "Prinsip Clean Architecture",
                "Domain-Driven Design dalam React",
                "Implementasi Layer Separation"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-900 tracking-tight">
                        Zoom Class Learning Journey
                    </h1>
                    <p className="mt-3 text-xl text-indigo-600 font-medium">
                        Documentation of Learning Progress
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {learningMoments.map((moment, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                            <div className="relative">
                                <img 
                                    src={moment.image} 
                                    alt={moment.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-2 rounded-bl-lg">
                                    {moment.date}
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors">
                                    {moment.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {moment.description}
                                </p>
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-indigo-900">Session Highlights:</h3>
                                    <ul className="space-y-2">
                                        {moment.keyLearnings.map((learning, idx) => (
                                            <li key={idx} className="flex items-center text-gray-700">
                                                <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {learning}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
