import HomePage from "pages/users/homePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import { ROUTERS } from "./utils/router";
import { Route, Routes } from "react-router-dom";
import Service from "pages/users/Service";
import HomePageClinic from "pages/clinic/homePage";
import MasterClinicLayout from "./pages/clinic/theme/masterLayout";
import LoginPage from "component/loginpage";
import HomeAdminPage from "pages/admin/homePage";
import MasterAdminLayout from "pages/admin/theme/masterLayout";
import PendingClinicsPage from "pages/admin/PendingClinicsPage";
import ViewHomePages from "pages/users/ViewHomePages";
import ClinicDetail from "pages/users/ClinicDetail";
import ViewHistoryBooking from "pages/users/ViewHistoryBooking/ViewHistoryBooking";
import ViewBookingSchedule from "pages/clinic/homePage";
import RegisterClinic from "pages/users/RegisterClinic";
import RegisterPage from "component/RegisterPage";
import DetailAdmin from "pages/admin/DetailAdmin";
import ScheduleManagement from "pages/clinic/ScheduleManagement";
import AdminDashboard from "pages/admin/AdminDashBoard";
import DownloadApp from "component/DownloadApp";
import AdminFeedbackPage from "pages/admin/AdminFeedbackPage";
function renderUserRouter() {    const userRouters=[
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.SERVICE,
            component: <Service />,
        },
        {
            path: ROUTERS.USER.RegisterClinic,
            component: <RegisterClinic />,
        },
        {
            path: ROUTERS.USER.ViewHomePages,
            component: <ViewHomePages />,
        },
        {
          path: "/clinics/:id",  
          component: <ClinicDetail />,
        },
        {
          path: ROUTERS.USER.ViewHistoryBooking,  
          component: <ViewHistoryBooking />,
        },
        {
          path: ROUTERS.USER.DownloadApp,  
          component: <DownloadApp />,
        },
        
    ];
    return(
        <MasterLayout>
        <Routes>
            {userRouters.map((item, key )=>(
                    <Route key={key} path={item.path} element={item.component} />
                ))}
        </Routes>
        </MasterLayout>
    );
}
function renderClinicRouter() {
    const clinicRouters = [
        {
            path: ROUTERS.CLINIC.ViewBookingSchedule,
            component: <ViewBookingSchedule />,
        },
        {
            path: ROUTERS.CLINIC.ScheduleManagement,
            component: <ScheduleManagement />,
        },
        
        // Add more manager routes here if needed
    ];

    return (
        <MasterClinicLayout>
            <Routes>
                {clinicRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MasterClinicLayout>
    );
}



function renderAdminRouter() {
    const adminRouters = [
        {
            path: ROUTERS.ADMIN.HomeAdminPage,
            component: <HomeAdminPage/>,
        },
        {
            path: ROUTERS.ADMIN.PendingClinicsPage,
            component: <PendingClinicsPage/>,
        },
        {
            path: ROUTERS.ADMIN.DetailAdmin,
            component: <DetailAdmin/>,
        },
        {
            path: ROUTERS.ADMIN.AdminDashboard,
            component: <AdminDashboard/>,
        },
        {
            path: ROUTERS.ADMIN.AdminFeedbackPage,
            component: <AdminFeedbackPage/>,
        },
        // Add more manager routes here if needed
    ];

    return (
        <MasterAdminLayout>
            <Routes>
                {adminRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MasterAdminLayout>
    );
}


const RouterCustom = () => {
    return (
        <Routes>
             <Route path="/login" element={<LoginPage />} />
             <Route path="/RegisterPage" element={<RegisterPage />} />

       
             {/* Dùng dấu * để bắt tất cả đường dẫn con */}
             <Route path="/clinic/*" element={renderClinicRouter()} />
       
             {/* Tất cả các route khác là của user */}
             <Route path="/*" element={renderUserRouter()} />
             <Route path="/admin/*" element={renderAdminRouter()} />
           </Routes>
    );
};
export default RouterCustom;