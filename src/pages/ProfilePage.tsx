import { useContext } from 'react';
import Card from '../components/ui/Card';
import DailyValueForm from '../components/forms/DailyValueForm';
import TargetForm from '../components/forms/TargetForm';
import AuthContext from '../store/AuthContext';

const ProfilePage: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Card>
        <TargetForm />
      </Card>
      <Card>
        <DailyValueForm />
      </Card>
    </>
  );
}

export default ProfilePage;
