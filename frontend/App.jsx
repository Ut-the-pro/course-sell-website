import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Landing from './Landing';
import {Admincourses} from './Admincourses';
import Addcourse from './Addcourse';
import Courses from './Courses';
import Updatecourse from './Updatecourse';
import {RecoilRoot} from 'recoil';

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/courses" element={<Admincourses />} />
          <Route path="/admin/addcourse" element={<Addcourse />} />
          <Route path="/admin/update/:courseId" element={<Updatecourse />} />
          <Route path="/users/courses" element={<Courses />} />  
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App
