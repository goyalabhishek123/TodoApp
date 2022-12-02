import axios, { AxiosResponse } from "axios";

const baseUrl: string = "https://localhost:44317/api/todo";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/alltodo"
    );
    return todos;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/posttodo",
      todo
    );
    return saveTodo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };

    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edittodo/${todo.id}/
    ${todoUpdate.status}`
    );
    return updatedTodo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteTodo = async (
  id: number
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/deletetodo/${id}`
    );
    return deletedTodo;
  } catch (error: any) {
    throw new Error(error);
  }
};
