import MainNavigation from './MainNavigation';
import Container from 'react-bootstrap/Container';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <Container>{props.children}</Container>
    </div>
  );
}

export default Layout;