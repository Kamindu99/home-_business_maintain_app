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
import { useEffect } from 'react';
import { createSingleCoconutHarvest, toInitialState, updateCoconutHarvest } from 'store/reducers/coconut-harvest';

// types

// constant
const getInitialValues = (coconutHarvest: FormikValues | null) => {
  const newTeaMoney = {
    coconutHarvestId: '',
    code: '',
    name: '',
    totalCoconuts: 0
  };

  if (coconutHarvest) {
    return _.merge({}, newTeaMoney, {
      ...coconutHarvest,
      categoryId: coconutHarvest.bmBook?.categoryId
    });
  }

  return newTeaMoney;
};

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export interface Props {
  coconutHarvest?: any;
  onCancel: () => void;
}

const AddEditTransferBook = ({ coconutHarvest, onCancel }: Props) => {
  console.log(coconutHarvest);

  const TeaMoneySchema = Yup.object().shape({
    depositedDate: Yup.string().max(255).required('Borrow date is required'),
    totalKg: Yup.string().max(255).required('Borrow person is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(coconutHarvest!),
    validationSchema: TeaMoneySchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        if (coconutHarvest) {
          dispatch(updateCoconutHarvest(values));
        } else {
          dispatch(
            createSingleCoconutHarvest({
              code: values.code,
              name: values.name,
              totalCoconuts: values.totalCoconuts
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
            <DialogTitle>{coconutHarvest ? 'Edit Payment Details' : 'New Payment Details'}</DialogTitle>
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
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextField
                      fullWidth
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="totalCoconuts"> Total Coconuts</InputLabel>
                    <TextField
                      fullWidth
                      id="totalCoconuts"
                      type="text"
                      placeholder="Enter Total Coconuts"
                      {...getFieldProps('totalCoconuts')}
                      error={Boolean(touched.totalCoconuts && errors.totalCoconuts)}
                      helperText={touched.totalCoconuts && errors.totalCoconuts}
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
                      {coconutHarvest ? 'Edit' : 'Add'}
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
