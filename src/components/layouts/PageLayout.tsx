import HeaderNavigation from "../navigation/HeaderNavigation";

const PageLayout: React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <div>
      <HeaderNavigation />
      <main>
        {props.children}
      </main>
    </div>
  );
}

export default PageLayout;
