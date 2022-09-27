import { useContext } from 'react';
import AuthContext from "../../store/AuthContext";
import HeaderNavigation from "../navigation/HeaderNavigation";

const PageLayout: React.FC<{children: React.ReactNode}> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      {authCtx.isLoggedIn && <HeaderNavigation />}
      <main>
        {props.children}
      </main>
    </div>
  );
}

export default PageLayout;
