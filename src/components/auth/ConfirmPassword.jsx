import React from 'react'
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import FormContainer from '../form/FormContainer';
import { commonModalClasses } from '../../utils/theme';

export default function ConfirmPassword() {
    return (
        <FormContainer>
            <Container>
                <form className={`${commonModalClasses} w-96`}>
                    <Title>Enter New Password</Title>
                    <FormInput
                        type='password'
                        label='New Password'
                        placeholder='**********'
                        name='confirmpassword'
                    />
                    <FormInput
                        type='password'
                        label='Confirm Password'
                        placeholder='**********'
                        name='newpassword'
                    />
                    <Submit value='Confirm Password' />
                </form>
            </Container>
        </FormContainer>
    );
};
