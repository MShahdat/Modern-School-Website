


const ExamSystem = () => {

    const examSystems = []
    return (
        <div className='bg-white/95 dark:bg-black/80'>
            <div className='max-w-7xl px-4 py-8 xl:px-20 mx-auto'>
                <h2 className='text-3xl dark:text-white/90 md:text-4xl font-bold text-center mb-4 text-blue-900'>
                    Exam Systems
                </h2>

                <hr className='border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-0' />

                <div className='px-4 py-8'>
                    {examSystems.map((it, idx) => (
                        <div key={it?.id ?? idx} className="mb-8">

                            <div
                                className="text-xl dark:text-white/90 md:text-2xl font-semibold mb-3 text-blue-950"
                            >
                                title
                            </div>

                            <div
                                className="richtext text-[16px] md:text-[17px] dark:text-white/90 tracking-wider leading-relaxed text-gray-600"
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

export default ExamSystem;
