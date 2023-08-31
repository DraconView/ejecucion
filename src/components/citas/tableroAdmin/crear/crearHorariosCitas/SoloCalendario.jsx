import { useState } from 'react';
import Calendar from 'react-calendar';
import './CssOriginalCalendario.css';

function OriginalCalendario() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    if (isNaN(date.getTime())) {
      // La fecha es inválida, no hagas nada
      return;
    }
    const index = selectedDays.findIndex( // ets
      (day) => day.getTime() === date.getTime()
    );
    if (index < 0) {
      setSelectedDays([...selectedDays, date]);
    } else {
      const newSelectedDays = [...selectedDays];
      newSelectedDays.splice(index, 1);
      setSelectedDays(newSelectedDays);
    }
  };

  const onChangeDos = (date) => {
    setDate(date);
  };
  

// value={selectedDays[0]} carga el primero seleccionado para cargar el ultimo dia seleccionado en el calendario la linea de codigo de ser asi value={selectedDays[selectedDays.length-1]}
  return (
    <div className="cld">
      <form className="login-form">
        <h1 className="h1">Calender</h1>
        <Calendar onChange={onChangeDos} value={selectedDays[selectedDays.length-1]} />
        <div className="">
          {selectedDays.toString()}
        </div>
      </form>
    </div>
  );
}

export default OriginalCalendario;

/*
import{ useState} from 'react'
import Calendar from 'react-calendar';
import './CssCrearHorariosCitas.css';

function OriginalCalendario() {

const [date,setDate]=useState(new Date());
const onChange = date =>{
    setDate(date);
}
    return (
        <div className="cld">
            <form className="login-form">
            <h1 className="h1">Calender</h1>
            <Calendar onChange={onChange} value={date}/>
             <div className="">
            {date.toString()}
             </div>
            </form>
        </div>
    )
}

export default OriginalCalendario
*/
/*
import{ useState} from 'react'
import Calendar from 'react-calendar';
import './CssCrearHorariosCitas.css';

function OriginalCalendario() {

const [selectedDays, setSelectedDays] = useState([]);
const onChange = date => {
    const index = selectedDays.findIndex(day => day.getTime() === date.getTime());
    if (index < 0) {
        setSelectedDays([...selectedDays, date]);
    } else {
        selectedDays.splice(index, 1);
        setSelectedDays([...selectedDays]);
    }
}

//console.log(selectedDays)

    return (
        <div className="cld">
            <form className="login-form">
            <h1 className="h1">Calender</h1>
            <Calendar onChange={onChange} value={selectedDays}/>
             <div className="">
            {selectedDays.toString()}
             </div>
            </form>
        </div>
    )
}

export default OriginalCalendario

*/

