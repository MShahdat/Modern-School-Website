

const teacherDetailsSkeliton = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex justify-center">
        <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
      </div>
      <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left profile skeleton */}
          <div className="flex flex-col items-center mt-8 md:w-1/3">
            <div className="w-48 h-56 bg-gray-200 rounded-md border animate-pulse" />
            <div className="h-6 w-40 bg-gray-200 rounded mt-4 animate-pulse" />
            <div className="h-5 w-28 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>
          {/* Right table skeleton */}
          <div className="md:w-2/3 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 items-center mb-4">
                <div className="h-4 bg-gray-200 rounded col-span-1 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded col-span-2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        {/* Back button skeleton */}
        <div className="mt-8 text-center">
          <div className="px-36 py-3 bg-gray-200 rounded inline-block animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default teacherDetailsSkeliton;