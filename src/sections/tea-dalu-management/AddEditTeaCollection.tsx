// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { dispatch } from 'store';

// assets
import { createBooktransfer, toInitialState, updateBooktransfer } from 'store/reducers/tea-collection';
import { useEffect } from 'react';

// types

// constant
const getInitialValues = (booktransfer: FormikValues | null) => {
  const newBooktransfer = {
    bookId: '',
    code: '',
    collectedDate: new Date().toISOString().split('T')[0],
    subTotalKg: '',
    totalKg: '',
    minusKg: ''
  };

  if (booktransfer) {
    return _.merge({}, newBooktransfer, {
      ...booktransfer,
      categoryId: booktransfer.bmBook?.categoryId
    });
  }

  return newBooktransfer;
};

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export interface Props {
  booktransfer?: any;
  onCancel: () => void;
}

const AddEditTransferBook = ({ booktransfer, onCancel }: Props) => {
  console.log(booktransfer);

  const BooktransferSchema = Yup.object().shape({
    collectedDate: Yup.string().max(255).required('Borrow date is required'),
    totalKg: Yup.string().max(255).required('Borrow person is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(booktransfer!),
    validationSchema: BooktransferSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        if (booktransfer) {
          dispatch(updateBooktransfer(values));
        } else {
          dispatch(
            createBooktransfer({
              code: values.code,
              collectedDate: values.collectedDate,
              totalKg: values.totalKg,
              minusKg: values.minusKg,
              subTotalKg: values.subTotalKg
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

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{booktransfer ? 'Edit Borrow Details' : 'New Borrow Details'}</DialogTitle>
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
                    <InputLabel htmlFor="collectedDate">Collected Date</InputLabel>
                    <TextField
                      fullWidth
                      id="collectedDate"
                      type="date"
                      placeholder="Enter Collected Date"
                      {...getFieldProps('collectedDate')}
                      error={Boolean(touched.collectedDate && errors.collectedDate)}
                      helperText={touched.collectedDate && errors.collectedDate}
                    />
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
                    <InputLabel htmlFor="minusKg">Minus (KG)</InputLabel>
                    <TextField
                      fullWidth
                      id="minusKg"
                      type="text"
                      placeholder="Enter Minus (KG)"
                      {...getFieldProps('minusKg')}
                      error={Boolean(touched.minusKg && errors.minusKg)}
                      helperText={touched.minusKg && errors.minusKg}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="subTotalKg">Sub Total (KG)</InputLabel>
                    <TextField
                      fullWidth
                      id="subTotalKg"
                      type="text"
                      InputProps={{ readOnly: true }}
                      placeholder="Enter Sub Total (KG)"
                      {...getFieldProps('subTotalKg')}
                      error={Boolean(touched.subTotalKg && errors.subTotalKg)}
                      helperText={touched.subTotalKg && errors.subTotalKg}
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
                      {booktransfer ? 'Edit' : 'Add'}
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
