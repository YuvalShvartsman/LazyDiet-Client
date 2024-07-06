import "./SaveMealsModal.css";

import { useCallback, useState } from "react";

import {
  AutoComplete,
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
} from "antd";
import { Header } from "antd/es/layout/layout";

import IdleAvocado from "/idleAvocado.gif";

import { Meal } from "../../../types/Meal";
import { Ingredient } from "../../../types/Ingredient";
import { Nutrient } from "../../../types/Nutrient";

import debounce from "lodash.debounce";

import db from "../../../axiosConfig/axiosInstance";

type SaveMealsModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function SaveMealsModal({ isOpen, setIsOpen }: SaveMealsModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const onFinish: FormProps<Meal>["onFinish"] = (values) => {
    console.log(values);
  };

  const onFinishFailed: FormProps<Meal>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);

  const fetchIngredients = async (value: string) => {
    if (value) {
      const response = await db.get<Ingredient[]>(
        `/ingredients/search-ingredients/${value}`
      );
      console.log(response.data);
      setOptions(
        response.data.map((ingredient) => ({
          value: ingredient._id,
          label: ingredient.ingredient_description,
        }))
      );
    } else {
      setOptions([]);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchIngredients, 300), []);

  const handleSearch = (value: string) => {
    debouncedFetch(value);
  };

  const handleSelect = async (value: string) => {
    const response = await db.get<{ nutrients: Nutrient[] }>(
      `/ingredient-nutrients/${value}`
    );
    setNutrients(response.data.nutrients);
  };

  const ingredients = ["banana", "avocado", "Egg"];

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <img src={IdleAvocado} className="Idle-Avocado" />
      <Header>Add a meal</Header>
      <Flex className="User-Preferences-Component">
        <Form
          className="User-Preferences-Form"
          name="UserPreferences"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<Meal>
            label="Meal name:"
            name="mealName"
            rules={[
              {
                required: true,
                message: "Each meal must contain a name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Meal>
            name="ingredients"
            label="Ingredients:"
            valuePropName="goal"
            rules={[{ required: true, message: "Please enter your goals!" }]}
          >
            <AutoComplete
              options={options}
              onSearch={handleSearch}
              onSelect={handleSelect}
              style={{ width: 200 }}
            >
              <Input.Search placeholder="Search Ingredients" />
            </AutoComplete>

            {nutrients.length > 0 && (
              <div>
                <h3>Nutrients</h3>
                <ul>
                  {nutrients.map((nutrient) => (
                    <li key={nutrient._id}>
                      {nutrient.nutrientsNames
                        .map((name) => name.name)
                        .join(", ")}
                      : {nutrient.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="User-Preferences-Submit" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
}

export default SaveMealsModal;
