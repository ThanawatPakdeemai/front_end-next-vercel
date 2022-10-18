import type { ReactNode } from 'react';
/*
 * Import Footer from '@components/organisms/footer';
 * import Header from '@components/organisms/header';
 * import Sidebar from '@components/organisms/sidebar';
 * import { Box } from '@mui/material';
 */

interface IProp {
  children: ReactNode;
  className?: string;
}

const SidebarTemplate = ({ children, className }: IProp) => {
  return (
    <article id='sidebar-template' className={className}>
      {children}
      {/* <Cookies /> */}
      {/* <Header />
      <Box className={'my-6 gap-8 lg:container lg:flex'}>
        <Sidebar />
        <main id='main'>
          <div id='main-content' className='flex flex-col lg:min-h-[900px]'>
            {children}
          </div>
          <Footer />
        </main>
      </Box> */}
    </article>
  );
};

export default SidebarTemplate;
