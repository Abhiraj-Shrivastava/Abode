import React, { useState } from "react";
import styled from "styled-components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

export default function Search(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    console.log(ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    alert(ranges.selection.startDate)

      props.onChange(ranges.selection.startDate + "  to  " + ranges.selection.endDate);
  }

  return (
    <>
      <Item>
        <div className="search">
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        </div>
      </Item>
    </>
  );
}

const Item = styled.div`
  .search {
    position: absolute;
    z-index: 1;
    margin: -3.7rem -16rem;

    width: 100vw;
  }
`;
