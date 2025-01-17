import React, { useEffect, useMemo } from "react";
import {
  SoBox,
  SoContainer,
  SoCover,
  SoFlex,
  SoSection,
} from "../../components/styledcomponents/globalStyles";
import { Route, Routes, useNavigate } from "react-router-dom";
import { colorTokens } from "../../context/theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../store";
import SideBar from "../../components/layout/SideBar/SideBar";
import AdminRoutes from "../../routes/AdminRoutes";

const AdminPage = () => {
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(setMode("dark"));
  },[]);

  return (
    <SoFlex jc="unset" al="unset" w="100%" h="100vh">
      <SoBox w="300px">
        <SideBar />
      </SoBox>
      <SoBox w="100%">
        <SoContainer>
          <SoCover p='20px 50px 0 50px'>
           <AdminRoutes/>
          </SoCover>
        </SoContainer>
      </SoBox>
    </SoFlex>
  );
};

export default AdminPage;
