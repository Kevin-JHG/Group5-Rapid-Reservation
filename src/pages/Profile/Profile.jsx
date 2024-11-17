import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../api/supabase'
import { Paper, Group, Text, Button, Modal, TextInput, ActionIcon, Avatar, Notification, rem } from '@mantine/core'
import { IconPencil, IconPhone, IconMail, IconX, IconCheck } from '@tabler/icons-react'
import styles from './profile.module.css'

const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

export const Profile = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [notificationKey, setNotificationKey] = useState(0)
  const navigate = useNavigate()

  const fetchUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('first_name, last_name, phone')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setUserInfo({
          id: user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: user.email,
          phone: data.phone,
        })
      } catch (error) {
        setErrors({ root: error.message || 'Failed to load user information.' })
      }
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const openEditModal = () => setEditing(true)
  const closeEditModal = () => setEditing(false)

  const handleSaveClick = async () => {
    if (!userInfo) return

    try {
      const { error } = await supabase
        .from('profile')
        .update({
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          phone: userInfo.phone,
        })
        .eq('id', userInfo.id)

      if (error) throw error

      setMessage('Your information has been updated successfully.')
      closeEditModal()
      await fetchUserInfo()

      setNotificationKey(prevKey => prevKey + 1)
    } catch (error) {
      setErrors({ root: error.message || 'Update failed. Please try again.' })
      setNotificationKey(prevKey => prevKey + 1)
    }
  }

  const handlePasswordReset = () => {
    navigate('/get-password-reset')
  }

  return (
    <div className={styles.pageContainer} style={{ maxWidth: '40rem', margin: '3% auto', userSelect: 'none' }}>
      <Paper align="center" withBorder shadow="xl" radius="md" p="md">
        <Avatar size="15rem" radius="md" src={userInfo?.avatar} style={{ marginTop: '2%', marginBottom: '2.5%' }} />

        <Group style={{ marginLeft: '5rem' }}>
          <Text size="1.75rem" fw={800}>
            {userInfo?.first_name} {userInfo?.last_name}
          </Text>
          <ActionIcon variant="subtle" color="black" radius="xl" onClick={openEditModal}>
            <IconPencil size={20} />
          </ActionIcon>
        </Group>

        <Group mt="md" style={{ marginLeft: '3rem' }}>
          <IconPhone size={18} color="gray" />
          <Text size="lg">Phone: {userInfo?.phone}</Text>
        </Group>

        <Group style={{ marginLeft: '3rem' }}>
          <IconMail size={18} color="gray" />
          <Text size="lg">Email: {userInfo?.email}</Text>
        </Group>

        <div
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            zIndex: 1000,
          }}
        >
          {message && (
            <Notification
              key={notificationKey}
              className={styles.notification}
              withCloseButton={false}
              icon={checkIcon}
              color="teal"
              title="All good!"
              mt="md"
              style={{ background: '#F0F8FF' }}
            >
              {message}
            </Notification>
          )}
          {errors.root && (
            <Notification
              key={notificationKey}
              withCloseButton={false}
              className={styles.notification}
              icon={xIcon}
              color="red"
              title="Bummer!"
              mt="md"
              style={{ background: '#FFC0CB' }}
            >
              {errors.root}
            </Notification>
          )}
        </div>

        <Button color="black" style={{ width: '75%' }} mt="1rem" onClick={handlePasswordReset}>
          Reset Password
        </Button>
      </Paper>

      <Modal style={{ userSelect: 'none' }} opened={editing} onClose={closeEditModal} title="Edit Profile">
        <TextInput
          label="First Name"
          value={userInfo?.first_name || ''}
          onChange={e => setUserInfo({ ...userInfo, first_name: e.target.value })}
        />
        <TextInput
          label="Last Name"
          value={userInfo?.last_name || ''}
          onChange={e => setUserInfo({ ...userInfo, last_name: e.target.value })}
        />
        <TextInput
          label="Phone"
          value={userInfo?.phone || ''}
          onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
        />
        <TextInput label="Email" value={userInfo?.email || ''} readOnly disabled />
        <Button fullWidth mt="1rem" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal>
    </div>
  )
}
