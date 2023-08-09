import { Form, useLoaderData, redirect } from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/react";
import { ButtonA } from "./components/ui/Button1";
import { eventIO } from "./components/eventIO";

const { toast } = createStandaloneToast();

// export const eventIO = async (formData = {}, method, id = 0) => {
//     if (method == "POST" || method == "PATCH") {
//         try {
//             const newId = await fetch("http://localhost:3000/events", {
//                 method: method,
//                 body: JSON.stringify(formData),
//                 headers: { "Content-Type": "application/json" },
//             })
//                 .then((response) => {
//                     if (response.ok) {
//                         toast({
//                             title: "New Event added",
//                             status: "success",
//                         });
//                         return response.json();
//                     } else {
//                         toast({
//                             title: `Error ${response.status} has occured`,
//                             status: "error",
//                         });
//                         const timeout = setTimeout(() => {
//                             window.location.replace(`/`);
//                         }, 1500);
//                         return () => clearTimeout(timeout);
//                     }
//                 })
//                 .then((json) => json.id);

//             const timeout = setTimeout(() => {
//                 window.location.replace(`/event/${newId}`);
//             }, 1500);
//             return () => clearTimeout(timeout);
//         } catch {}
//     }
//     if (method == "DELETE") {
//         try {
//             await fetch(`http://localhost:3000/events/${id}`, {
//                 method: method,
//             }).then((response) => {
//                 if (response.ok) {
//                     toast({
//                         title: "Success: Event Deleted",
//                         status: "success",
//                     });
//                     const timeout = setTimeout(() => {
//                         window.location.replace(`/`);
//                     }, 1500);
//                     return () => clearTimeout(timeout);
//                 } else {
//                     toast({
//                         title: `Error ${response.status} has occured: ${response.statusText}`,
//                         status: "error",
//                     });
//                 }
//             });

//             const timeout = setTimeout(() => {
//                 window.location.replace(`/`);
//             }, 1500);
//             return () => clearTimeout(timeout);
//         } catch {}
//         const timeout = setTimeout(() => {
//             window.location.replace(`/`);
//         }, 1500);
//         return () => clearTimeout(timeout);
//     }
// };
export const createNewAndEdit = async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    formData.startTime = `${formData.date}T${formData.sTime}`;
    formData.endTime = `${formData.date}T${formData.eTime}`;
    formData.categoryIds = `[${formData.categoryIds}]`;

    ["sTime", "eTime", "date"].forEach((k) => delete formData[k]);

    // try {
    //     const newId = await fetch("http://localhost:3000/events", {
    //         method: "POST",
    //         body: JSON.stringify(formData),
    //         headers: { "Content-Type": "application/json" },
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 toast({
    //                     title: "New Event added",
    //                     status: "success",
    //                 });
    //                 return response.json();
    //             } else {
    //                 toast({
    //                     title: `Error ${response.status} has occured`,
    //                     status: "error",
    //                 });
    //             }
    //         })
    //         .then((json) => json.id);

    //     return redirect(`/event/${newId}`);
    // } catch {
    //     return redirect("/");
    // }
    eventIO(formData, "POST");
    return null;
};

export const loader = async () => {
    const users = await fetch("http://localhost:3000/users");
    const categories = await fetch("http://localhost:3000/categories");

    return { categories: await categories.json(), users: await users.json() };
};

export const NewEvent = () => {
    const { categories, users } = useLoaderData();
    return (
        <div className="new-event">
            <h1>New Event</h1>
            <Form method="post" id="new-event-form">
                <label>
                    <span>User</span>
                    <select name="createdBy">
                        {users.map((user) => (
                            <option value={user.id} key={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Title</span>
                    <input
                        placeholder="An exciting title..."
                        aria-label="Title"
                        type="text"
                        name="title"
                    />
                </label>
                <label>
                    <span>Description</span>
                    <textarea name="description" aria-label="Body" rows="2" />
                </label>
                <label>
                    <span>Link to web image</span>
                    <textarea
                        type="url"
                        name="image"
                        aria-label="url"
                        rows="1"
                    />
                </label>

                <label>
                    <span>Category</span>
                    <select name="categoryIds">
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Location</span>
                    <textarea name="location" aria-label="url" rows="1" />
                </label>
                <label>
                    <span>Date</span>
                    <input type="date" name="date" />
                </label>
                <label>
                    <span>Start time</span>
                    <input type="time" name="sTime" />
                </label>
                <label>
                    <span>End time</span>
                    <input type="time" name="eTime" />
                </label>
                <ButtonA type="submit">Save</ButtonA>
            </Form>
        </div>
    );
};
