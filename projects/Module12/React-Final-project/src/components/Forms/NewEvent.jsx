import { Form, useLoaderData } from "react-router-dom";
import { ButtonA } from "../ui/Button1";
import { eventIO } from "../eventActions";

import { useState, useContext, useMemo } from "react";

import { MultiSelect1 } from "../ui/MultiSelect";
import { UsersAndCatContext } from "../../ContextProvider";

export const createNewEvent = async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    formData.startTime = `${formData.date}T${formData.sTime}`;
    formData.endTime = `${formData.date}T${formData.eTime}`;
    formData.categoryIds = `[${formData.categoryIds}]`;

    [("sTime", "eTime", "date", "category_list")].forEach(
        (k) => delete formData[k]
    );

    eventIO(formData, "POST");
    return null;
};

export const loader = async () => {
    // let users = await fetch("http://localhost:3000/users");
    // const categories = await fetch("http://localhost:3000/categories");

    return {
        // categories: await categories.json(),
        // users: await users.json(),
    };
};

export const NewEvent = () => {
    // const { users } = useLoaderData();
    // const data = useContext(UsersAndCatContext);

    const categories = useContext(UsersAndCatContext).category;
    const users = useContext(UsersAndCatContext).users;

    const [selectedOptions, setSelectedOptions] = useState(null);

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    let data2 = [];
    try {
        selectedOptions.map((e) => data2.push(e.value));
    } catch {}
    let optionList = [];
    categories.map((category) =>
        optionList.push({ value: category.id, label: category.name })
    );
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
                        placeholder="Event title..."
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
                {/* onderstaande hidden input gebruik ik om via het form een array met alleen
                    de category ids te sturen die in het menu zijn geselecteerd. 
                    Dit, omdat de selectedOptions state via form submit 
                    alleen de laatst geselecteerde category doorgeeft */}

                <input
                    type="hidden"
                    name="categoryIds"
                    defaultValue={data2}
                ></input>
                <label>
                    <span>Category</span>

                    <MultiSelect1
                        name="category_list"
                        isMulti
                        value={selectedOptions}
                        onChange={handleSelect}
                        options={optionList}
                        placeholder="Select categories"
                    />
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
