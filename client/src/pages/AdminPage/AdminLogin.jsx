import React, { useEffect, useMemo } from "react";
import {
  NavText,
  SoBox,
  SoCenterContainer,
  SoFlex,
  SoForm,
  SoImg,
  SoSubTitle,
  SoTitle,
  SoTypography,
} from "../../components/styledcomponents/globalStyles";
import { colorTokens } from "../../context/theme/theme";
import CoverImg from "../../../public/assets/images/admin/login/cover.jpg";
import SoInput from "../../components/common/SoInput";
import SoButton from "../../components/common/SoButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ControlCameraOutlinedIcon from "@mui/icons-material/ControlCameraOutlined";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminLogin, setMode } from "../../store";

import { Formik } from "formik";
import * as yup from "yup";
import { encryptReq } from "../../utlis/EncryptionReq";
import axios from 'axios';
import { decryptReq } from "../../utlis/DecryptionReq";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.shopping.adminLogin);
  const navigate = useNavigate();


  useMemo(() => {
    dispatch(setMode("dark"));
  }, []);

  useEffect(() => {
    if (adminLogin) {
      navigate('/admin/post');
    }
  }, [adminLogin, navigate]);

  const shadow = `inset 0 0 0.5px 1px hsla(0, 0%,  
        100%, 0.075),
        0 0 0 1px hsla(0, 0%, 0%, 0.05),
        0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
        0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
        0 3.5px 6px hsla(0, 0%, 0%, 0.09)`;

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 character")
      .matches(passwordRules, { message: "Please create a stronger password" }),
  });



  const handleSubmit = async (values, onSubmitProps) => {
    console.log(values);
    const encryptData = encryptReq(values);
    console.log(encryptData)

    const adminLoginResponse = await axios.post('http://localhost:6060/silo_blog/admin_login', {data: encryptData});
    console.log(adminLoginResponse);
    const decryptData = decryptReq(adminLoginResponse.data.data)
    console.log(decryptData)
    dispatch(setAdminLogin(decryptData.message))
    if(decryptData.message) {
      navigate('/admin/post')
    } else {
      
    }
    onSubmitProps.resetForm();
  };

  return (
    <SoCenterContainer bg="#000000db">
      <SoFlex bs={shadow} bg={colorTokens.drops[1000]}>
        <SoBox className="relative" w="550px" h="550px">
          <SoImg
            style={{ transform: "rotateY(180deg)" }}
            width="100%"
            src={CoverImg}
          />
          <SoFlex
            al="center"
            className="absolute top-2 left-2"
            bg="transparent"
            gap="10px"
          >
            <ControlCameraOutlinedIcon
              style={{ color: `${colorTokens.drops[400]}`, fontSize: "2.5rem" }}
            />
            <SoSubTitle fs="22px" ls="1.5px" color={colorTokens.drops[400]}>
              BLACK CMS
            </SoSubTitle>
          </SoFlex>
        </SoBox>
        <SoBox w="550px" h="550px">
          <SoFlex bg="transparent" w="100%" dir="column" gap="1rem">
            <SoFlex bg="transparent" w="100%" dir="column">
              <AdminPanelSettingsIcon
                style={{
                  color: `${colorTokens.drops[500]}`,
                  fontSize: "4.75rem",
                }}
              />
              <SoSubTitle color={colorTokens.drops[300]} ls="10px">
                LOGIN
              </SoSubTitle>
            </SoFlex>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                errors,
                resetForm,
              }) => (
                <SoForm onSubmit={handleSubmit}>
                  <SoFlex
                    p="0px 50px"
                    dir="column"
                    bg="transparent"
                    w="100%"
                    gap="1.5rem"
                  >
                    <SoInput
                      placeholder="Email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={touched.email && errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <SoInput
                      placeholder="Password"
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={touched.password && errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <SoButton type="submit" width="100%">
                      LOGIN
                    </SoButton>
                  </SoFlex>
                </SoForm>
              )}
            </Formik>
          </SoFlex>
        </SoBox>
      </SoFlex>
    </SoCenterContainer>
  );
};

export default AdminLogin;
