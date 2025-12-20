
import React, { useState, useEffect } from 'react';
import { Api_Base_Url } from '../../Config/Api';

/* per-tab session cache */
let cachedSchoolData = null;
let schoolDataPromise = null;

const ExamSystem = () => {
    const [schoolData, setSchoolData] = useState(cachedSchoolData);
    const [loading, setLoading] = useState(!cachedSchoolData);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cachedSchoolData) return;

        if (!schoolDataPromise) {
            schoolDataPromise = fetch(`${Api_Base_Url}/`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch school data');
                    return res.json();
                })
                .then((data) => {
                    cachedSchoolData = data;
                    console.log(cachedSchoolData);

                    return data;
                })
                .catch((err) => { throw err; })
                .finally(() => { schoolDataPromise = null; });
        }

        setLoading(true);
        setError(null);

        schoolDataPromise
            .then((data) => setSchoolData(data))
            .catch((err) => setError(err.message || 'Failed to load school data.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className='px-4 py-8 xl:px-60 mx-auto'>
                <div className="flex justify-center">
                    <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
                </div>
                <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

                <div className='px-8 py-12'>
                    <div className='mb-8'>
                        <div className='h-6 w-28 bg-gray-200 rounded mb-3 animate-pulse' />
                        <div className='space-y-3'>
                            <div className='h-5 w-11/12 bg-gray-200 rounded animate-pulse' />
                            <div className='h-5 w-10/12 bg-gray-200 rounded animate-pulse' />
                            <div className='h-5 w-9/12 bg-gray-200 rounded animate-pulse' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className='bg-white/95 dark:bg-black/80'>
            <div className='max-w-7xl px-4 py-8 xl:px-20 mx-auto'>
            {/* heading unchanged */}
            <h2 className='text-2xl dark:text-white/90 md:text-4xl font-bold text-center mb-4 text-blue-900'>
                Exam Systems
            </h2>

            <hr className='border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-0' />

            <div className='px-4 py-8'>
                {/* ⬇️ CHANGED: render ALL entries */}
                {schoolData?.exam_systems.map((it, idx) => (
                    <div key={it?.id ?? idx} className="mb-8">
                        {/* optional sub-title if your API provides it */}
                        {it?.title ? (
                            <div
                                className="text-xl dark:text-white/90 md:text-2xl font-semibold mb-3 text-blue-950"
                                dangerouslySetInnerHTML={{ __html: String(it.title) }}
                            />
                        ) : null}

                        {it?.description ? (
                            <div
                                className="richtext text-[16px] md:text-[17px] dark:text-white/90 tracking-wider leading-relaxed text-gray-600"
                                dangerouslySetInnerHTML={{ __html: String(it.description) }}
                            />
                        ) : null}

                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default ExamSystem;
