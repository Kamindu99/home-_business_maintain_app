// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { dispatch } from 'store';

// assets
import { createTeaMoney, toInitialState, updateTeaMoney } from 'store/reducers/tea-money';
import { useEffect } from 'react';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';

// types

// constant
const getInitialValues = (teaMoney: FormikValues | null) => {
  const newTeaMoney = {
    teaMoneyId: '',
    code: '',
    depositedDate: new Date().toISOString().split('T')[0],
    totalKg: '',
    month: '',
    amount: '',
    imageUrl: ''
  };

  if (teaMoney) {
    return _.merge({}, newTeaMoney, {
      ...teaMoney,
      categoryId: teaMoney.bmBook?.categoryId
    });
  }

  return newTeaMoney;
};

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export interface Props {
  teaMoney?: any;
  onCancel: () => void;
}

const AddEditTransferBook = ({ teaMoney, onCancel }: Props) => {
  console.log(teaMoney);

  const TeaMoneySchema = Yup.object().shape({
    depositedDate: Yup.string().max(255).required('Borrow date is required'),
    totalKg: Yup.string().max(255).required('Borrow person is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(teaMoney!),
    validationSchema: TeaMoneySchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        if (teaMoney) {
          dispatch(updateTeaMoney(values));
        } else {
          dispatch(
            createTeaMoney({
              code: values.code,
              depositedDate: values.depositedDate,
              totalKg: values.totalKg,
              imageUrl: values.imageUrl,
              month: values.month,
              amount: values.amount
            })
          );
        }
        resetForm();
        getInitialValues(null);
        dispatch(toInitialState());
        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const minusKg = getFieldProps('minusKg');
  const totalKg = getFieldProps('totalKg');

  useEffect(() => {
    if (totalKg.value && minusKg.value) {
      const subTotal = parseFloat(totalKg.value) - parseFloat(minusKg.value);
      formik.setFieldValue('subTotalKg', subTotal.toString());
    }
  }, [totalKg.value, minusKg.value]);

  const month = [
    { _id: 'January', monthName: 'January' },
    { _id: 'February', monthName: 'February' },
    { _id: 'March', monthName: 'March' },
    { _id: 'April', monthName: 'April' },
    { _id: 'May', monthName: 'May' },
    { _id: 'June', monthName: 'June' },
    { _id: 'July', monthName: 'July' },
    { _id: 'August', monthName: 'August' },
    { _id: 'September', monthName: 'September' },
    { _id: 'October', monthName: 'October' },
    { _id: 'November', monthName: 'November' },
    { _id: 'December', monthName: 'December' }
  ];

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{teaMoney ? 'Edit Payment Details' : 'New Payment Details'}</DialogTitle>
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="code">Code</InputLabel>
                    <TextField
                      fullWidth
                      id="code"
                      type="text"
                      placeholder="Enter Code"
                      {...getFieldProps('code')}
                      error={Boolean(touched.code && errors.code)}
                      helperText={touched.code && errors.code}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="month">Month</InputLabel>
                    <TextField
                      fullWidth
                      id="month"
                      select
                      placeholder="Enter Month"
                      {...getFieldProps('month')}
                      error={Boolean(touched.month && errors.month)}
                      helperText={touched.month && errors.month}
                    >
                      {month?.map((month) => (
                        <MenuItem key={month._id} value={month._id}>
                          {month.monthName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="totalKg"> Total (KG)</InputLabel>
                    <TextField
                      fullWidth
                      id="totalKg"
                      type="text"
                      placeholder="Enter Total (KG)"
                      {...getFieldProps('totalKg')}
                      error={Boolean(touched.totalKg && errors.totalKg)}
                      helperText={touched.totalKg && errors.totalKg}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="depositedDate">Deposited Date</InputLabel>
                    <TextField
                      fullWidth
                      id="depositedDate"
                      type="date"
                      placeholder="Enter Deposited Date"
                      {...getFieldProps('depositedDate')}
                      error={Boolean(touched.depositedDate && errors.depositedDate)}
                      helperText={touched.depositedDate && errors.depositedDate}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <TextField
                      fullWidth
                      id="amount"
                      type="text"
                    //  InputProps={{ readOnly: true }}
                      placeholder="Enter Amount"
                      {...getFieldProps('amount')}
                      error={Boolean(touched.amount && errors.amount)}
                      helperText={touched.amount && errors.amount}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="imageUrl">Image Url</InputLabel>
                    <SingleFileUpload
                      sx={{ width: '100%' }}
                      //@ts-ignore
                      file={formik.values.imageUrl!}
                      setFieldValue={formik.setFieldValue}
                      error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item></Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {teaMoney ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
};

export default AddEditTransferBook;
