import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AddEmployee from "./pages/Admin/AddEmployee";
import Employees from "./pages/Admin/Employees";
import Register from "./pages/Users/Register";
import LeaveTypes from "./pages/Admin/LeaveTypes";
import ManageLeave from "./pages/Admin/ManageLeave";
import DashBoard from "./pages/Admin/DashBoard";
import AddLeaveType from "./pages/Admin/AddLeaveType";
import UserProfile from "./pages/Users/UserProfile";
import RequestLeave from "./pages/Users/RequestLeave";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage/> },
  { path : "/add_employee", element: <AddEmployee/>},
  { path : "/employees", element: <Employees/>},
  { path : "/register", element: <Register/>},
  { path : "/leave_types", element: <LeaveTypes/>},
  { path : "/add_leave_type", element: <AddLeaveType/>},
  { path : "/manage_leave", element: <ManageLeave/>},
  { path : "/dashboard", element: <DashBoard/>},
  { path : "/profile", element: <UserProfile/>},
  { path : "/request_leave", element: <RequestLeave/>},
]);

function App() {
  
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
