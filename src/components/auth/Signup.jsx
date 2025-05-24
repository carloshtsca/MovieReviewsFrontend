import React, { useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import { commonModalClasses } from '../../utils/theme'
import FormContainer from '../form/FormContainer';

export default function Signup() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = ({ target }) => {
        const { value, name} = target;
        setUserInfo({...userInfo, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInfo);
    }

    const { name, email, password } = userInfo;

    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className={`${commonModalClasses} w-72`}>
                    <Title children='Sign up' />
                    <FormInput value={name} onChange={handleChange} type='text' label='Name' placeholder='John Doe' name='name' />
                    <FormInput value={email} onChange={handleChange} type='email' label='Email' placeholder='john@email.com' name='email' />
                    <FormInput value={password} onChange={handleChange} type='password' label='Password' placeholder='***********' name='password' />
                    <Submit value='Sign up' />

                    <div className='flex justify-between'>
                        <CustomLink to='/auth/forget-password'>Forget Password</CustomLink>
                        <CustomLink to='/auth/signin'>Sign in</CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}
