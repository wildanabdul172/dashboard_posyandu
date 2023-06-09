import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, MenuItem, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddForm() {
  const { id } = useRouter().query;
  const [saveName, setSaveName] = useState('');
  const [saveTinggi, setSaveTinggi] = useState('');
  const [saveBerat, setSaveBerat] = useState('');
  const [saveLKepala, setSaveLKepala] = useState('');
  const [saveLLengan, setSaveLLengan] = useState('');
  const [saveImunisasi, setSaveImunisasi] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4400/api/master-data/children/${id}`)
      .then((res) => {
        const data = res.data;
        setSaveName(data[0].name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const tinggiHandler = (e) => {
    const tinggi = e.target.value;
    setSaveTinggi(tinggi);
  };

  const beratHandler = (e) => {
    const berat = e.target.value;
    setSaveBerat(berat);
  };

  const lingkarLenganHandler = (e) => {
    const lingkarLengan = e.target.value;
    setSaveLLengan(lingkarLengan);
  };

  const lingkarKepalaHandler = (e) => {
    const lingkarKepala = e.target.value;
    setSaveLKepala(lingkarKepala);
  };

  const imunisasiHandler = (e) => {
    const imunisasi = e.target.value;
    setSaveImunisasi(imunisasi);
  };

  const saveDataHandler = () => {
    const requestData = {
      height: saveTinggi,
      weight: saveBerat,
      head_circumference: saveLKepala,
      arm_circumference: saveLLengan,
      immunization: saveImunisasi,
      date_of_record: new Date().toISOString()
    };

    let url = `http://localhost:4400/api/master-data/children/${id}/healthRecords`;

    axios
      .post(url, requestData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log('Data saved successfully');
          router.push(`/management/Children/historyChildren/${id}`);
        } else {
          throw new Error('Failed to add or edit Child data!');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to save data. Please try again.');
      });
  };

  return (
    <>
      <Typography sx={{ fontSize: 24, mb: 2 }} color="h1" gutterBottom>
        {saveName}
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Tinggi Badan"
          variant="outlined"
          onChange={tinggiHandler}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Berat Badan"
          variant="outlined"
          onChange={beratHandler}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Lingkar Lengan"
          variant="outlined"
          onChange={lingkarLenganHandler}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Lingkar Kepala"
          variant="outlined"
          onChange={lingkarKepalaHandler}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Imunisasi"
          variant="outlined"
          select
          value={saveImunisasi}
          onChange={imunisasiHandler}
        >
          <MenuItem value="Hepatitis B">Hepatitis B</MenuItem>
          <MenuItem value="Polio">Polio</MenuItem>
          <MenuItem value="BCG">BCG</MenuItem>
          <MenuItem value="DPT">DPT</MenuItem>
          <MenuItem value="PCV">PCV</MenuItem>
          <MenuItem value="Rotavirus">Rotavirus</MenuItem>
          <MenuItem value="Campak">Campak</MenuItem>
        </TextField>
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '20ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={saveDataHandler}
        >
          Add History
        </Button>
      </Box>
    </>
  );
}
