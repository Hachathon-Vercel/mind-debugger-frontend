import Navbar from '../Navbar';
import FormPage from '../FormPage';

function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <FormPage />
        </div>
    );
}

export default Home;
