import React, { FC } from "react";
const mockedArray = ["Ogólna", "o3", "so2", "no2", "pm25", "pm10"];

export const AirQualityLoader: FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <>
      {mockedArray.map((data, index) => (
        <div key={data} className="flex items-center justify-between gap-6">
          <span>{data}</span>
          {loading ? (
            <span className="background-light700 h-2 w-10 animate-pulse rounded-full" />
          ) : (
            <span>-</span>
          )}
        </div>
      ))}
    </>
  );
};
