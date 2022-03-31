import { Fragment } from "react";
import Image from "next/image";
import { DummyEvents } from "../../dummy-data";

import Button from "../ui/Button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import classes from "./EventItem.module.css";

function EventItem(props: DummyEvents) {
  const { id, title, image, date, location } = props;

  const humanReadableDate: string = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <Fragment>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <ArrowRightIcon />
              </span>
            </Fragment>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;