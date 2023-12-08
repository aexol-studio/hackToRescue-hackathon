import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
} from "recharts";

import React from "react";
import { useAppStore } from "@/stores";

const formatter = (value: number) => {
  switch (value) {
    case 0: {
      return "Bardzo dobry";
    }
    case -1: {
      return "Dobry";
    }
    case -2: {
      return "Umiarkowany";
    }
    case -3: {
      return "Dostateczny";
    }
    case -4: {
      return "Zły";
    }
    case -5: {
      return "Bardzo zły";
    }
    default: {
      return value.toString();
    }
  }
};

export const Chart = () => {
  const { chartData, showLounge } = useAppStore(({ chartData, showLounge }) => ({
    chartData,
    showLounge,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={showLounge ? chartData?.OPEN_WEATHER : []}
        margin={{
          top: 40,
          left: 50,
          right: 10,
          bottom: 30,
        }}>
        <Tooltip />

        <YAxis interval="preserveStartEnd" domain={[0, -5]} tickFormatter={formatter} />
        <Line type="monotone" dataKey="no2" stroke="#8B59F0" />
        <Line type="monotone" dataKey="o3" stroke="#CA59F0" />
        <Line type="monotone" dataKey="pm1" stroke="#F25AD9" />
        <Line type="monotone" dataKey="pm2p5" stroke="#F05998" />
        <Line type="monotone" dataKey="pm10" stroke="#F09859" />
        <Line type="monotone" dataKey="pm25" stroke="#F0D759" />
        <Line type="monotone" dataKey="so2" stroke="#F05959 " />
      </LineChart>
    </ResponsiveContainer>
  );
};
