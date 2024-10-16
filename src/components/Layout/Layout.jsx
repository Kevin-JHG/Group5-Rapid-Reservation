import { Group, Button, Divider, Burger, Drawer, ScrollArea, Modal, Center, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { IconAddressBook, IconCalendar, IconHome, IconToolsKitchen2, IconUser } from '@tabler/icons-react'
import { supabase } from '../../api/supabase'

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

export const Layout = ({ session, setSession }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [logoutModalOpened, { open: openLogoutModal, close: closeLogoutModal }] = useDisclosure(false);

  const navigate = useNavigate();

  // Function to handle log out
  const handleLogout = async () => {
    closeLogoutModal();
    navigate('/'); // Redirect user to home page on logout
    try {
      await supabase.auth.signOut();
      setSession(null); // Clear session after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

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
              <>
                <NavLink to="/profile">
                  <Button color="dark" leftSection={<IconUser size={18} />}>
                    Profile
                  </Button>
                </NavLink>
                <Button color="red" onClick={openLogoutModal} style={{ marginLeft: '0.1rem' }}>Log out</Button>
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
              <Button onClick={closeLogoutModal} variant="default">Cancel</Button>
              <Button color="red" onClick={handleLogout}>Yes, log out</Button>
          </Group>
        </Center>
      </Modal>


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
            <>
              <NavLink to="/profile" className={classes.navLink} onClick={closeDrawer}>
                <IconUser size={18} className={classes.navIcon} />
                Profile
              </NavLink>
              <Center>
                <Button 
                  color="red" 
                  onClick={() => {
                    closeDrawer(); // Close the drawer
                    openLogoutModal(); // Open the logout modal
                  }} 
                  style={{ marginTop: '1rem', width: '90%' }}>
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
