import { Form, useLocation, useNavigate } from "react-router-dom";
import { ButtonA } from "../ui/Button1";
import { eventIO } from "../eventActions";
import { useState } from "react";
import React from "react";
import { MultiSelect1 } from "../ui/MultiSelect";

export const editEvent = async (formData) => {
    console.log("hier ontvangen we data2->" + formData.catIds);
    formData.startTime = `${formData.date}T${formData.sTime}`;
    formData.endTime = `${formData.date}T${formData.eTime}`;
    formData.categoryIds = `[${formData.catIds}]`;

    [("sTime", "eTime", "date", "catIds", "selectedCategories")].forEach(
        (k) => delete formData[k]
    );

    eventIO(formData, "PATCH", formData.id);
    return null;
};

export const EditEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let start_time = location.state.start_time;
    let end_time = location.state.end_time;
    if (location.state.end_time < location.state.start_time) {
        end_time = location.state.start_time;
        start_time = location.state.end_time;
    }

    const [formInput, setFormInput] = useState({
        id: location.state.id,
        createdBy: location.state.user,
        title: location.state.title,
        description: location.state.description,
        image: location.state.img,
        selectedCategories: location.state.selectedCategories,
        location: location.state.event_location,
        date: location.state.date,
        sTime: start_time,
        eTime: end_time,
        catIds: "",
    });

    const [usersCategories, setUsersCategories] = useState([
        location.state.users,
        location.state.categories,
    ]);
    const users = usersCategories[0];
    const categories = usersCategories[1];

    let optionList = [];
    categories.map((category) =>
        optionList.push({ value: category.id, label: category.name })
    );

    let defaultCat = [];
    formInput.selectedCategories.map((category) =>
        defaultCat.push({ value: category.id, label: category.name })
    );

    const [selectedOptions, setSelectedOptions] = useState(defaultCat);

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    let data2 = [];
    try {
        selectedOptions.map((e) => data2.push(e.value));
        formInput.catIds = data2;
    } catch {}

    return (
        <div className="new-event">
            <h1>Edit Event</h1>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                method="post"
                id="edit-event-form"
            >
                <label>
                    <span>User</span>
                    <select
                        name="createdBy"
                        defaultValue={formInput.createdBy}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                createdBy: e.target.value,
                            })
                        }
                    >
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
                        defaultValue={formInput.title}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                title: e.target.value,
                            })
                        }
                        aria-label="Title"
                        type="text"
                        name="title"
                    />
                </label>
                <label>
                    <span>Description</span>
                    <textarea
                        name="description"
                        aria-label="Body"
                        rows="2"
                        defaultValue={formInput.description}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                description: e.target.value,
                            })
                        }
                    />
                </label>
                <img width="200px" src={formInput.image} />
                <label>
                    <span>New link to web image</span>

                    <textarea
                        type="url"
                        name="image"
                        aria-label="url"
                        rows="1"
                        defaultValue={formInput.img}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                image: e.target.value,
                            })
                        }
                    />
                </label>

                <label>
                    <span>Category</span>

                    <MultiSelect1
                        name="category_list"
                        isMulti
                        value={selectedOptions}
                        onChange={handleSelect}
                        options={optionList}
                        placeholder="Select categories"
                        allowCustomValue="true"
                    />
                </label>

                <label>
                    <span>Location</span>
                    <textarea
                        name="location"
                        aria-label="text"
                        rows="1"
                        defaultValue={formInput.location}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                location: e.target.value,
                            })
                        }
                    />
                </label>
                <label>
                    <span>Date</span>
                    <input
                        type="date"
                        name="date"
                        defaultValue={formInput.date}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                date: e.target.value,
                            })
                        }
                    />
                </label>

                <label>
                    <span>Start time</span>
                    <input
                        type="time"
                        name="sTime"
                        defaultValue={formInput.sTime}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                sTime: e.target.value,
                            })
                        }
                    />
                </label>
                <label>
                    <span>End time</span>
                    <input
                        type="time"
                        name="eTime"
                        defaultValue={formInput.eTime}
                        onChange={(e) =>
                            setFormInput({
                                ...formInput,
                                eTime: e.target.value,
                            })
                        }
                    />
                </label>
                <ButtonA
                    type="submit"
                    onClick={() => {
                        editEvent(formInput);
                    }}
                >
                    Save
                </ButtonA>
                <ButtonA type="submit" onClick={() => navigate(-1)}>
                    Cancel
                </ButtonA>
            </Form>
        </div>
    );
};
