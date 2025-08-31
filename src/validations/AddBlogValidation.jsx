import * as yup from "yup";

const AddBlogValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  except: yup.string().max(150, "Except must be at most 150 characters"),
  category: yup.string().required("Category is required"),
  author: yup.string().required("Author is required"),
  date: yup.date().required("Date is required"),
});
export default AddBlogValidationSchema;
