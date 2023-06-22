import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import router from 'next/router';

export default function AddForm() {
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

  const titleHandler = (e) => {
    const title = e.target.value;
    setSaveActivityName(title);
  };

  const dateHandler = (date) => {
    setSelectedDate(date);
  };

  const timeHandler = (time) => {
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
    let url = 'http://localhost:4400/api/master-data/activities';
    axios
      .post(url, requestData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log('Data saved successfully');
          router.push('/management/Schedule');
        } else {
          throw new Error('Creating or editing a post failed!');
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
          label="Activity Title"
          variant="outlined"
          onChange={titleHandler}
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
            label="Activity Date"
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
            label="Article Time"
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
          label="Location"
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
          Add Schedule
        </Button>
      </Box>
    </>
  );
}
