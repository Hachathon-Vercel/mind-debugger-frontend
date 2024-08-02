import Navbar from '../Navbar';
import FormPage from '../FormPage';
import './Home.css';

function Home() {
    return (
        <div className="min-h-screen flex flex-col home-page">
            <Navbar />
            <FormPage />
        </div>
    );
}

export default Home;
