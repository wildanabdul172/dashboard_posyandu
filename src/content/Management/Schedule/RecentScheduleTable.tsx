import { FC, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';

import {
  Tooltip,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  CardContent,
  Button,
  TextField
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import React from 'react';
import axios from 'axios';
import router from 'next/router';
import { ScheduleListModel } from '@/models/scheduleListModel';

interface RecentOrdersTableProps {
  className?: string;
  scheduleList: ScheduleListModel[];
}

const sortScheduleListByDateTime = (scheduleList: ScheduleListModel[]) => {
  return scheduleList.sort((a, b) => {
    const dateA = new Date(a.activity_date);
    const dateB = new Date(b.activity_date);
    const timeA = new Date(`2000-01-01T${a.activity_time}`);
    const timeB = new Date(`2000-01-01T${b.activity_time}`);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;

    return 0;
  });
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({}) => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [filters, setFilters] = useState({
    keyword: ''
  });

  const getScheduleList = () => {
    axios
      .get('http://localhost:4400/api/master-data/activities')
      .then((res) => {
        const data = res.data;
        const sortedScheduleList = sortScheduleListByDateTime(data);
        setActivitiesList(sortedScheduleList);
        console.log(sortedScheduleList)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getScheduleList();
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:4400/api/master-data/activities/${id}`)
      .then(() => {
        setModalOpen(false);
        getScheduleList();
        router.replace(router.asPath);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const theme = useTheme();

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

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: value
    }));
  };

  const filteredActivitiesList = activitiesList.filter((scheduleList) =>
    scheduleList.activity_name
      .toLowerCase()
      .includes(filters.keyword.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={filters.keyword}
          onChange={handleSearchChange}
          sx={{ width: 200 }}
        />
      </CardContent>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Nama Aktivitas</TableCell>
              <TableCell align="center">Tanggal Aktivitas</TableCell>
              <TableCell align="center">Waktu Aktivitas</TableCell>
              <TableCell align="center">Lokasi</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredActivitiesList.map((scheduleList, index) => (
              <TableRow hover key={scheduleList.activity_id}>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                    key={scheduleList.activity_id}
                    align="center"
                  >
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                    align="center"
                  >
                    {scheduleList.activity_name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                    align="center"
                  >
                    {moment(scheduleList.activity_date).locale('id').format('dddd, DD MMMM yyyy')}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                    align="center"
                  >
                    {moment(scheduleList.activity_time).format('HH:mm:ss')} WIB
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                    align="center"
                  >
                    {scheduleList.posyandu.posyandu_name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Order" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => {
                        return router.push(
                          `/management/Schedule/editSchedule/${scheduleList.activity_id}`
                        );
                      }}
                    >
                      <EditTwoToneIcon fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Order" arrow>
                    <IconButton
                      sx={{
                        '&:hover': { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => handleModalOpen(scheduleList)}
                      key={scheduleList.activity_id}
                    >
                      <DeleteTwoToneIcon fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                  {modalItem && (
                    <>
                      <Dialog open={modalOpen} onClose={handleModalClose}>
                        <DialogTitle align="center" fontSize={'18px'}>
                          Are you sure want to delete ?
                        </DialogTitle>
                        <CardContent>
                          <Button
                            sx={{ margin: 3, paddingX: 4 }}
                            variant="contained"
                            color="error"
                            onClick={() => deletePost(modalItem.activity_id)}
                          >
                            Yes
                          </Button>
                          <Button
                            sx={{ margin: 3, paddingX: 4 }}
                            variant="contained"
                            onClick={handleModalClose}
                          >
                            No
                          </Button>
                        </CardContent>
                      </Dialog>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  scheduleList: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  scheduleList: []
};

export default RecentOrdersTable;
