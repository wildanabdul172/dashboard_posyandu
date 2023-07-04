import { FC, useState, useEffect } from 'react';
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
  Button,
  TextField
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import HistoryIcon from '@mui/icons-material/History';
import React from 'react';
import axios from 'axios';
import router from 'next/router';
import { ChildrenListModel } from '@/models/childrenListModel';
import moment from 'moment';
import 'moment/locale/id';

interface RecentOrdersTableProps {
  className?: string;
  childrenList: ChildrenListModel[];
}

interface Filters {
  keyword: string;
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ }) => {
  const [childList, setChildrenList] = useState([]);
  const [filters, setFilters] = useState<Filters>({
    keyword: ''
  });

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: event.target.value
    }));
  };

  const filteredList = childList.filter((child) => {
    return child.name.toLowerCase().includes(filters.keyword.toLowerCase());
  });

  return (
    <Card>
      <CardContent>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={filters.keyword}
          onChange={handleSearchChange}
          sx={{ mb: 2, width: 200 }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Nama</TableCell>
                <TableCell align="center">Tanggal Lahir</TableCell>
                <TableCell align="center">Jenis Kelamin</TableCell>
                <TableCell align="center">Alamat</TableCell>
                <TableCell align="center">Nama Orang Tua</TableCell>
                <TableCell align="center">Nomor Telepon Orang Tua</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((childrenList, index) => {
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
                        {moment(childrenList.date_of_birth).locale('id').format('dddd, DD MMMM yyyy')}
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
      </CardContent>
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
