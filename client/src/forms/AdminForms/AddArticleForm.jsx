import React, { useRef } from "react";
import ReactQuill from "react-quill";
import { NavText, SoContainer, SoCover, SoFlex, SoForm, SoSubTitle, SoTitle, SoTypography } from "../../components/styledcomponents/globalStyles";
import SoInput from "../../components/common/SoInput";
import SoButton from "../../components/common/SoButton";
import SoTextArea from "../../components/common/SoTextArea";
import axios from 'axios';
import { Formik } from "formik";
import * as yup from "yup";
import "react-quill/dist/quill.snow.css"; // import Quill's styles
import { colorTokens } from "../../context/theme/theme";

const AddArticleForm = () => {
  const fileInputRef = useRef(null);

  const initialValues = {
    title: "",
    shortTitle: "",
    author: "",
    shortDesc: "",
    LongDesc: "", // Initially an empty string
    category: "",
    image: null,
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    shortTitle: yup.string().required("Short Title is required"),
    author: yup.string().required("Author is required"),
    shortDesc: yup.string().required("Short description is required"),
    LongDesc: yup.string().required("Long description is required"),
    category: yup.string().required("Category is required"),
    image: yup.mixed().required("Image is required").test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      resetForm();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("There was an error uploading the article!", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditorChange = (value) => {
    console.log(value);  // Log the HTML content from the React Quill editor
  };

  return (
    <SoContainer>
      <SoCover p="15px 50px 25px 50px">
        <SoSubTitle>Add new article</SoSubTitle>
      </SoCover>
      <SoCover p="0px 80px" w="100%">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <SoForm onSubmit={handleSubmit}>
              <SoFlex dir="column" gap="2rem">
                <SoFlex w="100%" gap="2rem">
                  <SoInput
                    value={values.title}
                    err={touched.title && errors.title}
                    helperText={touched.title && errors.title}
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Title"
                  />
                  <SoInput
                    value={values.shortTitle}
                    err={touched.shortTitle && errors.shortTitle}
                    helperText={touched.shortTitle && errors.shortTitle}
                    name="shortTitle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Short Title"
                  />
                  <SoInput
                    value={values.author}
                    err={touched.author && errors.author}
                    helperText={touched.author && errors.author}
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Author"
                  />
                </SoFlex>
                <SoFlex w="100%" gap="2rem">
                  <SoInput
                    value={values.category}
                    err={touched.category && errors.category}
                    helperText={touched.category && errors.category}
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Category"
                  />
                  <SoInput
                    value={values.shortDesc}
                    err={touched.shortDesc && errors.shortDesc}
                    helperText={touched.shortDesc && errors.shortDesc}
                    name="shortDesc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Short Description"
                  />
                </SoFlex>
                <SoFlex dir="column" gap="2rem" w='100%'>
                    <ReactQuill
                      style={{width:'100%'}}
                      value={values.LongDesc}
                      onChange={(value) => {
                        setFieldValue("LongDesc", value);  // Store the HTML content in Formik's state
                        handleEditorChange(value);  // Log HTML content
                      }}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["bold", "italic", "underline"],
                          ["blockquote", "code-block"],
                          [{ align: [] }],
                          ["link", "image"],
                        ],
                      }}
                    />
                  <SoFlex dir='column' gap='0.5rem' al='left' w='100%'>
                  <SoTypography fs='clamp(.75rem, 5vw, 1.25rem)' color={colorTokens.drops[300]}>Thumbnail</SoTypography>
                  <SoInput
                    name="image"
                    type="file"
                    onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                    onBlur={handleBlur}
                    err={touched.image && errors.image}
                    helperText={touched.image && errors.image}
                    ref={fileInputRef}
                  />
                  </SoFlex>
                </SoFlex>
                <SoButton type="submit">Upload</SoButton>
              </SoFlex>
            </SoForm>
          )}
        </Formik>
      </SoCover>
    </SoContainer>
  );
};

export default AddArticleForm;
