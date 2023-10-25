import { Data } from "types";

type CompareCreators = {
  count: number;
  creatorId: string;
  mostRecentTime: number;
};

const compareCreators = (a: CompareCreators, b: CompareCreators) => {
  const countComparison = b.count - a.count;

  if (countComparison !== 0) {
    return countComparison;
  }

  return b.mostRecentTime - a.mostRecentTime;
};

export const getTopActiveCreators = (
  data: Data | null,
  limit: number
): { id: string; email: string }[] | null => {
  if (!data) {
    return null;
  }

  const { Creators: creators, Products: products } = data;

  const creatorIdsSet = new Set(creators.map(({ id }) => id));

  const topCreators = products.reduce<{
    [key: string]: CompareCreators;
  }>((top, { creatorId, createTime }) => {
    const mostRecentTime = new Date(createTime).getTime();
    if (!creatorIdsSet.has(creatorId)) {
      return top;
    }

    if (!top[creatorId]) {
      top[creatorId] = {
        count: 0,
        creatorId,
        mostRecentTime,
      };
    }

    top[creatorId].count++;

    if (mostRecentTime > top[creatorId].mostRecentTime) {
      top[creatorId].mostRecentTime = mostRecentTime;
    }

    return top;
  }, {});

  const sortedTopCreators = Object.values(topCreators).sort(compareCreators);

  return sortedTopCreators.slice(0, limit).map(({ creatorId }) => {
    return {
      id: creatorId,
      email: creators.find(({ id }) => id === creatorId)?.email || "",
    };
  });
};
