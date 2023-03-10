import MainNavigation from './MainNavigation';
import Container from 'react-bootstrap/Container';
import AuthModal from '../UI/AuthModal';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <Container>{props.children}
      
      <AuthModal/>
      
      </Container>
    </div>
  );
}

export default Layout;