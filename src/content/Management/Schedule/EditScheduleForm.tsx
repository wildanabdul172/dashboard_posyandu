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
import TimePicker from '@mui/lab/TimePicker';
import { useEffect, useState } from 'react';

export default function AddForm() {
  const { id } = useRouter().query;

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [saveActivityName, setSaveActivityName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:4400/api/master-data/posyandu');
      const data = response.data;
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4400/api/master-data/activities/${id}`)
      .then((res) => {
        const data = res.data;
        setSaveActivityName(data[0].activity_name);
        setSelectedDate(data[0].activity_date);
        setSelectedTime(data[0].activity_time);
        setSelectedLocation(data[0].activity_location);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log();

  }, []);

  const titleHandler = (e) => {
    const title = e.target.value;
    setSaveActivityName(title);
  };

  const dateHandler = (date) => {
    setSelectedDate(date);
  };

  const timeHandler = (time) => {
    console.log(time)
    setSelectedTime(time);
  };

  const locationHandler = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId);
  };

  const saveDataHandler = () => {
    const requestData = {
      activity_name: saveActivityName,
      activity_date: selectedDate,
      activity_time: selectedTime,
      activity_location: selectedLocation
    };

    let url = `http://localhost:4400/api/master-data/activities/${id}`;

    axios
      .put(url, requestData)
      .then((res) => {
        if (res.status == 200) {
          setSuccessMsg('You Are Successfully Edit');
          setTimeout(() => {
            router.replace('/management/Schedule');
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
          label="Nama Aktivitas"
          variant="outlined"
          onChange={titleHandler}
          value={saveActivityName}
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
            label="Tanggal Aktivitas"
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
          '& > :not(style)': { m: 1, width: '75ch' },
          '& .MuiOutlinedInput-multiline': {
            minHeight: '100px'
          }
        }}
        noValidate
        autoComplete="off"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Waktu Aktivitas"
            value={selectedTime}
            onChange={timeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-basic"
                variant="outlined"
                multiline
              />
            )}
            ampm={false}
            inputFormat="HH:mm:ss"
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
          label="Lokasi"
          variant="outlined"
          onChange={locationHandler}
          select
          value={selectedLocation}
        >
          <MenuItem value="" disabled>
            Select Location
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location.posyandu_id} value={location.posyandu_id}>
              {location.posyandu_name}
            </MenuItem>
          ))}
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
          Edit Jadwal
        </Button>
      </Box>
    </>
  );
}
