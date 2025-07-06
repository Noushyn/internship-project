import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsBySearch } from "../Store/productsSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Box,
  TextField,
  Stack,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, total, loading, error } = useSelector(
    (state) => state.products
  );

  const [page, setPage] = useState(1);
  const limit = 8;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
  }, [dispatch, page]);

  const pageCount = Math.ceil(total / limit);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Typography color="error">خطا در دریافت اطلاعات: {error}</Typography>
    );
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    await dispatch(fetchProductsBySearch(searchTerm));
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }} dir="rtl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" gutterBottom align="center">
            محصولات
          </Typography>
          <Stack direction="row" sx={{ width: "fit-content" }}>
            <TextField
              size="small"
              variant="outlined"
              value={searchTerm}
              placeholder="جستجو محصولات..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": {
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              جستجو
            </Button>
          </Stack>
        </Stack>

        {Array.isArray(products) && products.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mt: 8 }}
          >
            محصولی یافت نشد.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products &&
              products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <Box sx={{ height: "100%", display: "flex" }}>
                    <Card
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="240"
                        image={product.image}
                        alt={product.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                        <Box
                          sx={{
                            mt: 4,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle2">
                            موجودی: {product.stock}
                          </Typography>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {product.price.toLocaleString()} تومان
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
          </Grid>
        )}
        <Stack spacing={2} dir="ltr" sx={{ m: 4 }} alignItems="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        </Stack>
      </Container>
    </>
  );
};

export default ProductsPage;
