import "./nurseriesAll.css";

export default function NurseriesCardCalender() {
  return (
    <div className="nursery_card_calender_section">
      {" "}
      <div className="nursery_card_calender_date">
        Lun.
        <div className="nursery_card_hour_true">V</div>
        <div className="nursery_card_hour_false">X</div>
      </div>
      <div className="nursery_card_calender_date">
        Mar.
        <div className="nursery_card_hour_true">V</div>
        <div className="nursery_card_hour_false">X</div>
      </div>
      <div className="nursery_card_calender_date">
        Merc.
        <div className="nursery_card_hour_false">X</div>
        <div className="nursery_card_hour_false">X</div>
      </div>
      <div className="nursery_card_calender_date">
        Jeudi
        <div className="nursery_card_hour_false">X</div>
        <div className="nursery_card_hour_true">V</div>
      </div>
      <div className="nursery_card_calender_date">
        Vend.
        <div className="nursery_card_hour_false">X</div>
        <div className="nursery_card_hour_true">V</div>
      </div>
    </div>
  );
}
