export type Menu = {};

export type MonthlyMenu = {
  userId: string;
  month: string;
  dailyMenus: Menu[];
};
