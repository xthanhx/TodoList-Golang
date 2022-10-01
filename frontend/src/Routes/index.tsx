import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutDefault from "../Layouts";
import { lazy, Suspense} from 'react';

const HomePage = lazy(() => import('../Pages/Home'));
const TodoPage = lazy(() => import('../Pages/Todo'));

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'todo',
    element: <TodoPage />
  }
]

const Rooter = () => {
  return (
    <BrowserRouter>
      <LayoutDefault>
        <Routes>
          {routes.map(({element, path}, index) => (
            <Route
              key={index}
              path={path}
              element={
                <Suspense>
                  {element}
                </Suspense>
              }
            />
          ))}
        </Routes>
      </LayoutDefault>
    </BrowserRouter>
  );
}

export default Rooter;