/* eslint-disable prettier/prettier */
import { Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';

// material ui
import {
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  alpha,
  useMediaQuery,
  useTheme
} from '@mui/material';

// third-party
import { PopupTransition } from 'components/@extended/Transitions';
import { EmptyTable, HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';

import { renderFilterTypes } from 'utils/react-table';

// project import
import { EditTwoTone, PlusOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import AddEditCoconutHarvest from 'sections/coconut-management/coconut-harvest/AddEditCoconutHarvest';
import { useDispatch, useSelector } from 'store';
import { createCoconutHarvest, getCoconutHarvestByDate, toInitialState } from 'store/reducers/coconut-harvest';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';
import { ReactTableProps, dataProps } from './types/types';
import { useNavigate } from 'react-router-dom';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, handleAddEdit, getHeaderProps }: ReactTableProps) {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const sortBy = { id: 'id', desc: false };

  const filterTypes = useMemo(() => renderFilterTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { selectedRowIds, pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="right" alignItems="center" sx={{ p: 3, pb: 0 }}>
          {/* <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          /> */}
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="end" spacing={1}>
            {/* <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} /> */}
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddEdit} size="small">
              Add New
            </Button>
          </Stack>
        </Stack>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column: HeaderGroup) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row: Row, i: number) => {
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell: Cell) => (
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                      ))}
                    </TableRow>
                    {/* {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })} */}
                  </Fragment>
                );
              })
            ) : (
              <EmptyTable msg="No Data" colSpan={12} />
            )}
            <TableRow>
              <TableCell sx={{ p: 2 }} colSpan={12}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

// ==============================|| Tea Money Management List ||============================== //

// constant
const getInitialValues = (coconutHarvest: FormikValues | null) => {
  const newTeaMoney = {
    coconutHarvestId: '',
    code: '',
    isPaidByCoconuts: true,
    harvestFeeAmount: '',
    harvestFeeCoconut: '',
    harvestDate: new Date().toISOString().split('T')[0]
  };

  if (coconutHarvest) {
    return _.merge({}, newTeaMoney, {
      ...coconutHarvest,
      categoryId: coconutHarvest.bmBook?.categoryId
    });
  }

  return newTeaMoney;
};

