import { useGetSiteConfig } from "../../hook";

const About = () => {

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
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className='max-w-7xl px-4 py-8 xl:px-20 mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center dark:text-white/90 text-blue-950 mb-4'>About Us</h2>
        <hr className='border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-0' />
        <div className='px-4 py-8'>
          <p
            className='text-[16px] md:text-[17px] dark:text-white/90 leading-relaxed tracking-wider text-justify text-gray-600'
            dangerouslySetInnerHTML={{
              __html: String(schoolData?.about_text ?? 'data not found').replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
