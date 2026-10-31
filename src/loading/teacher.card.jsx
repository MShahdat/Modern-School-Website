
const TeacherCard = () => {
  return (
    <div className="bg-blue-50 px-4 py-8 xl:px-35 mx-auto">
      <div className="flex justify-center">
        <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
      </div>
      <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-6 mb-8">
        {
          Array.from({ length: 6 }, (_, i) => {
            <div
              key={i}
              className="bg-white rounded-2xl shadow-2xl pl-3 pr-1 py-4"
            >
              <div className="flex gap-4">
                <div className="h-36 w-40 md:h-30 md:w-30 rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex-1 mt-0 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default TeacherCard;