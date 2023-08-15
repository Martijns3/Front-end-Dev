import { Link } from "react-router-dom";

export const EventsPage = ({ matchedEvents }) => {
    matchedEvents.sort(function (a, b) {
        var keyA = new Date(a.startTime.split("T")[0]),
            keyB = new Date(b.startTime.split("T")[0]);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    return (
        <>
            <div className="event-list">
                {matchedEvents.map((event) => {
                    return (
                        <div key={event.id} border="2px" color="grey.200">
                            {" "}
                            <Link to={`event/${event.id}`}>
                                <h2>{event.title}</h2>

                                <p>{event.description}</p>
                                <img width="200px" src={event.image} />
                                <p>Date: {event.startTime.split("T")[0]}</p>
                                {event.startTime.split("T")[1].slice(0, 5) >
                                event.endTime.split("T")[1].slice(0, 5) ? (
                                    <p>
                                        Start time:{" "}
                                        {event.endTime
                                            .split("T")[1]
                                            .slice(0, 5)}
                                        <br></br>
                                        End time:{" "}
                                        {event.startTime
                                            .split("T")[1]
                                            .slice(0, 5)}
                                    </p>
                                ) : (
                                    <p>
                                        Start time:{" "}
                                        {event.startTime
                                            .split("T")[1]
                                            .slice(0, 5)}
                                        <br></br>
                                        End time:{" "}
                                        {event.endTime
                                            .split("T")[1]
                                            .slice(0, 5)}
                                    </p>
                                )}
                            </Link>
                            <br></br>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
