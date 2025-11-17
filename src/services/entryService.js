const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/entries`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {}
};

const create = async (entryFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryFormData),
    });

    if (!res.ok) throw new Error("Failed to create entry");
    return res.json();
  } catch (error) {}
};

const show = async (entryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${entryId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {}
};
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
const update = async (entryId, entryFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${entryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryFormData),
    });
    return res.json();
  } catch (error) {}
};

<<<<<<< HEAD
const deleteEntry = async (entryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${entryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
=======
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53

=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
const createReflection = async (entryId, reflectionFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${entryId}/reflections`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reflectionFormData),
    });
    return res.json();
  } catch (error) {}
};

<<<<<<< HEAD
<<<<<<< HEAD
export { index, create, show, update, deleteEntry, createReflection };
=======

=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
const deleteEntry = async (entryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${entryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to delete entry");

    if (res.status === 204) return true;

    const data = await res.json().catch(() => null);
    return data;
  } catch (error) {}
};

<<<<<<< HEAD
export { index, create, show, createReflection, deleteEntry };
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53
=======
export { index, create, show, update, createReflection, deleteEntry };
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
