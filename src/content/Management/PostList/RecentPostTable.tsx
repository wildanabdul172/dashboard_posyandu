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
  Avatar,
  TextField
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { PostListModel } from '@/models/postListModel';
import React from 'react';
import axios from 'axios';
import router from 'next/router';

interface RecentOrdersTableProps {
  className?: string;
  postList: PostListModel[];
}

interface Filters {
  keyword: string;
}

const sortPostListByDateTime = (postList: PostListModel[]) => {
  return postList.sort((a, b) => {
    const dateTimeA = new Date(a.create_at);
    const dateTimeB = new Date(b.create_at);

    if (dateTimeA > dateTimeB) return -1;
    if (dateTimeA < dateTimeB) return 1;

    return 0;
  });
};


const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ }) => {
  const [articleList, setArticleList] = useState([]);
  const [filters, setFilters] = useState<Filters>({
    keyword: ''
  });

  const getArticleList = () => {
    axios
      .get('http://localhost:4400/api/master-data/articles')
      .then((res) => {
        const data = res.data;
        const sortedPostList = sortPostListByDateTime(data);
        setArticleList(sortedPostList);
      })
      .catch((error) => {
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

  const filteredArticleList = articleList.filter((postList) =>
    postList.title.toLowerCase().includes(filters.keyword.toLowerCase())
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
              <TableCell align="center">Judul Artikel</TableCell>
              <TableCell align="center">Konten</TableCell>
              <TableCell align="center">Tanggal Dibuat</TableCell>
              <TableCell align="center">Gambar</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArticleList.map((postList, index) => (
              <TableRow hover key={postList.id}>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
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
                    align="center"
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
                    align="center"
                  >
                    {format(new Date(postList.create_at), 'dd MMMM yyyy')}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                      variant="rounded"
                      alt={postList.title}
                      src={`http://localhost:4400/${postList.image}`}
                      sx={{ width: 90, height: 90 }}
                    />
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
                      onClick={() => {
                        return router.push(`/management/PostList/editPost/${postList.id}`);
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
            ))}
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
