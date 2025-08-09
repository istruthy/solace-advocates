export const getDegrees = async () => {
  try {
    // TODO: can add caching here
    const response = await fetch("http://localhost:3000/api/degrees");

    if (!response.ok) {
      console.error("Error fetching degrees:", response.status);
      return [];
    }

    const result = await response.json();

    if (!result.success) {
      console.error("API returned error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Error in getDegrees:", error);
    return [];
  }
};
