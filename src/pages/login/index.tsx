import type { FC } from 'react';
import { Button, Card, Row, Col, Input, Layout, Space } from 'antd';
import leftImage from '@/assets/logo/header_mobile_avatar_3.webp';
import { MailOutlined, LockOutlined, TwitterOutlined, GoogleOutlined, AppleFilled } from '@ant-design/icons';

const Login: FC = () => {
    return (
        <Layout>
            <div style={{height: '100vh', padding: '30px 100px', backgroundColor: '#9A616D'}}>
                <Row style={{height: '100%', backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden'}}>
                    <Col span={12} md='6' style={{height: '100%', overflow: 'hidden'}}>
                        <img src={leftImage} alt='img' style={{height: '100%'}} />
                    </Col>
                    <Col span={12} md='6' style={{padding: '40px', textAlign: 'center'}}>
                        <h1 className="fw-normal my-4 pb-3" style={{ textAlign: 'center' }}>Login to account</h1>
                        <p>Let's login to your account</p>
                        <Input placeholder="Email Address" size="large" style={{marginBottom: '20px'}} prefix={<MailOutlined />}/>
                        <Input placeholder="Password" size="large" style={{marginBottom: '20px'}} prefix={<LockOutlined />}/>
                        <p>OR</p>
                        <Space>
                            <a href='/'>
                                <TwitterOutlined style={{color: 'black'}}/>
                            </a>
                            <a href='/'>
                                <GoogleOutlined style={{color: 'black'}}/>
                            </a>
                            <a href='/'>
                                <AppleFilled style={{color: 'black'}}/>
                            </a>
                        </Space>
                        <p className="mb-5 pb-lg-2">Don't have an account? <a href="/signup" style={{ color: '#393f81' }}>Sign Up</a></p>
                        <Button className="mb-4 px-5" type='primary' size='large' style={{width: '100%', marginBottom: '20px'}}>Login</Button>
                        
                        <div className='d-flex flex-row justify-content-start'>
                            <p className="mb-5 pb-lg-2">By signing up, you agree to our
                            <a href="#!" className="small text-muted me-1"> Privacy </a>
                            and
                            <a href="#!" className="small text-muted"> Terms of Service</a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}

export default Login;