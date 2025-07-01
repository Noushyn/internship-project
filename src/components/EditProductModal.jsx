import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateProduct } from "../Store/productsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditProductModal = ({ open, product, onClose }) => {
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const productSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "نام محصول الزامی است"),
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
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        category: product.category,
        image: product.image,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    const result = await dispatch(updateProduct({ id: product.id, ...data }));
    console.log(product.id, data);
    if (updateProduct.fulfilled.match(result)) {
      toast.success("محصول با موفقیت ویرایش شد");
      onClose();
    } else {
      toast.error("ویرایش محصول موفقیت‌آمیز نبود");
    }
  };

  return (
    <Modal open={open} onClose={onClose} dir="rtl">
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mb={2}>
          ویرایش محصول
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="نام محصول"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="توضیحات"
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            label="دسته‌بندی"
            fullWidth
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          <TextField
            label="لینک تصویر"
            fullWidth
            {...register("image")}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
          <TextField
            label="قیمت (تومان)"
            type="number"
            fullWidth
            {...register("price", { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            label="موجودی"
            type="number"
            fullWidth
            {...register("stock", { valueAsNumber: true })}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />

          <Stack direction="row" sx={{ gap: 2 }} justifyContent={"flex-end"}>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              انصراف
            </Button>
            <Button variant="contained" type="submit">
              ذخیره
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