const CoconutHarvestManagementList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useNavigate();

  const TeaMoneySchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: getInitialValues(null),
    validationSchema: TeaMoneySchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        dispatch(
          createCoconutHarvest({
            harvestDate: values.harvestDate,
            totalCoconuts: coconutHarvestList?.result!.reduce((acc, curr) => acc + (curr.totalCoconuts || 0), 0),
            isPaidByCoconuts: values.isPaidByCoconuts || false,
            harvestFeeCoconut: isPaidByCoconuts ? Number(values.harvestFeeCoconut) : 0,
            harvestFeeAmount: isPaidByCoconuts ? 0 : Number(values.harvestFeeAmount),
            noOfTrees: coconutHarvestList?.result!.length,
            listOfHarvest: coconutHarvestList?.result!
          })
        );
        resetForm();
        dispatch(toInitialState());
        setSubmitting(false);
        router(-1);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const [customer, setCustomer] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);
  const [coconutHarvestDataList, setCoconutHarvestList] = useState<dataProps[]>([]);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer([]);
  };

  //render table
  const columns = useMemo(
    () =>
      [
        {
          Header: '#',
          accessor: 'id',
          className: 'cell-center',
          Cell: ({ row }: { row: Row }) => {
            if (row.id === undefined || row.id === null || row.id === '') {
              return <>-</>;
            }
            if (typeof row.id === 'string') {
              return <>{(parseInt(row.id) + 1).toString()}</>;
            }
            if (typeof row.id === 'number') {
              return <>{row.id + 1}</>;
            }
            // Handle any other data types if necessary
            return <>-</>;
          }
        },
        {
          Header: 'Code',
          accessor: 'code'
        },
        {
          Header: 'Name',
          accessor: 'nameOfTree'
        },
        {
          Header: 'Total Coconuts',
          accessor: 'totalCoconuts'
        },
        {
          id: 'actions',
          Header: 'Actions',
          accessor: 'actions',
          className: 'cell-center',
          Cell: ({ row }: { row: Row }) => {
            return (
              <>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        const data: any = row.original;
                        e.stopPropagation();
                        setCustomer({ ...data });
                        handleAdd();
                      }}
                      disabled={row.values?.isActive === false}
                    >
                      <EditTwoTone twoToneColor={row.values?.statusId === 2 ? theme.palette.secondary.main : theme.palette.primary.main} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </>
            );
          }
        }
      ] as Column[],
    []
  );

  // ----------------------- | API Call - Roles | ---------------------

  const { coconutHarvestList, error, isLoading, success } = useSelector((state) => state.coconutHarvest);

  useEffect(() => {
    dispatch(
      getCoconutHarvestByDate({
        direction: 'desc',
        page: 0,
        per_page: 10,
        search: '',
        sort: '_id',
        date: formik.values.harvestDate
      })
    );
  }, [success, formik.values.harvestDate]);

  useEffect(() => {
    if (!coconutHarvestList) {
      setCoconutHarvestList([]);
      return;
    }
    if (coconutHarvestList == null) {
      setCoconutHarvestList([]);
      return;
    }
    setCoconutHarvestList(coconutHarvestList?.result!);
  }, [coconutHarvestList]);

  useEffect(() => {
    if (error != null) {
      let defaultErrorMessage = 'ERROR';
      // @ts-ignore
      const errorExp = error as Template1Error;
      if (errorExp.message) {
        defaultErrorMessage = errorExp.message;
      }
      dispatch(
        openSnackbar({
          open: true,
          message: defaultErrorMessage,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
      dispatch(toInitialState());
    }
  }, [error]);

  useEffect(() => {
    if (success != null) {
      dispatch(
        openSnackbar({
          open: true,
          message: success,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      dispatch(toInitialState());
    }
  }, [success]);

  const isPaidByCoconuts = getFieldProps('isPaidByCoconuts');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MainCard content={false}>
        <Grid container spacing={3} sx={{ p: 2.5 }}>
          <Grid item xs={12} md={4.5}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="harvestDate"> Date</InputLabel>
              <TextField
                fullWidth
                id="harvestDate"
                type="date"
                placeholder="Enter Date"
                {...getFieldProps('harvestDate')}
                error={Boolean(touched.harvestDate && errors.harvestDate)}
                helperText={touched.harvestDate && errors.harvestDate}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="isPaidByCoconuts">
                <br />
              </InputLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isPaidByCoconuts || false}
                    value={formik.values.isPaidByCoconuts || false}
                    onChange={(e) => formik.setFieldValue('isPaidByCoconuts', e.target.checked || false)}
                    color="primary"
                  />
                }
                label="Paid By Coconuts"
              />
            </Stack>
          </Grid>
          {isPaidByCoconuts.value === false && (
            <Grid item xs={12} md={4.5}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="harvestFeeAmount"> Harvest Fee (Cash) </InputLabel>
                <TextField
                  fullWidth
                  id="harvestFeeAmount"
                  type="text"
                  placeholder="Enter Harvest Fee"
                  {...getFieldProps('harvestFeeAmount')}
                  error={Boolean(touched.harvestFeeAmount && errors.harvestFeeAmount)}
                  helperText={touched.harvestFeeAmount && errors.harvestFeeAmount}
                />
              </Stack>
            </Grid>
          )}
          {isPaidByCoconuts.value === true && (
            <Grid item xs={12} md={4.5}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="harvestFeeCoconut"> Harvest Fee (Coconuts) </InputLabel>
                <TextField
                  fullWidth
                  id="harvestFeeCoconut"
                  type="text"
                  placeholder="Enter Harvest Fee"
                  {...getFieldProps('harvestFeeCoconut')}
                  error={Boolean(touched.harvestFeeCoconut && errors.harvestFeeCoconut)}
                  helperText={touched.harvestFeeCoconut && errors.harvestFeeCoconut}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
        <ScrollX>
          <ReactTable
            columns={columns}
            getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
            data={coconutHarvestDataList}
            handleAddEdit={handleAdd}
          />
        </ScrollX>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ p: 2.5 }}>
          <Grid item></Grid>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                color="error"
                onClick={() => {
                  router(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="contained"
                disabled={isSubmitting}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {'Save'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      {add && (
        <Dialog
          maxWidth="sm"
          TransitionComponent={PopupTransition}
          keepMounted
          fullWidth
          onClose={handleAdd}
          open={add}
          sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
          aria-describedby="alert-dialog-slide-description"
        >
          <AddEditCoconutHarvest coconutHarvest={customer} onCancel={handleAdd} />
        </Dialog>
      )}
    </>
  );
};

export default CoconutHarvestManagementList;
