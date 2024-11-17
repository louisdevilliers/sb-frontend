import axiosClient from "../api/axiosClient";
import apiEndpointMapping from "../api/apiEndpointMapping";

export const createEntity = async (entity, data) => {
  const endpoint = apiEndpointMapping[entity]?.create;
  if (!endpoint) {
    throw new Error(`No API endpoint mapped for creating ${entity}`);
  }

  try {
    const response = await axiosClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${entity}:`, error);
    throw error;
  }
};

export const fetchEntityDropdownData = async (entity) => {
  console.log(`fetch dropdown data for ${entity} called`);
  const endpoint = apiEndpointMapping[entity]?.list;
  if (!endpoint) {
    throw new Error(
      `No API endpoint mapped for fetching dropdown data for ${entity}`
    );
  }

  try {
    const response = await axiosClient.get(endpoint);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching dropdown data for ${entity}:`, error);
    throw error;
  }
};

export const fetchEntityTableData = async (entity) => {
  const endpoint = apiEndpointMapping[entity]?.show;
  if (!endpoint) {
    throw new Error(
      `No API endpoint mapped for fetching table data for ${entity}`
    );
  }

  try {
    const response = await axiosClient.get(endpoint);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching table data for ${entity}:`, error);
    throw error;
  }
};
