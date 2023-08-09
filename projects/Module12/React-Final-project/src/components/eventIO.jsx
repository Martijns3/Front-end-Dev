import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export const eventIO = async (formData = {}, method, id = 0) => {
    if (method == "POST" || method == "PATCH") {
        try {
            const newId = await fetch("http://localhost:3000/events", {
                method: method,
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    if (response.ok) {
                        toast({
                            title: "New Event added",
                            status: "success",
                        });
                        return response.json();
                    } else {
                        toast({
                            title: `Error ${response.status} has occured`,
                            status: "error",
                        });
                        const timeout = setTimeout(() => {
                            window.location.replace(`/`);
                        }, 1500);
                        return () => clearTimeout(timeout);
                    }
                })
                .then((json) => json.id);

            const timeout = setTimeout(() => {
                window.location.replace(`/event/${newId}`);
            }, 1500);
            return () => clearTimeout(timeout);
        } catch {}
    }
    if (method == "DELETE") {
        try {
            await fetch(`http://localhost:3000/events/${id}`, {
                method: method,
            }).then((response) => {
                if (response.ok) {
                    toast({
                        title: "Success: Event Deleted",
                        status: "success",
                    });
                    // const timeout = setTimeout(() => {
                    //     window.location.replace(`/`);
                    // }, 1500);
                    // return () => clearTimeout(timeout);
                } else {
                    toast({
                        title: `Error ${response.status} has occured: ${response.statusText}`,
                        status: "error",
                    });
                }
            });

            const timeout = setTimeout(() => {
                window.location.replace(`/`);
            }, 1500);
            return () => clearTimeout(timeout);
        } catch {}
        // const timeout = setTimeout(() => {
        //     window.location.replace(`/`);
        // }, 1500);
        // return () => clearTimeout(timeout);
    }
};
