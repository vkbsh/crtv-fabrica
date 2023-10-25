import { getData } from "utils/fetcher";
import { getTopActiveCreators } from "utils/parseData";

import { Data } from "types";

const creatorsLimit = 3;

export default async function Home() {
  const data = await getData<Data>();
  const topCreators = getTopActiveCreators(data, creatorsLimit);

  return (
    <main className="min-h-screen flex flex-col items-center gap-4 p-4 font-bold">
      <h1 className="text-xl">Top {creatorsLimit} Active Creators</h1>
      <ul>
        {topCreators?.map(({ id, email }) => (
          <li key={id}>
            <span>{email}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
