import { Group, Button, Divider, Burger, Drawer, ScrollArea, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, Outlet } from 'react-router-dom'

import { IconAddressBook, IconCalendar, IconHome, IconToolsKitchen2, IconUser } from '@tabler/icons-react'

import classes from './Layout.module.css'

/* eslint-disable react/prop-types */
const LogoLink = ({ onClick }) => {
  return (
    <NavLink to="/" className={classes.logoLink} onClick={onClick ? onClick : null}>
      <img src="/logo_transparent.png" alt="Logo" width="72px" height="72px" />
      <p>Rapid Reservation</p>
    </NavLink>
  )
}

export const Layout = ({ session }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <LogoLink />

          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={classes.navLink}>
              Home
            </NavLink>
            <NavLink to="/reservations" className={classes.navLink}>
              Reservations
            </NavLink>
            <NavLink to="/menu" className={classes.navLink}>
              Menu
            </NavLink>
            <NavLink to="/contact" className={classes.navLink}>
              Contact
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            {session ? (
              <NavLink to="/profile">
                <Button color="dark" leftSection={<IconUser size={18} />}>
                  Profile
                </Button>
              </NavLink>
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

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      {/* Mobile nav drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<LogoLink onClick={closeDrawer} />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink to="/" className={classes.navLink} onClick={closeDrawer}>
            <IconHome size={18} className={classes.navIcon} />
            Home
          </NavLink>
          <NavLink to="/reservations" className={classes.navLink} onClick={closeDrawer}>
            <IconCalendar size={18} className={classes.navIcon} />
            Reservations
          </NavLink>
          <NavLink to="/menu" className={classes.navLink} onClick={closeDrawer}>
            <IconToolsKitchen2 size={18} className={classes.navIcon} />
            Menu
          </NavLink>
          <NavLink to="/contact" className={classes.navLink} onClick={closeDrawer}>
            <IconAddressBook size={18} className={classes.navIcon} />
            Contact
          </NavLink>
          {session && (
            <NavLink to="/profile" className={classes.navLink} onClick={closeDrawer}>
              <IconUser size={18} className={classes.navIcon} />
              Profile
            </NavLink>
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

      <Outlet />
    </>
  )
}
