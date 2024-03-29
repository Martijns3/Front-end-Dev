import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const eventIO = async (formData = {}, method, id = 0) => {
    const API = "http://localhost:3000";
    const successMessage = [
        "Success: Event Deleted",
        "Success: Event edits were saved",
        "Success: New Event added",
    ];
    if (method == "POST") {
        let toastMessage = successMessage[2];
        try {
            const newId = await fetch(`${API}/events`, {
                method: method,
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    if (response.ok) {
                        toast({
                            title: toastMessage,
                            status: "success",
                        });

                        return response.json();
                    } else {
                        toast({
                            title: `Error ${response.status} has occured`,
                            status: "error",
                        });
                    }
                })
                .then((json) => json.id);

            reRoute(method, newId);
        } catch {
            toast({
                title: ` A server error has occured`,
                status: "error",
            });
            method = "ERROR";
            reRoute(method, id);
        }
    }
    if (method == "DELETE" || method == "PUT") {
        let toastMessage = "";
        let body = "";
        if (method == "DELETE") toastMessage = successMessage[0];
        body = {
            method: method,
        };
        if (method == "PUT") toastMessage = successMessage[1];

        body = {
            method: method,
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        };
        try {
            await fetch(`${API}/events/${id}`, body).then((response) => {
                if (response.ok) {
                    toast({
                        title: toastMessage,
                        status: "success",
                    });
                } else {
                    toast({
                        title: `Delete Error ${response.status} has occured: ${response.statusText}`,
                        status: "error",
                    });
                    method = "POST";
                    reRoute(method, id);
                }
            });
            if (method == "PUT") reRoute(method, id);
            if (method == "DELETE") reRoute(method);
        } catch {
            toast({
                title: ` A server error has occured`,
                status: "error",
            });
            method = "ERROR";
            reRoute(method, id);
        }
    }
};
const reRoute = (method, newId = 0) => {
    const timeout = setTimeout(() => {
        if (method == "DELETE" || method == "ERROR")
            window.location.replace(`/`);
        if (method == "PUT" || method == "POST")
            window.location.replace(`/event/${newId}`);
    }, 1500);
    return () => clearTimeout(timeout);
};

export const dateCheck = (eventStart, eventEnd) => {
    let startTime;
    let endTime;
    if (eventStart > eventEnd) {
        startTime = eventEnd.split("T")[1].slice(0, 5);
        endTime = eventStart.split("T")[1].slice(0, 5);
    } else {
        startTime = eventStart.split("T")[1].slice(0, 5);
        endTime = eventEnd.split("T")[1].slice(0, 5);
    }

    return [startTime, endTime];
};

export const formatDate = (s) => {
    const reversed = s.split("T")[0].split("-").reverse();
    const sortedDate = `${reversed[0]}-${reversed[1]}-${reversed[2]}`;

    return [sortedDate];
};
