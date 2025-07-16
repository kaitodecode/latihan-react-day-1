export const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl  font-bold text-indigo-900 tracking-tight">
                        Get in Touch
                    </h2>
                    <p className="mt-3 text-xl text-indigo-600 font-medium">
                        Have questions? We're here to help you.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-10">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-600 uppercase">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="John Doe"
                                        className="mt-2 block w-full px-4 py-3 rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                    />
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-600 uppercase">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="you@example.com"
                                        className="mt-2 block w-full px-4 py-3 rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"> 
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-600 uppercase">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={6}
                                    placeholder="Tell us how we can help you..."
                                    className="mt-2 block w-full px-4 py-3 rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                />
                            </div>
                            
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}