import "./MonthlyDiet.css";

import { ConfigProvider, Calendar, CalendarProps, Typography } from "antd";

import dayjs, { Dayjs } from "dayjs";

function MonthlyDiet() {
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Calendar: {
            fullBg: "#74c69d",
            fullPanelBg: "#95d5b2",
            itemActiveBg: "#b7e4c7",
            yearControlWidth: 0,
            colorText: "black",
          },
        },
      }}
    >
      <Typography.Title className="Home-Header">Monthly Diet</Typography.Title>
      <Calendar
        onPanelChange={onPanelChange}
        className="Calendar"
        mode="month"
        validRange={[startOfMonth, endOfMonth]}
      />
    </ConfigProvider>
  );
}

export default MonthlyDiet;
