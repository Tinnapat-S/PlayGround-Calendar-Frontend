import { MyDatePicker } from '../Calendar'
import './MainPageLayout.css'
export const MainPageLayout: React.FC = () => {
  return (
    <div className="mainPage-container">
      {/* sidebar */}
      <div className="sideBar-container">
        <div className="sideBar-header"></div>
      </div>
      {/* content */}
      <div className="content-container">
        <div className="content-header"></div>
        <div className="content">
          <div className="sub-header">
            <h6>sub-header</h6>
          </div>
          <div className="calendar-container">
            <div className="calendar"></div>
            <div className="calender-sideBar">fd</div>
          </div>
        </div>
      </div>
    </div>
  )
}
