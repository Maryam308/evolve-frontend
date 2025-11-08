const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/entries`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
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
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, create };
