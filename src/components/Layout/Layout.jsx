import { Group, Button, Divider, Burger, Drawer, ScrollArea, rem, em } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { NavLink, Outlet } from 'react-router-dom'

import {
  IconAddressBook,
  IconCalendar,
  IconHome,
  IconLayoutDashboard,
  IconToolsKitchen2,
  IconUser,
} from '@tabler/icons-react'

import classes from './Layout.module.css'

/* eslint-disable react/prop-types */
const LogoLink = ({ onClick }) => (
  <NavLink to="/" className={classes.logoLink} onClick={onClick}>
    <img src="/logo_transparent.png" alt="Logo" width="72px" height="72px" />
    <p>Rapid Reservation</p>
  </NavLink>
)

export const Layout = ({ session, isEmployee }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

  const isMobile = useMediaQuery(`(max-width: ${em(850)})`)

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <LogoLink />

          {!isMobile && (
            <>
              <Group h="100%" gap={0}>
                <NavLink to="/" className={({ isActive }) => `${classes.navLink} ${isActive && classes.activeNavLink}`}>
                  Home
                </NavLink>
                <NavLink
                  to="/reservations"
                  className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                >
                  Reservations
                </NavLink>
                <NavLink
                  to="/menu"
                  className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                >
                  Contact
                </NavLink>

                {isEmployee && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                  >
                    Dashboard
                  </NavLink>
                )}
              </Group>
              <Group>
                {session ? (
                  <>
                    <NavLink to="/profile">
                      <Button color="dark" leftSection={<IconUser size={18} />}>
                        Profile
                      </Button>
                    </NavLink>
                    {/* <Button color="red" onClick={openLogoutModal} style={{ marginLeft: '0.1rem' }}> */}
                    {/*   Log out */}
                    {/* </Button> */}
                  </>
                ) : (
                  <>
                    <NavLink to="/login">
                      <Button variant="default">Log in</Button>
                    </NavLink>
                    <NavLink to="/register">
                      <Button color="dark">Sign up</Button>
                    </NavLink>
                  </>
                )}
              </Group>
            </>
          )}

          {isMobile && <Burger opened={drawerOpened} onClick={toggleDrawer} />}
        </Group>
      </header>

      {isMobile && (
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title={<LogoLink onClick={closeDrawer} />}
          className={classes.drawer}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <NavLink
              to="/"
              className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
              onClick={closeDrawer}
            >
              <IconHome size={18} className={classes.navIcon} />
              Home
            </NavLink>
            <NavLink
              to="/reservations"
              className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
              onClick={closeDrawer}
            >
              <IconCalendar size={18} className={classes.navIcon} />
              Reservations
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
              onClick={closeDrawer}
            >
              <IconToolsKitchen2 size={18} className={classes.navIcon} />
              Menu
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
              onClick={closeDrawer}
            >
              <IconAddressBook size={18} className={classes.navIcon} />
              Contact
            </NavLink>

            {session && (
              <>
                {isEmployee && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                    onClick={closeDrawer}
                  >
                    <IconLayoutDashboard size={18} className={classes.navIcon} />
                    Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                  onClick={closeDrawer}
                >
                  <IconUser size={18} className={classes.navIcon} />
                  Profile
                </NavLink>
                {/* <Center> */}
                {/*   <Button */}
                {/*     color="red" */}
                {/*     onClick={() => { */}
                {/*       closeDrawer() */}
                {/*       openLogoutModal() */}
                {/*     }} */}
                {/*     style={{ marginTop: '1rem', width: '90%' }} */}
                {/*   > */}
                {/*     Log out */}
                {/*   </Button> */}
                {/* </Center> */}
              </>
            )}

            {!session && (
              <>
                <Divider my="sm" />
                <Group justify="center" grow pb="xl" px="md">
                  <NavLink to="/login" onClick={closeDrawer}>
                    <Button variant="default" fullWidth>
                      Log in
                    </Button>
                  </NavLink>
                  <NavLink to="/register" onClick={closeDrawer}>
                    <Button color="dark" fullWidth>
                      Sign up
                    </Button>
                  </NavLink>
                </Group>
              </>
            )}
          </ScrollArea>
        </Drawer>
      )}

      <Outlet />
    </>
  )
}
