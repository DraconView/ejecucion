import { useEffect, useState } from 'react';

const CualEsMiIpApi = () => {
  const [ipAddress, setIPAddress] = useState('');

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIPAddress(data.ip);
      } catch (error) {
       //console.log('Error fetching IP address:', error);
      }
    };

    fetchIPAddress();
  }, []);

  return (
    <span>
      Tu dirección IP es: {ipAddress}
    </span>
  );
};

export default CualEsMiIpApi;
