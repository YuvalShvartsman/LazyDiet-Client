import "./SaveMealsModal.css";

import { Button, Flex, Form, FormProps, Input, Modal, Select } from "antd";

import IdleAvocado from "/idleAvocado.gif";
import { Meal } from "../../../types/Meal";
import { Header } from "antd/es/layout/layout";
import useGetIngredientsOptions from "../../../hooks/useGetIngredientsOptions";

type SaveMealsModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function SaveMealsModal({ isOpen, setIsOpen }: SaveMealsModalProps) {
  const { Option } = Select;
  const ingredientsOptions = useGetIngredientsOptions();
  console.log("🚀 ~ SaveMealsModal ~ ingredientsOptions:", ingredientsOptions);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onFinish: FormProps<Meal>["onFinish"] = (values) => {
    console.log(values);
  };

  const onFinishFailed: FormProps<Meal>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              {ingredients.map((ingredient) => (
                <Option value={ingredient} key={"ingredient - " + ingredient}>
                  {ingredient}
                </Option>
              ))}
            </Select>
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
