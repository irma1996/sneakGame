import React from "react";

function Time(props) {
  const h = () => {
    if (props.time.h === 0) {
      return "";
    } else {
      return (
        <span>
          {props.time.h >= 10 ? props.time.h : "0" + props.time.h}&nbsp;:&nbsp;}{" "}
        </span>
      );
    }
  };
  return (
    <div className="time-div">
      <span className="time-span">
        {props.time.h >= 10 ? props.time.h : "0" + props.time.h}
      </span>
      <span>:</span>
      <span className="time-span">
        {props.time.m >= 10 ? props.time.m : "0" + props.time.m}
      </span>
      <span>:</span>
      <span className="time-span">
        {props.time.s >= 10 ? props.time.s : "0" + props.time.s}
      </span>
      <span>:</span>
      <span className="time-span">
        {props.time.ms >= 10 ? props.time.ms : "0" + props.time.ms}
      </span>
    </div>
  );
}

export default Time;
