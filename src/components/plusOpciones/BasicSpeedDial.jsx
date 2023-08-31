//insertado para boton plus
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import { MdSupportAgent } from "react-icons/md";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import WhatsappDeal from '../../components/plusOpciones/WhatsappDeal'
import TelefonoDeal from '../../components/plusOpciones/TelefonoDeal'
import FacebookDeal from '../../components/plusOpciones/FacebookDeal'

//{ icon: <InstagramDeal />, name: 'Instagram' },
//{ icon: <EscanerDeal />, name: 'Qr' }
//  { icon: <UbicacionDeal />, name: 'Ubicacion' },
 
const actions = [
  { icon: <WhatsappDeal />, name: 'WhatsApp' },
  { icon: <TelefonoDeal />, name: 'Llamar' },

  { icon: <FacebookDeal />, name: 'Facebook' },

];
 
export default function BasicSpeedDial() {

  return (
    <div id="idBasicSpeedDial">
    <Box sx={{transform: 'translateZ(0px)', position: 'fixed', bottom:50, right:30}}>
      <SpeedDial
        
        ariaLabel="SpeedDial basic example"
        icon={<MdSupportAgent />} //icono principal
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
    </div>
  );
}

