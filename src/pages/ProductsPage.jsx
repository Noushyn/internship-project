import { useEffect } from 'react';
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Store/productsSlice';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Box
} from '@mui/material';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Typography color="error">خطا در دریافت اطلاعات: {error}</Typography>;
  }

  return (
    <>
    <Navbar />
        <Container sx={{ mt: 4 }} dir="rtl">
      <Typography variant="h4" gutterBottom align="center">
        محصولات
      </Typography>

      <Grid container spacing={3}>
  {products && products.map((product) => (
    <Grid item size={{ xs: 12 ,sm: 6, md: 4 , lg: 3}} key={product.id}>
      <Box sx={{ height: "100%", display: "flex" }}>
        <Card sx={{ width: "100%", display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: 6,
      }, }}>
          <CardMedia
            component="img"
            height="240"
            image={product.image}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            {/* <Typography variant="subtitle2" sx={{ mt: 1 }}>
              دسته‌بندی: {product.category}
            </Typography> */}
            <Box sx={{ mt:4 , display: 'flex' , flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant="subtitle2">
              موجودی: {product.stock}
            </Typography>
            <Typography sx={{ fontWeight: 'bold'}}>
               {product.price.toLocaleString()} تومان
            </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  ))}
</Grid>

    </Container>
    
    </>

  );
};

export default ProductsPage;

