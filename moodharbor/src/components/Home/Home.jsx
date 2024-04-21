import Header from '../Header'
import Footer from '../Footer';
import Main from './Main';
import { useContext } from 'react';
import UserContext from '../Auth/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  return(
  <>
    <Header 
      title="" 
      subtitle="Feel Peaceful" 
      name={user && `Hi ${user}`} 
    />
    <Main></Main>
    <Footer/>
  </>
  );
}

export default Home;
