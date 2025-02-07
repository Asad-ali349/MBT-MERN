import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backend_url = 'https://mithu-butt-tikka-backend.vercel.app';
    // const backend_url = process.env.REACT_APP_ENV === 'local' ? 'http://localhost:5000' : 'https://mithu-butt-tikka-backend.vercel.app';
    console.log({backend_url})
    const newSocket = io(backend_url);
    console.log('newSocket',newSocket);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
}; 