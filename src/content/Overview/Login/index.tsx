import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Container,
  Grid,
  Typography,
  styled,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Button,
  Alert,
  Stack
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

function Login() {
  const router = useRouter();
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if ('userData' in localStorage) {
      router.replace('/management/PostList');
    }
  }, []);

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const loginService = () => {
      let url = 'http://localhost:4400/api/auth/loginAdmin';
      axios
        .post(url, {
          email: values.email,
          password: values.password
        })
        .then((res) => {
          const userData = res.data;
          if (res.status === 200) {
            localStorage.setItem('userData', JSON.stringify(userData));
            setSuccessMsg('You Are Successfully Logged In');
            setErrorMsg(''); // Reset errorMsg
            setTimeout(() => {
              router.replace('/dashboards');
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error.message);
          if (error.response.status === 401) {
            setErrorMsg('Your Account is not Authorized');
            setSuccessMsg(''); // Reset successMsg
            setTimeout(() => {
              router.reload();
            }, 2000);
          } else {
            setErrorMsg('Email or Password is Wrong!');
            setSuccessMsg(''); // Reset successMsg
            setTimeout(() => {
              router.reload();
            }, 2000);
          }
        });
    };
    loginService();
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <TypographyH1 sx={{ mb: 8 }} variant="h1">
            Welcome to Posyandu Dashboard
          </TypographyH1>
          <form onSubmit={loginHandler}>
            <div>
              {successMsg && (
                <Stack sx={{ mx: 'auto', mb: 5, width: '40ch' }}>
                  <Alert severity="success" variant="filled">
                    {successMsg}
                  </Alert>
                </Stack>
              )}
              {errorMsg && (
                <Stack sx={{ mx: 'auto', mb: 5, width: '40ch' }}>
                  <Alert severity="error" variant="filled">
                    {errorMsg}
                  </Alert>
                </Stack>
              )}
            </div>
            <div>
              <FormControl sx={{ m: 2, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-username">
                  Email
                </InputLabel>
                <Input
                  id="standard-adornment-username"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  required={true}
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 2, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  required={true}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div>
              <Button
                sx={{ m: 2, width: '30ch' }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
