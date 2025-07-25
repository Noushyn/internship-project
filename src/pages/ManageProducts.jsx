import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Store/productsSlice";
import { useEffect, useState } from "react";
import { addProduct } from "../Store/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteProduct } from "../Store/productsSlice";
import EditProductModal from "../components/EditProductModal";

const productSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  image: z.string().url("لینک تصویر معتبر نیست"),
  price: z
    .number({ invalid_type_error: "قیمت باید عدد باشد" })
    .min(1, "قیمت الزامی است"),
  stock: z
    .number({ invalid_type_error: "موجودی باید عدد باشد" })
    .min(0, "موجودی الزامی است"),
});

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onsubmit = (data) => {
    dispatch(addProduct(data));
    toast.success("محصول با موفقیت اضافه شد");
    reset();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("آیا از حذف محصول مطمئن هستی؟");
    if (!confirmed) return;

    try {
      const result = await dispatch(deleteProduct(id));
      if (deleteProduct.fulfilled.match(result)) {
        toast.success("محصول با موفقیت حذف شد");
      } else {
        throw new Error(result.payload || "حذف انجام نشد");
      }
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      price: "",
      stock: "",
    },
  });

  return (
    <>
      <Navbar />
      <Container>
        <Box dir="rtl">
          <Typography variant="h5" gutterBottom>
            مدیریت محصولات
          </Typography>

          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onsubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="نام محصول"
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid size={8}>
                  <TextField
                    label="توضیحات"
                    fullWidth
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="دسته‌بندی"
                    fullWidth
                    {...register("category")}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="قیمت (تومان)"
                    type="number"
                    fullWidth
                    {...register("price", { valueAsNumber: true })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="موجودی"
                    type="number"
                    fullWidth
                    {...register("stock", { valueAsNumber: true })}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="لینک تصویر"
                    fullWidth
                    {...register("image")}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                  />
                </Grid>

                <Grid
                  size={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    افزودن محصول
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Typography sx={{ mt: 4 }} variant="h6" gutterBottom>
            لیست محصولات
          </Typography>
          <Box sx={{ maxHeight: 500, overflowY: "auto", mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    نام محصول
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    تصویر
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    قیمت
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    دسته بندی
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    موجودی
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell align="center">{p.title}</TableCell>
                      <TableCell align="center">
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {p.price.toLocaleString()} تومان
                      </TableCell>
                      <TableCell align="center">{p.category}</TableCell>
                      <TableCell align="center">{p.stock}</TableCell>
                      <TableCell align="center">
                        <Button size="small" onClick={() => handleEdit(p)}>
                          ویرایش
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(p.id)}
                        >
                          حذف
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>

          <EditProductModal
            open={editModalOpen}
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        </Box>
      </Container>
    </>
  );
};

export default ManageProducts;
