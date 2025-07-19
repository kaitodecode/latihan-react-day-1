import { DataTrainer } from "./controller"

export const TrainerPage = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-indigo-900 tracking-tight">
                        Trainer List
                    </h2>
                    <p className="mt-3 text-xl text-indigo-600 font-medium">
                        List Trainer from Database
                    </p>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-10">
                        <div className="overflow-hidden">
                            <DataTrainer/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}