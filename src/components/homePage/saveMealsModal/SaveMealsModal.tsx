import "./SaveMealsModal.css";
import { useCallback, useContext, useState } from "react";
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
import MealsContext from "../../../contexts/MealsContext";
import Swal from "sweetalert2";

type SaveMealsModalProps = {
  open: boolean;
  handleClose: () => void;
};

function SaveMealsModal({ open, handleClose }: SaveMealsModalProps) {
  const { saveMeals } = useContext(MealsContext);

  const onFinish: FormProps<Meal>["onFinish"] = (values) => {
    // also check if amounts are equal to zero.
    if (selectedIngredients.length >= 0) {
      const mealWithIngredients = {
        ...values,
        ingredients: selectedIngredients,
      };
      saveMeals([mealWithIngredients]);
      handleClose();
    } else {
      Swal.fire({
        title: "Error",
        text: "could not save a meal without ingredients",
        icon: "error",
      });
    }
  };

  const onFinishFailed: FormProps<Meal>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredient: Ingredient; amount: number }[]
  >([]);

  console.log("options are  - ", options);
  console.log("selectedIngredients are -", selectedIngredients);
  console.log("");

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
      ingredient: {
        _id: value,
        ingredient_description: option.label,
        fdc_id: 0,
        nurtrients: [],
      },
      amount: 0,
    };
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchValue("");
  };

  const handleDeselect = (value: string) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient.ingredient._id !== value
      )
    );
  };

  const handleAmountChange = (id: string, amount: number) => {
    console.log("🚀 ~ handleAmountChange ~ amount:", amount);
    console.log("🚀 ~ handleAmountChange ~ id:", id);
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.ingredient._id === id
          ? { ...ingredient, amount }
          : ingredient
      )
    );
  };

  return (
    <Modal
      className="Add-Meal-Modal"
      open={open}
      onCancel={handleClose}
      footer={null}
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
          <Form.Item
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
          <Form.Item label="Meal Description:" name="description">
            <TextArea placeholder="Please elaborate on this meal." />
          </Form.Item>
          <Form.Item label="How to Prepare:" name="prep">
            <TextArea
              placeholder="Please explain how to prepare this meal."
              rows={6}
            />
          </Form.Item>
          <Form.Item label="Ingredients:">
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
                <Flex key={ingredient.ingredient._id} align="center">
                  <Tag
                    className="Ingredient-Tag"
                    closable
                    onClose={() => handleDeselect(ingredient.ingredient._id)}
                  >
                    <Typography.Text className="Ingredient-Tag-Text" ellipsis>
                      {ingredient.ingredient.ingredient_description}
                    </Typography.Text>
                  </Tag>
                  <Input
                    placeholder="Amount (grams)"
                    value={ingredient.amount}
                    onChange={(e) =>
                      handleAmountChange(
                        ingredient.ingredient._id,
                        Number(e.target.value)
                      )
                    }
                    className="Ingredient-Amount"
                  />
                </Flex>
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
