import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export const MyDatePicker = () => {
  return (
    <div className="calendar-wrapper">
      <h2>Select a Date</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'event 1', date: '2024-03-25' },
          { title: 'event 2', date: '2024-03-26' },
        ]}
      />
    </div>
  )
}
