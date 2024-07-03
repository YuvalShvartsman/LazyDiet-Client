import { Card, Collapse, Typography } from "antd";
import React from "react";
import "./DailyDiet.css";

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
    <div className="DailyPlan">
      <Typography.Title>Today's Plan</Typography.Title>
      <div className="GeneralData" style={{ display: "flex", gap: "5px" }}>
        <Typography.Text strong>Macros:</Typography.Text>
        {Object.entries(generalMealsMacros).map(([key, value]) => (
          <Typography.Text key={key}>
            {key + ": " + value + "gr"}
          </Typography.Text>
        ))}
      </div>
      <div className="Meals">
        <Collapse accordion>
          {meals.map((meal: any, index: number) => (
            <Panel header={meal.mealName} key={index}>
              <Typography.Text strong>Macros:</Typography.Text>
              <ul>
                {Object.entries(meal.mealMacros).map(([key, value]) => (
                  <li key={key}>
                    <Typography.Text>
                      {key + ": " + value + "gr"}
                    </Typography.Text>
                  </li>
                ))}
              </ul>
              {meal.ingredients.length > 0 && (
                <>
                  <Typography.Text strong>Ingredients:</Typography.Text>
                  <ul>
                    {meal.ingredients.map((ingredient: any, i: number) => (
                      <li key={i}>
                        <Typography.Text>
                          {ingredient.name + ": " + ingredient.amount}
                        </Typography.Text>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}

export default DailyDiet;
