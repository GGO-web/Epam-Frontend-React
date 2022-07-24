import React from "react";

import {
   BrowserRouter as Router,
   Route,
   Routes,
   Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import "./App.css";

import Courses from "./components/Courses/Courses";
import Registration from "./components/Registration/Registration";
import Error404 from "./components/Error404/Error404";
import Login from "./components/Login/Login";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CourseForm from "./components/CourseForm/CourseForm";
import Header from "./components/Header/Header";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";

function App() {
   const user = useSelector((state) => state.user);

   return (
      <Router>
         <Routes>
            <Route
               path="/registration"
               element={<Registration></Registration>}
            ></Route>

            <Route
               path="/"
               element={
                  user.token ? (
                     <Courses></Courses>
                  ) : (
                     <Navigate to="/login"></Navigate>
                  )
               }
            ></Route>

            <Route
               path="/courses"
               element={
                  user.token ? (
                     <Courses></Courses>
                  ) : (
                     <Navigate to="/login"></Navigate>
                  )
               }
            ></Route>

            <Route
               path="/courses/:courseID"
               element={
                  user.token ? (
                     <CourseInfo></CourseInfo>
                  ) : (
                     <Navigate to="/login"></Navigate>
                  )
               }
            ></Route>

            <Route element={<PrivateRouter path="/courses"></PrivateRouter>}>
               <Route
                  path="/courses/add"
                  element={
                     user.token ? (
                        <>
                           <Header></Header>

                           <main className="main container">
                              <div className="course">
                                 <CourseForm></CourseForm>
                              </div>
                           </main>
                        </>
                     ) : (
                        <Navigate to="/login"></Navigate>
                     )
                  }
               ></Route>

               <Route
                  path="/courses/update/:courseID"
                  element={
                     user.token ? (
                        <>
                           <Header></Header>

                           <main className="main container">
                              <div className="course">
                                 <CourseForm isUpdate="true"></CourseForm>
                              </div>
                           </main>
                        </>
                     ) : (
                        <Navigate to="/login"></Navigate>
                     )
                  }
               ></Route>
            </Route>

            <Route
               path="/login"
               element={
                  user.token ? (
                     <Navigate to="/courses"></Navigate>
                  ) : (
                     <Login></Login>
                  )
               }
            ></Route>

            <Route path="*" element={<Error404></Error404>}></Route>
         </Routes>
      </Router>
   );
}

export default App;
