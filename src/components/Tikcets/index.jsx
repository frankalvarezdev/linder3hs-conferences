import { useState, useEffect } from "react";
import { getUser } from "../../services/auth";
import { getDataFromTable } from "../../services/config";
import "./index.css";
import TicketCard from "./TicketCard";

export default function Tickets() {
  const [user, setUser] = useState(null);

  const [tickets, setTickets] = useState([]);

  const fetchUser = async () => {
    const { user } = await getUser();
    setUser(user);

    return user;
  };

  const fetchTickets = async (user) => {
    const tickets = await getDataFromTable(
      "tickets",
      {
        key: "user_id",
        value: user.id,
      },
      `*, events(*)`
    );
    setTickets(tickets);
  };

  useEffect(() => {
    fetchUser().then((user) => fetchTickets(user));
  }, []);

  return (
    <>
      {/* Skeleton loading */}
      {!tickets.length && (
        <>
          {Array.from({ length: 2 }).map((_, index) => (
            <TicketCard key={index} />
          ))}
        </>
      )}

      {/* Si hay por lo menos un ticket */}
      {tickets.length && tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} user={user} />
      ))}
    </>
  );
}
