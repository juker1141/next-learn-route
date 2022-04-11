import { FormEvent, useRef } from "react";
import Button from "../ui/Button";
import classes from "./EventsSearch.module.css";

interface EventsSearchProps {
  onSearch: (year: number, month: number) => void;
}

const EventsSearch = (props: EventsSearchProps) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    if (selectedYear && selectedMonth) {
      props.onSearch(
        parseInt(selectedYear, 10),
        parseInt(selectedMonth, 10),
      );
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select ref={yearInputRef} id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select ref={monthInputRef} id="month">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <Button>Find Event</Button>
    </form>
  )
}

export default EventsSearch;