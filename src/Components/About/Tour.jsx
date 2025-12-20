import React from 'react';

const Tour = () => {
    return (
        <div className='bg-white/95 dark:bg-black/80 '>
            <div className='max-w-6xl px-4 py-8 mx-auto'>
                <h2 className='text-3xl md:text-4xl dark:text-white/90 font-bold text-center text-blue-900 mb-4'>Campus Tour</h2>
                <hr className='border-t border-2 border-black/30 dark:border-white/20 mt-2 mb-0' />
                <div className='px-4 py-8 text-[16px] md:text-[17px] text-justify text-gray-600 dark:text-white/90 tracking-wider leading-relaxed'>
                    <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta corporis voluptatum sint a quas earum consequatur aliquid commodi, quos vitae ut ducimus enim! Distinctio cumque sit odio, ab soluta reprehenderit minus rerum cupiditate harum minima, rem quasi itaque magni dicta facere voluptates cum in quisquam voluptatum aut repellat quia, facilis architecto? Enim impedit recusandae sunt laudantium repudiandae tenetur? Suscipit, fuga?</p>
                    <p className=' mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt facilis, excepturi quisquam fugiat dolorum at modi placeat cumque fugit architecto temporibus tempore, aliquam deleniti harum quos! Eos quibusdam vero magni dolor distinctio sequi. Beatae ab, est sint architecto delectus fugit et, quos fugiat consequatur doloremque aut tenetur amet! Accusantium, quasi.</p>
                </div>
                {/* Map Section (unchanged) */}
                <div className="mt-12">
                    <h2 className='text-2xl md:text-4xl font-bold text-center text-blue-900 mb-4 dark:text-white/90'>Campus Map</h2>
                      <hr className='border-t border-2 border-black/30 dark:border-white/20 mt-2 mb-0' />

                    <div className="mt-8 w-full h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.47157427512!2d90.44491137511362!3d23.70346607870241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9d77be74dc3%3A0x646d24d57449ff39!2sDania%20College!5e1!3m2!1sen!2sbd!4v1762196364893!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tour;