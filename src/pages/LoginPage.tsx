import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import AuthContext, { AuthContextData } from '../store/AuthContext';
import { GET, POST } from '../utility/Requests';
import Login from '../types/Login';
import LoginResponse from '../types/response/LoginResponse';

const LoginPage: React.FC<{}> = (props) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<string>('');
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    event.preventDefault();
    POST<Login, LoginResponse>('login', {
      username: usernameRef.current!.value,
      password: passwordRef.current!.value
    }).then(response => {
      console.log(response);
      authCtx.login(response!.data.user_id.toString(),
        response!.data.token);
      setLoginError('');
      navigate('/');
    });
  };

  return (
    <div className='grid h-screen place-items-center'>
      <form className='m-4 w-80 flex flex-col' onSubmit={onSubmit}>
        {loginError.length !== 0 && <div><p>{loginError}</p></div>}
        <div className='my-2 flex flex-row justify-between items-center'>
          <label htmlFor='login-form-username'>Username</label>
          <input className='p-1.5 border rounded' type='text' name='username' required
            ref={usernameRef}/>
        </div>
        <div className='mb-2 flex flex-row justify-between items-center'>
          <label className='' htmlFor='login-form-password'>Password</label>
          <input className='p-1.5 border rounded' type='password' name='password' required
            ref={passwordRef} />
        </div>
        <button className='h-10 rounded-md bg-sky-300 hover:bg-sky-200' type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
