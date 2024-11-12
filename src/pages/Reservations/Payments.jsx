import { useState } from 'react'
import { Title, Text, Button, Container, Grid, Col, Loader } from '@mantine/core'
import { useForm, useMantineTheme } from '@mantine/hooks'
import { IconCreditCard, IconUser, IconLock, IconCalendar, IconKey } from '@tabler/icons-react'

import classes from './Payment.module.css'

const Payment = () => {
    const theme = useMantineTheme()
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
        firstName: '',
        lastName: '',
        billingAddress: '',
        creditCard: '',
        expirationDate: '',
        cvv: ''
        }
    })
    
    const handleSubmit = () => {
        setLoading(true)
        // Logic to submit payment information goes here
    }
    
    return (
        <Container>
        <Title order={2} mt="lg" ta="center">
            Payment Information
        </Title>
        <Text c="dimmed" mt="sm" ta="center">
            Enter your payment information below
        </Text>
    
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid mt="lg" gap="lg">
            <Col span={12}>
                <div className={classes.inputGroup}>
                <IconUser size={20} color={theme.colors[theme.primaryColor][6]} />
                <input
                    type="text"
                    placeholder="First Name"
                    value={form.values.firstName}
                    onChange={form.handleChange('firstName')}
                    className={classes.input}
                />
                </div>
            </Col>
    
            <Col span={12}>
                <div className={classes.inputGroup}>
                <IconUser size={20} color={theme.colors[theme.primaryColor][6]} />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={form.values.lastName}
                    onChange={form.handleChange('lastName')}
                    className={classes.input}
                />
                </div>
            </Col>
    
            <Col span={12}>
                <div className={classes.inputGroup}>
                <IconLock size={20} color={theme.colors[theme.primaryColor][6]} />
                <input
                    type="text"
                    placeholder="Billing Address"
                    value={form.values.billingAddress}
                    onChange={form.handleChange('billingAddress')}
                    className={classes.input}
                />
                </div>
            </Col>
    
            <Col span={12}>
                <div className={classes.inputGroup}>
                <IconCreditCard size={20} color={theme.colors[theme.primaryColor][6]} />
                <input
                    type="text"
                    placeholder="Credit Card Number"
                    value={form.values.creditCard}
                    onChange={form.handleChange('creditCard')}
                    className={classes.input}
                />
                </div>
            </Col>

            <Col span={12}>
                <div className={classes.inputGroup}>
                <IconCalendar size={20} color={theme.colors[theme.primaryColor][6]} />
                <input
                    type="text"
                    placeholder="Expiration Date"
                    value={form.values.expirationDate}
                    onChange={form.handleChange('expirationDate')}
                    className={classes.input}
                />
                </div>
            </Col>
            
            <Col span={12}>
                <div className={classes.inputGroup}>
                <IconKey size={20} color={theme.colors[theme.primaryColor][6]} />
                <input
                    type="text"
                    placeholder="CVV"
                    value={form.values.cvv}
                    onChange={form.handleChange('cvv')}
                    className={classes.input}
                />
                </div>
            </Col>
            </Grid>

            <Button type="submit" variant="light" color="blue" loading={loading} className={classes.submitButton}>
            Submit Payment Information
            </Button>
        </form>
        </Container>
    )
}

export default Payment
