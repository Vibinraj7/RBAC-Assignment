import React from 'react'
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'
import loginImage from '../assets/loginImage2.png'
import useLogin from '../hooks/useLogin'



const Login = () => {

   const {error,loading,loginUser} = useLogin();

  const handleLogin = async (value) => {
   await  loginUser(value);
  }


  return (
    <div>
      <Card className='form-container'>
        <Flex gap='large' align='center'>
          {/* image */}
          <Flex flex={1}>
            <img src={loginImage} className='auth-image' />
          </Flex>

          {/* from */}
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className='title'>Sign In</Typography.Title>
            <Typography.Text type='secondary' strong className='slogan'>Unlock your World!</Typography.Text>

            <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>



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

              {
                error && (<Alert description={error} type='error' showIcon closable className='alert' />)
              }

              <Form.Item>
                <Button
                   type={`${loading ? '' : 'primary'}`} 
                  htmlType='submit' size='large' className='btn'>
                  {loading ? <Spin/> : "Sign In"}
                </Button>
              </Form.Item>

              <Form.Item>
                <Link to='/'>
                  <Button size='large' className='btn'>Create Account</Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>



        </Flex>
      </Card>
    </div>
  )
}

export default Login
