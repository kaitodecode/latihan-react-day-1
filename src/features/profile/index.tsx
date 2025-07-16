export const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-indigo-900 tracking-tight">
                        Biodata
                    </h2>
                    <p className="mt-3 text-xl text-indigo-600 font-medium">
                        Personal Information Card
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-10">
                        <div className="space-y-8">
                            <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
                                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center shadow-inner">
                                    <svg className="h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Kurniawan</h3>
                                    <p className="text-lg text-indigo-600 font-medium">Software Developer</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Full Name</p>
                                    <p className="mt-2 text-lg font-medium text-gray-900">Adi Kurniawan</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Date of Birth</p>
                                    <p className="mt-2 text-lg font-medium text-gray-900">May 19, 2006</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Place of Birth</p>
                                    <p className="mt-2 text-lg font-medium text-gray-900">Nganjuk</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Address</p>
                                    <p className="mt-2 text-lg font-medium text-gray-900">RT 11/RW 02 DS.DIMONG, KEC.MADIUN, KAB.MADIUN</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Education</p>
                                    <p className="mt-2 text-lg font-medium text-gray-900">SMKN 1 Mejayan</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Email</p>
                                    <p className="mt-2 text-lg font-medium text-gray-900">kaitodecode@email.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
