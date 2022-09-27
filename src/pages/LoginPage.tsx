import { createRef, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext, { AuthContextData } from '../store/AuthContext';

const LoginPage: React.FC<{}> = (props) => {
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const [loginError, setLoginError] = useState<string>('');
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      username: usernameRef.current!.value,
      password: passwordRef.current!.value
    }).then(res => {
      authCtx.login(res.data.token);
      setLoginError('');
      navigate('/');
    }).catch((error) => {
      if(error.response) {
        // TODO: proper error handling
        setLoginError(error.response.data.non_field_errors[0]);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {loginError.length !== 0 && <div><p>{loginError}</p></div>}
        <div>
          <label htmlFor='login-form-username'>Username</label>
          <input type='text' name='username' required
            ref={usernameRef}/>
        </div>
        <div>
          <label htmlFor='login-form-password'>Password</label>
          <input type='password' name='password' required
            ref={passwordRef} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
