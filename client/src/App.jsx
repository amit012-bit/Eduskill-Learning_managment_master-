import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from "./Pages/HomePage"
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import CheckOut from './Pages/Payment/CheckOut'
import CheckOutSucess from './Pages/Payment/CheckOutSucess'
import CheckOutFail from './Pages/Payment/CheckOutFail'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/about' element={<AboutUs />}></Route>

        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route path='/courses' element={<CourseList />}></Route>
        <Route path='/course/description' element={<CourseDescription />}></Route>

        <Route path='/contact' element={<Contact />}></Route>

        <Route path='/denied' element={<Denied />}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/user/profile' element={<Profile />}></Route>
          <Route path='/user/editprofile' element={<EditProfile />}></Route>
          <Route path='/checkout' element={<CheckOut />}></Route>
          <Route path='/checkout/success' element={<CheckOutSucess />}></Route>
          <Route path='/checkout/fail' element={<CheckOutFail />}></Route>
          <Route path='/course/displaylecture' element={<DisplayLectures />}></Route>
        </Route>


        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
