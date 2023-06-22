import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import NextLink from 'next/link';
import idLocale from 'date-fns/locale/id';

export default function QueuePage() {
  const [queueRecords, setQueueRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4400/api/master-data/queue`)
      .then((res) => {
        const data = res.data;
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.date_of_record).getTime() -
            new Date(a.date_of_record).getTime()
        );
        setQueueRecords(sortedData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSelesaiClick = (queueId) => {
    axios
      .put(`http://localhost:4400/api/master-data/queue/${queueId}`, {
        status: 'Completed'
      })
      .then((res) => {
        // Mengupdate data antrian setelah status berhasil diperbarui
        const updatedQueueRecords = queueRecords.map((record) => {
          if (record.queue_id === queueId) {
            return {
              ...record,
              status: 'Completed'
            };
          }
          return record;
        });
        setQueueRecords(updatedQueueRecords);
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const handleModalOpen = (item) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalItem(null);
    setModalOpen(false);
  };

  const today = new Date();
  const formattedDate = format(today, 'EEEE, dd MMMM yyyy', { locale: idLocale });

  return (
    <>
    <Typography sx={{ fontSize: 24, mb: 2 }} color="h1" gutterBottom>
        {formattedDate}
      </Typography>
      <Grid container spacing={2}>
        {queueRecords
          .sort(
            (a, b) =>
              new Date(b.date_of_record).getTime() -
              new Date(a.date_of_record).getTime()
          ).sort((a, b) => {
            if (a.status === 'Completed' && b.status !== 'Completed') {
              return 1;
            }
            if (a.status !== 'Completed' && b.status === 'Completed') {
              return -1;
            }
            return 0;
          })
          .map((record) => (
            <Grid item key={record.queue_id}>
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
                      {format(new Date(record.date_of_queue), 'dd MMMM yyyy')}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4" component="div">
                      Antrian
                    </Typography>
                    <Typography variant="body1">
                      {record.queue_number}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4" component="div">
                      Nama User
                    </Typography>
                    <Typography variant="body1">{record.user.name}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4" component="div">
                      Nama Anak
                    </Typography>
                    <Typography variant="body1">{record.child.name}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4" component="div">
                      Posyandu
                    </Typography>
                    <Typography variant="body1">
                      {record.posyandu.posyandu_name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4" component="div">
                      Status
                    </Typography>
                    <Typography variant="body1">{record.status}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <NextLink
                    href={`/management/Children/historyChildren/${record.child_id}/addHistory`}
                    passHref
                  >
                    <Button variant="contained" color="secondary" sx={{ mr: 1 }}>
                      Riwayat
                    </Button>
                  </NextLink>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleModalOpen(record)}
                    key={record.queue_id}
                  >
                    Selesai
                  </Button>
                  {modalItem && (
                    <>
                      <Dialog open={modalOpen} onClose={handleModalClose}>
                        <DialogTitle align="center" fontSize={'18px'}>
                          Apakah yakin untuk selesai?
                        </DialogTitle>
                        <CardContent>
                          <Button
                            sx={{ margin: 3, paddingX: 4 }}
                            variant="contained"
                            color="success"
                            onClick={() => handleSelesaiClick(modalItem.queue_id)}
                          >
                            Iya
                          </Button>
                          <Button
                            sx={{ margin: 3, paddingX: 4 }}
                            variant="contained"
                            color="secondary"
                            onClick={handleModalClose}
                          >
                            Tidak
                          </Button>
                        </CardContent>
                      </Dialog>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
