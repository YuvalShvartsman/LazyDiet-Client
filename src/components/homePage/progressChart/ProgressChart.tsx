import { useMemo } from "react";

import "./ProgressChart.css";

import { Flex } from "antd";

import { Chart, AxisOptions, ChartOptions } from "react-charts";

interface WeightData {
  date: Date;
  weight: number;
}

const WeightProgressChart = () => {
  const primaryAxis = useMemo<AxisOptions<WeightData>>(
    () => ({
      getValue: (datum) => datum.date,
      scaleType: "time",
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<WeightData>[]>(
    () => [
      {
        getValue: (datum) => datum.weight,
        elementType: "line",
      },
    ],
    []
  );

  const data = [
    {
      label: "Weight",
      data: [
        { date: new Date("2024-01-01"), weight: 70 },
        { date: new Date("2024-02-01"), weight: 68 },
        { date: new Date("2024-03-01"), weight: 66 },
        { date: new Date("2024-04-01"), weight: 65 },
        { date: new Date("2024-05-01"), weight: 63 },
      ],
    },
  ];
  const chartOptions: ChartOptions<WeightData> = {
    data,
    primaryAxis,
    secondaryAxes,
  };

  return (
    <Flex
      className="Chart-Wrapper"
      style={{ width: "100%", height: "400px", margin: "auto" }}
    >
      <Chart options={chartOptions} />
    </Flex>
  );
};

export default WeightProgressChart;
