import { useState, useEffect } from 'react';
import mysql2 from 'mysql2';

function ConeccionMySql() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const connection = mysql2.createConnection({
      host: 'draconsoftware.com',
      user: 'u493046842_prueba001',
      password: 'u493046842_Prueba001',
      database: 'u493046842_prueba'
    });

    connection.connect(function(err) {
      if (err) {
        //console.error('Error connecting to database:', err.stack);
        return;
      }
    
      //console.log('Connected to database.');
    },

    connection.query('SELECT * FROM tabla_prueba', function (error, results, fields) {
      if (error) throw error;

      setResult(results);
      //console.log('Results:', results);
    }));

    
    connection.end();
  }, []);

  return (
    <div>
      {result ? (
        <ul>
          {result.map(row => (
            <li key={row.id}>{row.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default ConeccionMySql;
