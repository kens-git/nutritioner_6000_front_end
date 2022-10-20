import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import AuthContext, { AuthContextData } from '../store/AuthContext';
import { GET, POST } from '../utility/Requests';
import Login from '../types/Login';
import LoginResponse from '../types/response/LoginResponse';
import { button_classes, input_classes }
  from '../components/tailwind_classes';

/** Component displaying the login page. */
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
          <input className={input_classes} type='text' name='username' required
            ref={usernameRef}/>
        </div>
        <div className='mb-2 flex flex-row justify-between items-center'>
          <label className='' htmlFor='login-form-password'>Password</label>
          <input className={input_classes} type='password' name='password' required
            ref={passwordRef} />
        </div>
        <button className={button_classes} type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
