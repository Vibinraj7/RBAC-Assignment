import React from 'react'
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'
import registerImage from '../assets/registerImage.jpg'
import useSignup from '../hooks/useSignup'

const Register = () => {
  const { loading, error, registerUser } = useSignup()

  const handleRegister = (values) => {
    console.log(values)
    registerUser(values);
  }
  return (
    <div>
      <Card className='form-container'>
        <Flex gap='large' align='center'>

          {/* from */}
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className='title'>Create an Account</Typography.Title>
            <Typography.Text type='secondary' strong className='slogan'>Join for Exclusive access!</Typography.Text>

            <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>

              <Form.Item label="Full Name" name="name" rules={[
                {
                  required: true,
                  message: 'Please enter your full name!'
                },
              ]}>
                <Input size='large' placeholder='enter your full name' />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[
                {
                  required: true,
                  message: "Please enter your email!"
                },
                {
                  type: 'email',
                  message: "Invalid email address!"
                }
              ]}>
                <Input size='large' placeholder='enter your email' />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[
                {
                  required: true,
                  message: 'Please enter your Password!'
                },
              ]}>
                <Input.Password size='large' placeholder='enter your password!' />
              </Form.Item>

              <Form.Item label="Confirm Password" name="passwordConfirm" rules={[
                {
                  required: true,
                  message: 'Please Confirm your Password!'
                },
              ]}>
                <Input.Password size='large' placeholder='confirm your password' />
              </Form.Item>

              {
                error && (<Alert description={error} type='error' showIcon closable className='alert' />)
              }

              <Form.Item>
                <Button
                   type={`${loading ? '' : 'primary'}`} 
                  htmlType='submit' size='large' className='btn'>
                  {loading ? <Spin/> : "Create Account"}
                </Button>
              </Form.Item>

              <Form.Item>
                <Link to='/login'>
                  <Button size='large' className='btn'>Sign In</Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>

          {/* image */}
          <Flex flex={1}>
            <img src={registerImage} className='auth-image' />
          </Flex>

        </Flex>
      </Card>
    </div>
  )
}

export default Register
