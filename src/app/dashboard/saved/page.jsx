export default function SavedPage() {
    const saved = [];

    return (
        <>
            <h1 className="text-xl font-bold mb-6">Saved Scholarships</h1>

            {saved.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-gray-500">No saved scholarships</p>
                    <button className="mt-4 bg-gold text-white px-4 py-2 rounded-lg">
                        Browse Scholarships
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* cards here */}
                </div>
            )}
        </>
    );
}