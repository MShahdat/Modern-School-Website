import { useGetChairman } from "../../hook";


const Chairman = () => {

  const { data, isPending } = useGetChairman()

  if (isPending) {
    return <p>loading..</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }


  const chairman = data?.data ?? undefined


  return (
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 xl:px-20 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white/90 text-blue-900 mb-4">
          Message from Chairman
        </h2>
        <hr className="border-t border-2 border-black/20 dark:border-white/15  mt-2 mb-12" />
        <div className="px-4 py-8">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-80 h-90 object-fill rounded-xl shadow-sm"
              src={chairman?.user.profileImage}
              alt={chairman?.name}
            />
            <h2 className="text-xl md:text-2xl font-bold dark:text-white/90 text-blue-950 mt-2 uppercase">{chairman?.name}</h2>
          </div>

          {/* Keep exact layout: one <p>, now HTML-enabled */}
          <p
            className="text-[16px] md:text-[17px] dark:text-white/80 tracking-wider leading-relaxed mt-8 text-justify text-gray-600"
            dangerouslySetInnerHTML={{
              __html: String(chairman?.message ?? '').replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chairman;
