

const Rules = () => {


  const academicRules = []

  return (
    <div className='bg-white/95 dark:bg-black/80'>
      <div className='px-4 py-8 mx-auto max-w-6xl'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900 dark:text-white/90'>
          Academic Rules & Regulations
        </h2>

        <hr className='border-t border-2 border-black/25 dark:border-white/20 mt-2 mb-0' />

        <div className='px-4 py-8'>
          {academicRules.map((it, idx) => (
            <div key={it?.id ?? idx} className="mb-8">

              <div
                className="text-2xl font-semibold dark:text-white/90 mb-3 text-blue-950"
              >
                title
              </div>

              <div
                className="richtext text-[16px] md:text-[17px] text-gray-600 dark:text-white/80"

              >
                description
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;
