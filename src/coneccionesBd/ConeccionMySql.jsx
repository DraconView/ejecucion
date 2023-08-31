import { useState, useEffect } from 'react';
import mysql from 'mysql';

function ConeccionMySql() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const connection = mysql.createConnection({
      host: '82.180.174.154',
      user: 'u493046842_bprueba010623',
      password: 'Cprueba010623',
      database: 'u493046842_uprueba010623'
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
