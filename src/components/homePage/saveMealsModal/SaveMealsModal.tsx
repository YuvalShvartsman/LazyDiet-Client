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
  Tag,
  Typography,
} from "antd";

import { Meal } from "../../../types/Meal";
import { Ingredient } from "../../../types/Ingredient";

import debounce from "lodash.debounce";
import db from "../../../axiosConfig/axiosInstance";

import IdleAvocado from "/idleAvocado.gif";
import TextArea from "antd/es/input/TextArea";

type SaveMealsModalProps = {
  open: boolean;
  handleClose: () => void;
};

function SaveMealsModal({ open, handleClose }: SaveMealsModalProps) {
  const onFinish: FormProps<Meal>["onFinish"] = (values) => {
    const mealWithIngredients = {
      ...values,
      ingredients: selectedIngredients,
    };
  };

  const onFinishFailed: FormProps<Meal>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchIngredients = async (value: string) => {
    if (value) {
      const response = await db.get<Ingredient[]>(
        `/ingredients/search-ingredients/${value}`
      );
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
    setSearchValue(value);
    debouncedFetch(value);
  };

  const handleSelect = (
    value: string,
    option: { value: string; label: string }
  ) => {
    const ingredient = {
      _id: value,
      ingredient_description: option.label,
      amount: 0,
      fdc_id: 0,
      nurtritionalValue: {},
    };
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchValue("");
  };

  const handleDeselect = (value: string) => {
    setSelectedIngredients(
      selectedIngredients.filter((ingredient) => ingredient._id !== value)
    );
  };

  return (
    <Modal
      className="Add-Meal-Modal"
      open={open}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={handleClose}
      footer={false}
    >
      <Flex className="User-Preferences-Component">
        <Form
          className="Create-Meal-Form"
          name="Meal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Flex className="Header">
            <Typography className="Header-Text">
              Add a meal to your personal menu
            </Typography>
            <img src={IdleAvocado} className="Header-Avocado" />
          </Flex>
          <Form.Item<Meal>
            label="Meal Name:"
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
          <Form.Item<Meal> label="Meal Description:" name="description">
            <TextArea placeholder="Please elaborate on this meal." />
          </Form.Item>
          <Form.Item<Meal> label="How to Prepare:" name="prep">
            <TextArea
              placeholder="Please explain how to prepare this meal."
              rows={6}
            />
          </Form.Item>
          <Form.Item<Meal>
            name="ingredients"
            label="Ingredients:"
            rules={[{ required: true, message: "Please choose ingredients!" }]}
          >
            <AutoComplete
              options={options}
              onSearch={handleSearch}
              onSelect={handleSelect}
              value={searchValue}
            >
              <Input.Search placeholder="Search Ingredients" />
            </AutoComplete>
            <Flex vertical>
              {selectedIngredients.map((ingredient) => (
                <Tag
                  className="Ingredient-Tag"
                  key={ingredient._id}
                  closable
                  onClose={() => handleDeselect(ingredient._id)}
                >
                  <Typography.Text className="Ingredient-Tag-Text" ellipsis>
                    {ingredient.ingredient_description}
                  </Typography.Text>
                </Tag>
              ))}
            </Flex>
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
