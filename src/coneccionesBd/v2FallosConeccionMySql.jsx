import { useState, useEffect } from 'react';
// import mysql from 'mysql'; error
//require = require('esm')(module);
//const mysql = require('mysql');
import mysql from 'mysql2'; 

function ConeccionMySql() {
  useEffect(() => {
    const connection = mysql.createConnection({
      host: '82.180.174.154',
      user: 'u493046842_bprueba010623',
      password: 'Cprueba010623',
      database: 'u493046842_uprueba010623'
    });

    connection.connect((err) => {
      if (err) throw err;
      //console.log('Connected!');
    });

    connection.query('SELECT * from tabla_prueba', (err, rows) => { 
      if (err) throw err;

      //console.log('Data received from Db:');
      //console.log(rows);
    });

    connection.end();
  }, []);

  return (
    <div>
      Bien
    </div>
  );
}

export default ConeccionMySql;
