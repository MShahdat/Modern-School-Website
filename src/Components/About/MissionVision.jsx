import { useGetSiteConfig } from '../../hook';

const MissionVision = () => {

  const { data, isLoading } = useGetSiteConfig()
  console.log('siteConfig response...............', data)

  if (isLoading) {
    return <p>loading..</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }

  const schoolData = data?.data


  return (
    <div className='bg-white dark:bg-black/80'>
      <div className='max-w-7xl px-4 py-8 xl:px-20 mx-auto'>
        <h2 className='text-3xl md:text-4xl dark:text-white/90 font-bold text-center mb-4 text-blue-900'>Mission Vision</h2>
        <hr className='border-t border-2 border-black/20 dark:border-white/10 mt-2 mb-0' />

        <div className='px-4 py-8'>
          <div>
            <h3 className='text-2xl font-bold text-blue-950 dark:text-white/90 mb-3 underline'>Mission</h3>
            <p
              className='text-[16px] md:text-[17px] tracking-wider leading-relaxed dark:text-white/90 text-gray-600 text-justify'
              dangerouslySetInnerHTML={{ __html: schoolData?.mission }}
            />
          </div>

          <div>
            <h3 className='text-2xl mt-4 md:mt-6 dark:text-white/90 font-bold text-blue-950 mb-3 underline'>Vision</h3>
            <p
              className='text-[16px] md:text-[17px] tracking-wider leading-relaxed dark:text-white/90 text-gray-600 text-justify'
              dangerouslySetInnerHTML={{ __html: schoolData?.vision }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
