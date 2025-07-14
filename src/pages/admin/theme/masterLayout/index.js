import Footer from "../footer";
import Header from "../header";
const MasterAdminLayout = ({children, ...props}) =>{
    return (

        <div {...props}>
            <Header />
            {children}
            < Footer/>

        </div>
);
};
export default (MasterAdminLayout);