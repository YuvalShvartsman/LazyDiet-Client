import { Flex, Typography } from "antd";
import "./MacrosDisplay.css";

type MacrosDisplayProps = {
  mealMacros: { protein: number; carbs: number; calories: number };
};

function MacrosDisplay({ mealMacros }: MacrosDisplayProps) {
  return (
    <Flex className="Macros-Display " gap={5}>
      <Typography.Text strong>Macros:</Typography.Text>
      {Object.entries(mealMacros).map(([key, value]) => (
        <Typography.Text key={key}>{key + ": " + value + "gr"}</Typography.Text>
      ))}
    </Flex>
  );
}

export default MacrosDisplay;
