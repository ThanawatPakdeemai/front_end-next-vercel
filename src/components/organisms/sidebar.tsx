import React, { memo } from 'react';
import Image from 'next/image';

// Type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Sidebar: React.FC = () => {
  // Const profile = useSelector((state: RootState) => state.profile.data);

  /*
   * Const [state, setState] = React.useState({
   *   Top: false,
   *   Left: false,
   *   Bottom: false,
   *   Right: false
   * });
   */

  /*
   * Const toggleDrawer =
   *   (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
   *     if (
   *       event.type === "keydown" &&
   *       ((event as React.KeyboardEvent).key === "Tab" ||
   *         (event as React.KeyboardEvent).key === "Shift")
   *     ) {
   *       return;
   *     }
   */

  /*
   *     SetState({ ...state, [anchor]: open });
   *   };
   */

  /*
   * Const listMenu = () => {
   *   return (
   *     <>
   *       <Box
   *         className="menu-box"
   *         role="presentation"
   *         onClick={toggleDrawer("left", false)}
   *         onKeyDown={toggleDrawer("left", false)}>
   *         <MenuBox menu={MENU_GUEST} />
   *         <MenuBox menu={MENU_FINANCE} />
   *         <MenuBox menu={MENU_NAKAVERSE} />
   *       </Box>
   */

  //       {/* Profile Menu */}
  //       {profile ? <MenuLoggedIn profile={profile} /> : <MenuGuest />}

  /*
   *       <Box id="polygon-contract" className={`polygon-contract-box card-inner mt-5`}>
   *         <Typography className="flex flex-column text-[120%]">
   *           NAKA Contract : <img src="/assets/images/polygon.svg" alt="" className="pl-4" />
   *         </Typography>
   *         {siteInfo.contract && (
   *           <Box className="wallet-address flex items-center justify-center">
   *             <Typography>{textWithDots(siteInfo.contract, 8)}</Typography>
   *             <CopyToClipboard className="text-[80%]" value={siteInfo.contract} />
   *           </Box>
   *         )}
   *       </Box>
   */

  //       {/* Orion Trade Menu */}
  //       <OrionTrade />
  //     </>
  //   );
  // };
  return (
    <aside className='sidebar'>
      <Image src='/images/mocks/sidebar.png' alt='mock' layout='fill' />
      {/* <Logo />
      <div className="lg:block hidden">{listMenu()}</div>

      <Button className="toggle-menu" onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </Button>
      <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
        <div className="flex justify-center mt-4">
          <Logo />
        </div>
        {listMenu()}
      </Drawer> */}
    </aside>
  );
};

export default memo(Sidebar);
