import {useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function EstrellasComp() {
  const [value, setValue] = useState(5);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}

