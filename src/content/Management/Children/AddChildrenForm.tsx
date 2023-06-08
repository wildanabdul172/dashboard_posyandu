import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import router from 'next/router';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddForm() {
  const [saveName, setSaveName] = useState('');
  const [saveGender, setSaveGender] = useState('');
  const [saveAddress, setSaveAddress] = useState('');
  const [saveParentName, setSaveParentName] = useState('');
  const [saveParentNumber, setSaveParentNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);


  const nameHandler = (e) => {
    const name = e.target.value;
    setSaveName(name);
  };

  const dateHandler = (date) => {
    setSelectedDate(date);
  };

  const genderHandler = (e) => {
    const gender = e.target.value;
    setSaveGender(gender);
  };

  const addressHandler = (e) => {
    const address = e.target.value;
    setSaveAddress(address);
  };

  const parentNameHandler = (e) => {
    const parentName = e.target.value;
    setSaveParentName(parentName);
  };
  
  const parentNumberHandler = (e) => {
    const parentNumber = e.target.value;
    setSaveParentNumber(parentNumber);
  };

  const saveDataHandler = () => {
    const requestData = {
      name: saveName,
      date_of_birth: selectedDate,
      gender: saveGender,
      address: saveAddress,
      parent_phone_number: saveParentNumber,
      parent_name: saveParentName,
      user_id: null
    };

    let url = 'http://localhost:4400/api/master-data/children';

    axios
      .post(url, requestData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log('Data saved successfully');
          router.push('/management/Children');
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
          label="Name"
          variant="outlined"
          onChange={nameHandler}
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={selectedDate}
            onChange={dateHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-basic"
                variant="outlined"
                multiline
              />
            )}
          />
        </LocalizationProvider>
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
        label="Gender"
        variant="outlined"
        select
        value={saveGender}
        onChange={genderHandler}
      >
        <MenuItem value="Laki-Laki">Laki-Laki</MenuItem>
        <MenuItem value="Perempuan">Perempuan</MenuItem>
      </TextField>
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
          label="Address "
          variant="outlined"
          onChange={addressHandler}
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
          label="Parent Name"
          variant="outlined"
          onChange={parentNameHandler}
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
          label="Parent Phone Number"
          variant="outlined"
          onChange={parentNumberHandler}
        />
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
          Add Children
        </Button>
      </Box>
    </>
  );
}
