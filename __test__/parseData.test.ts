import { Data } from "../types";
import { getTopActiveCreators } from "../utils/parseData";

describe("getTopActiveCreators", () => {
  it("should return null if data is null", () => {
    const data: Data | null = null;
    const limit = 10;
    const result = getTopActiveCreators(data, limit);
    expect(result).toBeNull();
  });

  it("should return the most popular creators and, in case of a tie, the most recent creators", () => {
    const data: Data = {
      Creators: [
        { id: "1", email: "creator1@example.com" },
        { id: "2", email: "creator2@example.com" },
        { id: "3", email: "creator3@example.com" },
      ],
      Products: [
        { id: "1", creatorId: "1", createTime: "2023-10-24T12:00:00" },
        { id: "2", creatorId: "2", createTime: "2023-10-24T14:00:00" },
        { id: "3", creatorId: "3", createTime: "2023-10-24T10:00:00" },
        { id: "4", creatorId: "1", createTime: "2023-10-24T15:00:00" },
        { id: "5", creatorId: "2", createTime: "2023-10-24T11:00:00" },
        { id: "6", creatorId: "3", createTime: "2023-10-24T13:00:00" },
        { id: "7", creatorId: "1", createTime: "2023-11-24T16:00:00" }, // most recent
        { id: "8", creatorId: "2", createTime: "2023-10-24T16:30:00" },
        { id: "9", creatorId: "3", createTime: "2023-10-24T12:30:00" },
      ],
    };

    const limit = 2;
    const result = getTopActiveCreators(data, limit);

    // Expected result: Creators 1 and 2 have the same count (3), but Creator 1 is more recent.
    expect(result).toEqual([
      { id: "1", email: "creator1@example.com" },
      { id: "2", email: "creator2@example.com" },
    ]);
  });
});
