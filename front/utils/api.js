export const api = async (apiRoad, method = "GET", data = {}, auth = null) => {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth 
    },
  };

  if (method !== "GET") {
    // Inclure le corps de requête uniquement si ce n'est pas une requête GET
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${apiRoad}`, requestOptions);
    const jsonResponse = await response.json();
    console.log(jsonResponse.data);
    return jsonResponse.data;
  } catch (error) {
    throw error;
  }
};
