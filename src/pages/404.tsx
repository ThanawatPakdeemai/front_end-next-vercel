import React from 'react';

import Meta from '@/meta/index';

const CustomPage404 = () => {
  return (
    <div
      className={
        'relative flex h-screen w-screen flex-col items-center justify-center'
      }
    >
      {/* Meta */}
      <Meta title={'404 Not Found'} />

      <main className='mx-auto grid-cols-2 items-center px-4 md:container md:grid md:px-0'>
        <>404</>
        {/* <div className='xs:p-0 flex flex-col items-center sm:pl-36 md:items-start'>
          <div className='inline-block'>
            <Logo
              src='/assets/images/logo_404.svg'
              width={170}
              height={45}
              href={'/'}
            />
          </div>
          <div className='mt-6 mb-4'>
            <Typography variant='h1' className='font-extrabold '>
              404
            </Typography>
          </div>
          <Typography variant='h4' className='text-white'>
            {t('404_whoa')}
          </Typography>
          <Typography variant='body2' className='mt-4'>
            {t('404_lost')}
          </Typography>
          <Link href='/'>
            <a className='mt-4'>
              <Button type='button' text={t('back_to_home')} />
            </a>
          </Link>
        </div>
        <div className='mx-auto mt-10 max-w-md md:mx-0 md:max-w-none'>
          <Image
            src='/assets/images/not_found.png'
            alt='404 Not Found'
            width={'600px'}
            height={'450px'}
            layout='fixed'
            lazyRoot={lazyRoot}
            loading='lazy'
          />
        </div> */}
      </main>
    </div>
  );
};

export default CustomPage404;
