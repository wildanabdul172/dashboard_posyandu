import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, MenuItem, Stack } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import router, { useRouter } from 'next/router';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useEffect, useState } from 'react';

export default function EditForm() {
  const { id } = useRouter().query;

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [saveName, setSaveName] = useState('');
  const [saveGender, setSaveGender] = useState('');
  const [saveAddress, setSaveAddress] = useState('');
  const [saveParentName, setSaveParentName] = useState('');
  const [saveParentNumber, setSaveParentNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4400/api/master-data/children/${id}`)
      .then((res) => {
        const data = res.data;
        setSaveName(data[0].name);
        setSaveGender(data[0].gender);
        setSaveAddress(data[0].address);
        setSaveParentName(data[0].parent_name);
        setSaveParentNumber(data[0].parent_phone_number);
        setSelectedDate(data[0].date_of_birth);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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

    let url = `http://localhost:4400/api/master-data/children/${id}`;

    axios
      .put(url, requestData)
      .then((res) => {
        if (res.status == 200) {
          setSuccessMsg('You Are Successfully Edit');
          setTimeout(() => {
            router.replace('/management/Children');
          }, 3000);
        } else {
          setErrorMsg('Please Fill in the Form Above');
          setTimeout(() => {
            router.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.message);
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
        <div>
              {successMsg && (
                <Stack sx={{ mx: 'auto', mb: 5, width: '40ch' }}>
                  <Alert severity="success" variant="filled">
                    {successMsg}
                  </Alert>
                </Stack>
              )}
              {errorMsg && (
                <Stack sx={{ mx: 'auto', mb: 5, width: '40ch' }}>
                  <Alert severity="error" variant="filled">
                    {errorMsg}
                  </Alert>
                </Stack>
              )}
            </div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={nameHandler}
          value={saveName}
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
          value={saveAddress}
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
          value={saveParentName}
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
          value={saveParentNumber}
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
