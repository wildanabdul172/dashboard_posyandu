import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

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
import HistoryIcon from '@mui/icons-material/History';
import React from 'react';
import axios from 'axios';
import router from 'next/router';
import { ChildrenListModel, PostedStatus } from '@/models/childrenListModel';

interface RecentOrdersTableProps {
  className?: string;
  childrenList: ChildrenListModel[];
}

interface Filters {
  status?: PostedStatus;
}

const applyFilters = (
  childrenList: ChildrenListModel[],
  filters: Filters
): ChildrenListModel[] => {
  return childrenList.filter((childrenList) => {
    let matches = true;

    if (filters.status && childrenList.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  childrenList: ChildrenListModel[],
  page: number,
  limit: number
): ChildrenListModel[] => {
  return childrenList.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ childrenList }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [childList, setChildrenList] = useState([]);

  const getScheduleList = () => {
    axios
      .get('http://localhost:4400/api/master-data/children')
      .then((res) => {
        const data = res.data;
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setChildrenList(sortedData);
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
      .delete(`http://localhost:4400/api/master-data/children/${id}`)
      .then(() => {
        setModalOpen(false);
        getScheduleList();
        router.replace(router.asPath);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const filteredCryptoOrders = applyFilters(childrenList, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < childrenList.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === childrenList.length;
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

  //   const toggleModal = React.useCallback((id) => () => {
  //     setShowModal(!showModal);
  //     console.log(`Post id: ${id}`);
  // }, []);

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Children Name</TableCell>
              <TableCell align="center">Date of Birth</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Parent Name</TableCell>
              <TableCell align="center">Parent Phone Number</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {childList.map((childrenList, index) => {
              for (var i = 0; i <= childList.length; i++) {
                i;
              }
              return (
                <TableRow hover key={childrenList.child_id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      key={childrenList.child_id}
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
                      {childrenList.name}
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
                        new Date(childrenList.date_of_birth),
                        'MMMM dd yyyy'
                      )}
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
                      {childrenList.gender}
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
                      {childrenList.address}
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
                      {childrenList.parent_name}
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
                      {childrenList.parent_phone_number}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Riwayat" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.secondary.lighter
                          },
                          color: theme.palette.secondary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          // Tambahkan logika untuk mengarahkan ke halaman riwayat
                          // Misalnya:
                          router.push(
                            `/management/Children/historyChildren/${childrenList.child_id}`
                          );
                        }}
                      >
                        <HistoryIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" arrow>
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
                            `/management/Children/editChildren/${childrenList.child_id}`
                          );
                        }}
                      >
                        <EditTwoToneIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleModalOpen(childrenList)}
                        key={childrenList.child_id}
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
                              onClick={() => deletePost(modalItem.child_id)}
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
  childrenList: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  childrenList: []
};

export default RecentOrdersTable;
