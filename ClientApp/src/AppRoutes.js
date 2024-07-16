
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/edit',
    element: <Edit />
  },
  {
    path: '/new',
    element: <New />
  }
];

export default AppRoutes;
