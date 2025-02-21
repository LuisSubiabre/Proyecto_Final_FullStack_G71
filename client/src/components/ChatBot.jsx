import { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Button, Tooltip } from '@nextui-org/react';
import Icon from './Icons';
import steps from '../data/steps.json';


const ChatBotComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleStartChat = () => {
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <div className="fixed bottom-5 right-3 z-50">
            {!isChatOpen && (
                <Tooltip content="Chat con Alondra-Bot" color="primary">
                <Button
                    auto
                    flat
                    size="sm"
                    onPress={handleStartChat}
                    className="rounded-full w-16 h-16 bg-[var(--color-secondary-dark)] border-3 border-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)] hover:border-[var(--color-secondary-dark)]"
                >
                    <img src="https://res.cloudinary.com/libreriaalondra/image/upload/v1734362650/logo_fondo_azul_tt5joc.png" alt="logo tienda papeleria alondra" className=' rounded-full' />
                </Button>
                </Tooltip>
            )}

            {isChatOpen && (
                <div className="relative">
                    <Button
                        auto
                        flat
                        color='secondary'
                        size="sm"
                        onPress={handleCloseChat}
                        className="mb-2"
                    >
                        <Icon name="circleXmark" className="text-2xl text-danger-300" />
                        <span className="ml-1 text-danger-300 text-lg font-oswald font-bold">Cerrar</span>
                    </Button>

                    <ChatBot
                        steps={steps}
                        botDelay={800}
                        cache={false}
                        placeholder="Elige una opción o escribe..."

                        bubbleStyle={{
                            fontSize: '0.9rem',
                            lineHeight: '1.3',
                            padding: '8px 10px',
                            borderRadius: '10px'
                        }}
                        bubbleOptionStyle={{
                            fontSize: '0.9rem',
                            lineHeight: '1.3',
                            padding: '8px 10px',
                            borderRadius: '8px'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatBotComponent;
