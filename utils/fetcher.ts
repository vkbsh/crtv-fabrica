export const url =
  "https://gist.githubusercontent.com/gabrielpscf/5c571687d5f11b68fd8cfbf990387f8b/raw/6891813ac5ecb0b9b9308c8ccd9bd3a97c456107/data.json";

export const getData = async <T>(): Promise<T | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};
