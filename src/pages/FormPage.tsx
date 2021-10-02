import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const seriesMap = [
  { value: '1', label: 'シリーズ1' },
  { value: '2', label: 'シリーズ2' },
  { value: '3', label: 'シリーズ3' },
];

const FormPage: React.VFC = () => {
  const [series, setSeries] = useState('1');
  return (
    <Container>
      <Alert severity="warning">商品マスターの設定を見直してください</Alert>
      <Box sx={{ my: 1 }}>
        <TextField label="商品コード" variant="standard" sx={{ mr: 1 }} required />
        <TextField label="商品名" variant="standard" sx={{ mr: 1 }} error helperText="エラーです" />
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel>シリーズ</InputLabel>
          <Select value={series} onChange={(e) => setSeries(e.target?.value)}>
            {seriesMap.map((x) => (
              <MenuItem key={x.value} value={x.value}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ my: 1 }}>
        <FormControl variant="standard" sx={{ width: 300 }}>
          <InputLabel>シリーズ</InputLabel>
          <Select value={series} onChange={(e) => setSeries(e.target?.value)}>
            {seriesMap.map((x) => (
              <MenuItem key={x.value} value={x.value}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" size="small" sx={{ my: 1 }}>
        更新
      </Button>
    </Container>
  );
};

export default FormPage;
