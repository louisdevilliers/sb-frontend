import axiosClient from "../api/axiosClient";
import apiEndpointMapping from "../api/apiEndpointMapping";

export const createEntity = async (entity, data) => {
  const endpoint = apiEndpointMapping[entity];
  if (!endpoint) {
    throw new Error(`No API endpoint mapped for entity: ${entity}`);
  }

  try {
    const response = await axiosClient.post(endpoint, data);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${entity}:`, error);
    throw error;
  }
};
