import instance from "./axios.customize";

const createUserApi = (username, email, password) => {
    const URL_API = "/v1/api/register";

    const data = {
        username, email, password
    }

    return instance.post(URL_API, data);
}

const loginUserApi = (email, password) => {
    const URL_API = "/v1/api/login";

    const data = {
        email, password
    }

    return instance.post(URL_API, data);
}

const forgotPasswordApi = (email) => {
    const URL_API = "/v1/api/forgot-password";

    const data = {
        email
    }

    return instance.post(URL_API, data);
}

const getUserApi = () => {
    const URL_API = "/v1/api/user";

    return instance.get(URL_API);
}

const addTaskApi = (task) => {
    const URL_API = "/v1/api/task/create";

    return instance.post(URL_API, task);
}

const getTaskApi = () => {
    const URL_API = "/v1/api/task/getTask";

    return instance.get(URL_API);
}

const updateTaskApi = (updated) => {
    const URL_API = "/v1/api/task/update";

    return instance.post(URL_API, updated);
}

const deleteTaskApi = (taskId) => {
    const URL_API = "/v1/api/task/delete";

    const data = {
        taskId
    }

    return instance.post(URL_API, data);
}

export {
    createUserApi, loginUserApi, getUserApi, addTaskApi, getTaskApi, updateTaskApi, deleteTaskApi, forgotPasswordApi
}