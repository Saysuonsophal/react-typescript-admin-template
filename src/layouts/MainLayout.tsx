
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <p className="text-center font-bold text-3xl m-3">Header</p>
      {/* Noted: children parameter is our Page(Home, Product and Basic) */}
      {/* {children} */}

      {/* other Way */}
      <Outlet />
      <p className="text-center font-bold text-3xl m-3">Footer</p>
    </div>
  );
}

export default MainLayout;
