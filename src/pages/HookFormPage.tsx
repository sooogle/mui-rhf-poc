import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { showMessage } from '../components/message';

const seriesMap = [
  { value: '1', label: 'シリーズ1' },
  { value: '2', label: 'シリーズ2' },
  { value: '3', label: 'シリーズ3' },
];

// @hookform/resolversの2.8.1にはバグがある
// https://github.com/react-hook-form/resolvers/issues/245
const schema = yup
  .object({
    productCode: yup.string().required(),
    productName: yup.string().required(),
    series: yup.string().defined(),
  })
  .required();

type ProductForm = {
  productCode: string;
  productName: string;
  series: string | null;
};

const HookFormPage: React.VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      productCode: 'HOGE',
      productName: '',
      series: '1',
    },
  });
  const onSubmit = (values: ProductForm) => {
    console.log(values);
    showMessage('入力された内容にエラーがあります', 'error');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ my: 1 }}>
        <Controller
          name="productCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="商品コード"
              variant="standard"
              sx={{ mr: 1 }}
              error={!!errors.productCode}
              helperText={errors.productCode?.message}
              required
            />
          )}
        />
        <Controller
          name="productName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="商品名"
              variant="standard"
              sx={{ mr: 1 }}
              error={!!errors.productName}
              helperText={errors.productName?.message}
              required
            />
          )}
        />
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel>シリーズ</InputLabel>
          <Controller
            name="series"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {seriesMap.map((x) => (
                  <MenuItem key={x.value} value={x.value}>
                    {x.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Button type="submit" variant="contained" size="small" sx={{ my: 1 }}>
        登録
      </Button>
    </form>
  );
};

export default HookFormPage;
