import { Button, Container, Image } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import styles from './NoPage.module.css'

export const NoPage = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <Container className={styles.noPageContainer}>
      <div className={styles.imageWrapper}>
        <Image src="./page_not_found.png" alt="404" className={styles.errorImage} />
      </div>
      <Button color="dark" className={styles.backButton} onClick={handleBackToHome}>
        Go Back Home
      </Button>
    </Container>
  )
}
