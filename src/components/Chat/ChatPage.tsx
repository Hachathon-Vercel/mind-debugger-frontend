import Navbar from '../Navbar';
import Chat from '../Chat';

function ChatPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Chat />
        </div>
    );
}

export default ChatPage;
