import { useEffect, useState } from 'react';

const cualEsMiIpVanilla = () => {
  const [ipAddress, setIPAddress] = useState('');

  useEffect(() => {
    const getIPAddress = () => {
      const { RTCPeerConnection } = window;
      if (RTCPeerConnection) {
        const connection = new RTCPeerConnection();
        connection.addEventListener('icecandidate', (event) => {
          const candidate = event.candidate;
          if (candidate) {
            const ipAddressRegex = /(?<=ip\s)\d+(\.\d+){3}/;
            const ipAddress = ipAddressRegex.exec(candidate.candidate)[0];
            setIPAddress(ipAddress);
            connection.close();
          }
        });

        connection.createOffer()
          .then((offer) => connection.setLocalDescription(offer))
          .catch((error) => console.log('Error creating RTCPeerConnection offer:', error));
      } else {
       //console.log('RTCPeerConnection is not supported');
      }
    };

    getIPAddress();
  }, []);

  return (
    <span>
      Tu dirección IP es: {ipAddress}
    </span>
  );
};

export default cualEsMiIpVanilla;
