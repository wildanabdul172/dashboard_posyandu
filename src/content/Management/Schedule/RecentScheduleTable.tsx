import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import moment from 'moment';
import 'moment-timezone';

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
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import React from 'react';
import axios from 'axios';
import router from 'next/router';
import { PostedStatus, ScheduleListModel } from '@/models/scheduleListModel';

interface RecentOrdersTableProps {
  className?: string;
  scheduleList: ScheduleListModel[];
}

interface Filters {
  status?: PostedStatus;
}

const applyFilters = (
  scheduleList: ScheduleListModel[],
  filters: Filters
): ScheduleListModel[] => {
  return scheduleList.filter((scheduleList) => {
    let matches = true;

    if (filters.status && scheduleList.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  scheduleList: ScheduleListModel[],
  page: number,
  limit: number
): ScheduleListModel[] => {
  return scheduleList.slice(page * limit, page * limit + limit);
};

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

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ scheduleList }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [activitiesList, setActivitiesList] = useState([]);

  const getScheduleList = () => {
    axios
      .get('http://localhost:4400/api/master-data/activities')
      .then((res) => {
        const data = res.data;
        const sortedScheduleList = sortScheduleListByDateTime(data);
        setActivitiesList(sortedScheduleList);
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

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? scheduleList.map((scheduleList) => scheduleList.activity_id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(scheduleList, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < scheduleList.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === scheduleList.length;
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

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Activity Name</TableCell>
              <TableCell align="center">Activity Date</TableCell>
              <TableCell align="center">Activity Time</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesList.map((scheduleList, index) => {
              for (var i = 0; i <= activitiesList.length; i++) {
                i;
              }
              return (
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
                      {format(
                        new Date(scheduleList.activity_date),
                        'dd MMMM yyyy'
                      )}
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
                      {moment(scheduleList.activity_time).format('HH:mm:ss')}
    WIB
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
                      {scheduleList.activity_location}
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
              );
            })}
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
