import { Button, Center, Group, Modal } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../../../api/supabase'

const LogoutModal = ({ opened, close }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    close()
    navigate('/')
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Logout failed:', error.message)
    }
  }
  return (
    <Modal opened={opened} onClose={close} title="Confirm Logout">
      <p>Are you sure you want to log out?</p>
      <Center>
        <Group position="right" mt="md">
          <Button onClick={close} variant="filled" color="blue">
            Cancel
          </Button>
          <Button color="red" onClick={handleLogout}>
            Yes, log out
          </Button>
        </Group>
      </Center>
    </Modal>
  )
}

export default LogoutModal
