import "./DailyDiet.css";
import { Image, Collapse, Flex, List, Typography } from "antd";

import Avocado from "/avocado.png";

const { Panel } = Collapse;

type MealMacros = "protein" | "carbs" | "calories";

function DailyDiet() {
  const meals: any = [
    {
      mealName: "3 Egged Shakshooka",
      mealMacros: { protein: 20, calories: 400, carbs: 10 },
      ingredients: [
        { name: "Egg", amount: 3 },
        { name: "Tomato", amount: 1 },
        { name: "Onion", amount: 1 },
      ],
    },
    {
      mealName: "Protein yogurt",
      mealMacros: { protein: 20, calories: 200, carbs: 10 },
      ingredients: [],
    },
    {
      mealName: "Rice and chicken",
      mealMacros: { protein: 75, calories: 1200, carbs: 40 },
      ingredients: [
        { name: "rice", amount: 3 },
        { name: "chicken", amount: 3 },
        { name: "Onion", amount: 1 },
        { name: "Tomato", amount: 1 },
      ],
    },
    {
      mealName: "Protein Shake",
      mealMacros: { protein: 25, calories: 100, carbs: 0 },
      ingredients: [],
    },
  ]; //TODO: switch any to Meal[] type from other branch

  let generalMealsMacros = { protein: 140, carbs: 60, calories: 1900 };

  return (
    <Flex className="Daily-Plan" vertical>
      <Typography.Title className="Daily-Plan-Header">
        Today's Plan
      </Typography.Title>
      <Flex className="General-Data" gap={5}>
        <Typography.Text strong>Macros:</Typography.Text>
        {Object.entries(generalMealsMacros).map(([key, value]) => (
          <Typography.Text key={key}>
            {key + ": " + value + "gr"}
          </Typography.Text>
        ))}
      </Flex>

      <Flex className="Meals">
        <Collapse className="Meals-Accordion" bordered={false}>
          {meals.map((meal: any, index: number) => (
            <Panel header={meal.mealName} key={index} className="Meal-Panel">
              <Flex vertical>
                <Flex className="General-Data" gap={5}>
                  <Typography.Text strong>Macros:</Typography.Text>
                  {Object.entries(meal.mealMacros).map(([key, value]) => (
                    <Typography.Text>
                      {key + ": " + value + "gr"}
                    </Typography.Text>
                  ))}
                </Flex>

                {meal.ingredients.length > 0 && (
                  <List
                    className="Ingredient-List"
                    header="Ingredients"
                    itemLayout="horizontal"
                    dataSource={meal.ingredients}
                    renderItem={(item: any, index) => (
                      <List.Item key={index}>
                        <List.Item.Meta
                          className="Ingredient-List-Item"
                          avatar={
                            <Image src={Avocado} className="Ingredient-Logo" />
                          }
                          title={<Typography.Text>{item.name}</Typography.Text>}
                          description={
                            <Flex className="General-Data" gap={5}>
                              <Typography.Text strong>Macros:</Typography.Text>
                              {Object.entries(generalMealsMacros).map(
                                ([key, value]) => (
                                  <Typography.Text key={key}>
                                    {key + ": " + value + "gr"}
                                  </Typography.Text>
                                )
                              )}
                            </Flex>
                          }
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Flex>
            </Panel>
          ))}
        </Collapse>
      </Flex>
    </Flex>
  );
}

export default DailyDiet;
