import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Pages/Home/Home.jsx';
import AboutUs from './Pages/About/AboutUs.jsx';
import Doner from './Pages/About/Doner.jsx';
import History from './Pages/About/History.jsx';
import Vision from './Pages/About/Vision.jsx';
import CampusTour from './Pages/About/CampusTour.jsx';
import Achivements from './Pages/About/Achivements.jsx';
import Chairman from './Pages/About/Chairman.jsx';
import Committee from './Pages/About/Committee.jsx';
import Principal from './Pages/About/Principle.jsx';
import Administrator from './Pages/About/Administrator.jsx';
import Academic from './Pages/Academic/Academic.jsx';
import Teachers from './Pages/Academic/Teachers.jsx';
import Staffs from './Pages/Academic/Staffs.jsx';
import AcademicCalender from './Pages/Academic/AcademicCalender.jsx';
import AttendanceSheet from './Pages/Academic/AttendanceSheet.jsx';
import LeaveInfo from './Pages/Academic/LeaveInfo.jsx';
import Admission from './Pages/Admission/Admission.jsx';
import Study from './Pages/Admission/Study.jsx';
import Apply from './Pages/Admission/Apply.jsx';
import AdmissionTest from './Pages/Admission/AdmissionTest.jsx';
import Policy from './Pages/Admission/Policy.jsx';
import RegistrationSystem from './Pages/Admission/RegistrationSystem.jsx';
import Student from './Pages/Student/Student.jsx';
import StudentList from './Pages/Student/StudentList.jsx';
import TutionFees from './Pages/Student/TutionFees.jsx';
import MobileBanking from './Pages/Student/MobileBanking.jsx';
import DailyActivities from './Pages/Student/DailyActivities.jsx';
import ExamSchedule from './Pages/Student/ExamSchedule.jsx';
import StudentUniform from './Pages/Student/StudentUniform.jsx';
import ExamSystem from './Pages/Student/ExamSystem.jsx';
import Rules from './Pages/Student/Rules.jsx';
import Facility from './Pages/Facility/Facility.jsx';
import Library from './Pages/Facility/Library.jsx';
import PlayGround from './Pages/Facility/PlayGround.jsx';
import Physics from './Pages/Facility/Physics.jsx';
import Biology from './Pages/Facility/Biology.jsx';
import Ict from './Pages/Facility/Ict.jsx';
import Chemistry from './Pages/Facility/Chemistry.jsx';
import CoCurricular from './Pages/Facility/CoCurricular.jsx';
import Others from './Pages/Others/Others.jsx';
import Notice from './Pages/Others/Notice.jsx';
import News from './Pages/Others/News.jsx';
import Gallery from './Pages/Others/Gallery.jsx';
import Routine from './Pages/Others/Routine.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Result from './Pages/Result/Result.jsx';
import AcademicResult from './Pages/Result/AcademicResult.jsx';
import Evaluation from './Pages/Result/Evaluation.jsx';
import ExCommittee from './Pages/About/ExCommittee.jsx';
import AcademicRules from './Pages/Academic/AcademicRules.jsx';
import Details from './Pages/Academic/Details.jsx';
import StaffDetails from './Pages/Academic/StaffDetails.jsx';
import DetailsNotice from './Pages/Others/DetailsNotice.jsx';
import DetailsNews from './Pages/Others/DetailsNews.jsx';
import Video from './Pages/Others/Video.jsx';
import CommDetails from './Pages/About/CommDetails.jsx';
import ExCommDetails from './Pages/About/ExCommDetails.jsx';
import Event from './Pages/Others/Event.jsx';
import DetailsEvents from './Pages/Others/DetailsEvents.jsx';
import GalleryEvents from './Pages/Others/GalleryEvents.jsx';
import DetailsAchieve from './Pages/About/DetailsAchieve.jsx';
import SchoolSchedule from './Pages/Others/SchoolSchedule.jsx';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: '/about',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/founder&donor',
        element: <Doner></Doner>
      },
      {
        path: '/history',
        element: <History></History>
      },
      {
        path: '/our-vision',
        element: <Vision></Vision>
      },
      {
        path: '/campus-tour',
        element: <CampusTour></CampusTour>
      },
      {
        path: '/achievements',
        element: <Achivements></Achivements>
      },
      {
        path: '/achievements/:id',
        element: <DetailsAchieve></DetailsAchieve>
      },
      {
        path: '/chairman',
        element: <Chairman></Chairman>
      },
      {
        path: '/committee',
        element: <Committee></Committee>
      },
      {
        path: '/committee/:id',
        element: <CommDetails></CommDetails>
      },
      // {
      //   path: '/ex-committee',
      //   element: <ExCommittee></ExCommittee>
      // },
      // {
      //   path: '/ex-committee/:id',
      //   element: <ExCommDetails></ExCommDetails>
      // },
      {
        path: '/principal',
        element: <Principal></Principal>
      },
      {
        path: "/administrator",
        element: <Administrator></Administrator>
      },
      {
        path: '/academic',
        element: <Academic></Academic>
      },
      {
        path: '/our-teachers',
        element: <Teachers></Teachers>
      },
      {
        path: "/teacher/:id",
        element: <Details></Details>
      },
      {
        path: '/our-staffs',
        element: <Staffs></Staffs>
      },
      {
        path: "/staff/:id",
        element: <StaffDetails></StaffDetails>
      },
      {
        path: '/academic-rules',
        element: <AcademicRules></AcademicRules>
      },
      {
        path: '/academic-calender',
        element: <AcademicCalender></AcademicCalender>
      },
      {
        path: '/attendance-sheet',
        element: <AttendanceSheet></AttendanceSheet>
      },
      {
        path: '/information',
        element: <LeaveInfo></LeaveInfo>
      },
      {
        path: '/admission',
        element: <Admission></Admission>
      },
      {
        path: '/study',
        element: <Study></Study>
      },
      {
        path: '/apply',
        element: <Apply></Apply>
      },
      {
        path: '/admission-test',
        element: <AdmissionTest></AdmissionTest>
      },
      {
        path: '/admission-policy',
        element: <Policy></Policy>
      },
      {
        path: '/registration',
        element: <RegistrationSystem></RegistrationSystem>
      },
      {
        path: '/student',
        element: <Student></Student>
      },
      {
        path: '/student-list',
        element: <StudentList></StudentList>
      },
      {
        path: '/tution-fees',
        element: <TutionFees></TutionFees>
      },
      {
        path: '/mobile-banking',
        element: <MobileBanking></MobileBanking>
      },
      {
        path: '/daily-activities',
        element: <DailyActivities></DailyActivities>
      },
      {
        path: '/exam-schedule',
        element: <ExamSchedule></ExamSchedule>
      },
      {
        path: '/student-uniform',
        element: <StudentUniform></StudentUniform>
      },
      {
        path: '/exam-system',
        element: <ExamSystem></ExamSystem>
      },
      {
        path: '/rules&regulation',
        element: <Rules></Rules>
      },
      {
        path: '/facility',
        element: <Facility></Facility>
      },
      {
        path: '/library',
        element: <Library></Library>
      },
      {
        path: '/play-ground',
        element: <PlayGround></PlayGround>
      },
      {
        path: '/physics-lab',
        element: <Physics></Physics>
      },
      {
        path: '/biology-lab',
        element: <Biology></Biology>
      },
      {
        path: '/ict-lab',
        element: <Ict></Ict>
      },
      {
        path: '/chemistry-lab',
        element: <Chemistry></Chemistry>
      },
      {
        path: '/co-curricular-activity',
        element: <CoCurricular></CoCurricular>
      },
      {
        path: '/result',
        element: <Result></Result>
      },
      {
        path: '/academic-result',
        element: <AcademicResult></AcademicResult>
      },
      {
        path: '/evaluation',
        element: <Evaluation></Evaluation>
      },
      {
        path: '/others',
        element: <Others></Others>
      },
      {
        path: '/notice',
        element: <Notice></Notice>
      },
      {
        path: "/notice/:id",
        element: <DetailsNotice></DetailsNotice>
      },
      {
        path: '/news',
        element: <News></News>
      },
      {
        path: "/news/:id",
        element: <DetailsNews></DetailsNews>
      },
      {
        path: '/events',
        element: <Event></Event>
      },
      {
        path: "/events/:id",
        element: <DetailsEvents></DetailsEvents>
      },
      // {
      //   path: "/events/:id/gallery",
      //   element: <GalleryEvents></GalleryEvents>
      // },
      {
        path: '/gallery',
        element: <Gallery></Gallery>
      },
      {
        path: '/videos',
        element: <Video></Video>
      },
      {
        path: '/school-schedule',
        element: <SchoolSchedule></SchoolSchedule>
      },
      // {
      //   path: '/routine',
      //   element: <Routine></Routine>
      // },
      {
        path: '/contact',
        element: <Contact></Contact>
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
