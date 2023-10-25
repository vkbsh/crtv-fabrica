import mockData from "../data.json";
import { getData, url } from "../utils/fetcher";

describe("getData", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockResponse = {
      ok: true,
      json: async () => mockData,
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const data = await getData();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it("handles HTTP error", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const data = await getData();

    expect(data).toBeNull();
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it("handles network error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const data = await getData();

    expect(data).toBeNull();
    expect(fetch).toHaveBeenCalledWith(url);
  });
});
