import { useContext } from 'react';
import DailyValueForm from '../components/forms/DailyValueForm';
import TargetForm from '../components/forms/TargetForm';
import AuthContext from '../store/AuthContext';

const ProfilePage: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <TargetForm />
      <DailyValueForm />
    </div>
  );
}

export default ProfilePage;
