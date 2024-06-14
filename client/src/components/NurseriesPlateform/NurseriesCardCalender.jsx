import "./nurseriesAll.css";

export default function NurseriesCardCalender() {
  return (
    <div className="nursery-card-calender-section">
      {" "}
      <div className="nursery-card-calender-date">
        Lun.
        <div className="nursery-card-hour-true">V</div>
        <div className="nursery-card-hour-false">X</div>
      </div>
      <div className="nursery-card-calender-date">
        Mar.
        <div className="nursery-card-hour-true">V</div>
        <div className="nursery-card-hour-false">X</div>
      </div>
      <div className="nursery-card-calender-date">
        Merc.
        <div className="nursery-card-hour-false">X</div>
        <div className="nursery-card-hour-false">X</div>
      </div>
      <div className="nursery-card-calender-date">
        Jeudi
        <div className="nursery-card-hour-false">X</div>
        <div className="nursery-card-hour-true">V</div>
      </div>
      <div className="nursery-card-calender-date">
        Vend.
        <div className="nursery-card-hour-false">X</div>
        <div className="nursery-card-hour-true">V</div>
      </div>
    </div>
  );
}
