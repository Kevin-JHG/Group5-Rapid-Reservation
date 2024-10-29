import { Group, Button, Divider, Burger, Drawer, ScrollArea, Modal, Center, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { IconAddressBook, IconCalendar, IconHome, IconToolsKitchen2, IconUser } from '@tabler/icons-react'
import { supabase } from '../../api/supabase'

import classes from './Layout.module.css'

/* eslint-disable react/prop-types */
const LogoLink = ({ onClick }) => (
  <NavLink to="/" className={classes.logoLink} onClick={onClick}>
    <img src="/logo_transparent.png" alt="Logo" width="72px" height="72px" />
    <p>Rapid Reservation</p>
  </NavLink>
)

export const Layout = ({ session, setSession }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [logoutModalOpened, { open: openLogoutModal, close: closeLogoutModal }] = useDisclosure(false)

  const navigate = useNavigate()

  const handleLogout = async () => {
    closeLogoutModal()
    navigate('/')
    try {
      await supabase.auth.signOut()
      setSession(null)
    } catch (error) {
      console.error('Logout failed:', error.message)
    }
  }

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <LogoLink />

          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}>
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
          </Group>

          <Group visibleFrom="sm">
            {session ? (
              <>
                <NavLink to="/profile">
                  <Button color="dark" leftSection={<IconUser size={18} />}>
                    Profile
                  </Button>
                </NavLink>
                <Button color="red" onClick={openLogoutModal} style={{ marginLeft: '0.1rem' }}>
                  Log out
                </Button>
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

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Modal opened={logoutModalOpened} onClose={closeLogoutModal} title="Confirm Logout">
        <p>Are you sure you want to log out?</p>
        <Center>
          <Group position="right" mt="md">
            <Button onClick={closeLogoutModal} variant="filled" color="blue">
              Cancel
            </Button>
            <Button color="red" onClick={handleLogout}>
              Yes, log out
            </Button>
          </Group>
        </Center>
      </Modal>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<LogoLink onClick={closeDrawer} />}
        className={classes.drawer}
        hiddenFrom="sm"
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
              <NavLink
                to="/profile"
                className={({ isActive }) => `${classes.navLink} ${isActive ? classes.activeNavLink : ''}`}
                onClick={closeDrawer}
              >
                <IconUser size={18} className={classes.navIcon} />
                Profile
              </NavLink>
              <Center>
                <Button
                  color="red"
                  onClick={() => {
                    closeDrawer()
                    openLogoutModal()
                  }}
                  style={{ marginTop: '1rem', width: '90%' }}
                >
                  Log out
                </Button>
              </Center>
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

      <Outlet />
    </>
  )
}
