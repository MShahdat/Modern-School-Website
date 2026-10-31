import { useGetPrincipal } from "../../hook";


const Principal = () => {

  const { data, isPending } = useGetPrincipal()

  if (isPending) {
    return <p>loading..</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }


  const principal = data?.data ?? undefined

  return (
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 xl:px-20 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white/90 text-blue-900 mb-4">
          Message from Principal
        </h2>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />
        <div className="px-4 py-8">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-80 h-90 object-fill rounded-xl shadow-sm"
              src={principal?.user?.profileImage}
              alt={principal?.name}
            />
            <h2 className="text-xl md:text-2xl font-bold dark:text-white/90 text-blue-950 mt-2 uppercase">{principal?.name}</h2>
          </div>

          {/* Keep exact layout: one <p>, now HTML-enabled */}
          <p
            className="text-[16px] md:text-[17px] leading-relaxed tracking-wider mt-8 text-justify dark:text-white/90 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: String(principal?.message ?? '').replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Principal;
