import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

export default function HistoryPage() {
  const { id } = useRouter().query;

  const [saveName, setSaveName] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);

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

    axios
      .get(`http://localhost:4400/api/master-data/children/${id}/healthRecords`)
      .then((res) => {
        const data = res.data;
        setHealthRecords(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <>
      <Typography sx={{ fontSize: 24, mb: 2 }} color="h1" gutterBottom>
        {saveName}
      </Typography>
      <Grid container spacing={2}>
        {healthRecords.map((record) => (
          <Grid item key={record.record_id}>
            <Card sx={{ minWidth: 350, minHeight: 250 }}>
              <CardContent
                sx={{
                  display: 'grid',
                  gridTemplateRows: 'repeat(auto-fill, minmax(0, 1fr))',
                  gap: 2
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="div">
                    Tanggal
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(record.date_of_record), 'MMMM dd yyyy')}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="div">
                    Tinggi Badan
                  </Typography>
                  <Typography variant="body1">{record.height}</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="div">
                    Berat Badan
                  </Typography>
                  <Typography variant="body1">{record.weight}</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="div">
                    Lingkar Kepala
                  </Typography>
                  <Typography variant="body1">
                    {record.head_circumference}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="div">
                    Lingkar Lengan
                  </Typography>
                  <Typography variant="body1">
                    {record.arm_circumference}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="div">
                    Imunisasi
                  </Typography>
                  <Typography variant="body1">{record.immunization}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
