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
  Button,
  Avatar
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { PostedStatus, PostListModel } from '@/models/postListModel';
import React from 'react';
import axios from 'axios';
import router from 'next/router';

interface RecentOrdersTableProps {
  className?: string;
  postList: PostListModel[];
}

interface Filters {
  status?: PostedStatus;
}

const applyFilters = (
  postList: PostListModel[],
  filters: Filters
): PostListModel[] => {
  return postList.filter((postList) => {
    let matches = true;

    if (filters.status && postList.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  postList: PostListModel[],
  page: number,
  limit: number
): PostListModel[] => {
  return postList.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ postList }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [articleList, setArticleList] = useState([]);

  const getArticleList = () => {
    axios
      .get('http://localhost:4400/api/master-data/articles')
      .then((res) => {
        const data = res.data;
        setArticleList(data);
      }).catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getArticleList();
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:4400/api/master-data/articles/${id}`)
      .then(() => {
        setModalOpen(false);
        getArticleList();
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
      event.target.checked ? postList.map((postList) => postList.id) : []
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

  const filteredCryptoOrders = applyFilters(postList, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < postList.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === postList.length;
  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState(false)
  const [modalItem, setModalItem] = useState(null)

  const handleModalOpen = item => {
    setModalItem(item)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalItem(null)
    setModalOpen(false)
  }

  return (
    <Card>
      <TableContainer >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell align='center'>No</TableCell>
              <TableCell align='center'>Post Title</TableCell>
              <TableCell align='center'>Content</TableCell>
              <TableCell align='center'>Create at</TableCell>
              <TableCell align="center">image</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articleList.map((postList, index) => {
              for (var i = 0; i < articleList.length; i++) {
                i;
              }
              return (
                <TableRow
                  hover
                  key={postList.id}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      key={postList.id}
                      align='center'
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
                      align='center'
                    >
                      {postList.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      align='center'
                    >
                      {postList.content.substring(0, 22)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      align='center'
                    >
                      {format(new Date(postList.create_at), 'dd MMMM yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                  <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar variant="rounded" alt={postList.title} src={`http://localhost:4400/${postList.image}`} sx={{ width: 90, height: 90 }}/>
                  </CardContent>
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
                        onClick={ () => { return router.push(`/management/PostList/editPost/${postList.id}`)}}
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
                        onClick={() => handleModalOpen(postList)}
                        key={postList.id}
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
                              onClick={() => deletePost(modalItem.id)}
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
  postList: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  postList: []
};

export default RecentOrdersTable;
