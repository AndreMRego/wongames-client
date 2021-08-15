import { useState } from 'react';
import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Email, Lock } from '@styled-icons/material-outlined';

import { FormWrapper, FormLink } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import * as S from './styles';

const FormSignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { push } = useRouter();

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //sign in
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/',
    });

    if (result?.url) {
      return push(result?.url);
    }

    console.log('email ou senha inválida');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          onInputChange={(v) => handleInput('email', v)}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          onInputChange={(v) => handleInput('password', v)}
        />

        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
        <Button type="submit" size="large" fullWidth>
          Sign in now
        </Button>

        <FormLink>
          Don’t have an account?
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
};

export default FormSignIn;
