import "./UserPreferencesForm.css";

import { useContext } from "react";

import type { FormProps } from "antd";
import { Button, Checkbox, Flex, Form, Input, Select, Typography } from "antd";

import UserPreferencesContext from "../../../contexts/UserPreferencesContext";
import UserContext from "../../../contexts/UserContext";

import useGetPreferencesOptions from "../../../hooks/useGetPreferencesOptions";

import { UserPreferencesType } from "../../../types/UserPreferences";

import IdleAvocado from "/idleAvocado.gif";

type UserPreferencesFormProps = {
  isRows: boolean; // If this form is presented components like home it should be wider and shorter.
};

function UserPreferencesForm({ isRows }: UserPreferencesFormProps) {
  const { Option } = Select;
  const { userData } = useContext(UserContext);
  const { updateUserPreferences } = useContext(UserPreferencesContext);

  const options = useGetPreferencesOptions();

  const onFinish: FormProps<UserPreferencesType>["onFinish"] = (values) => {
    if (userData?._id) updateUserPreferences(userData._id, values);
  };

  const onFinishFailed: FormProps<UserPreferencesType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={
        isRows ? "User-Preferences-Form IsRows" : "User-Preferences-Form"
      }
      name="UserPreferences"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {isRows ? (
        <Typography.Title>
          Please fill out your user preferences
        </Typography.Title>
      ) : (
        <img src={IdleAvocado} className="Idle-Avocado" />
      )}

      <Flex vertical={!isRows} className={isRows ? "Field-Container-Row" : ""}>
        <Form.Item<UserPreferencesType>
          label="Weight:"
          name="weight"
          rules={[
            {
              required: true,
              message: "Everyone starts somewhere, no need to be shy!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserPreferencesType>
          label="Height:"
          name="height"
          rules={[
            { required: true, message: "Please enter your height in cm!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Flex>

      <Flex vertical={!isRows} className={isRows ? "Field-Container-Row" : ""}>
        <Form.Item<UserPreferencesType>
          label="Age:"
          name="age"
          rules={[{ required: true, message: "It is never too late!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserPreferencesType>
          name="goal"
          label="Goal:"
          valuePropName="goal"
          rules={[{ required: true, message: "Please enter your goals!" }]}
        >
          <Select placeholder="Please Select your current goal" allowClear>
            {options?.goals &&
              options.goals.map((goal) => (
                <Option value={goal._id} key={"goal - " + goal._id}>
                  {goal.goal}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Flex>

      <Flex vertical={!isRows} className={isRows ? "Field-Container-Row" : ""}>
        <Form.Item
          label="Meals:"
          name="amountOfMeals"
          rules={[
            { required: true, message: "Dont be shy, put some more!" },
            {
              validator: (_, value) => {
                if (!value || (value >= 1 && value <= 8)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Number must be between 1 and 8!")
                );
              },
            },
          ]}
          getValueFromEvent={(event) => Number(event.target.value)}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item<UserPreferencesType>
          label="Diet preference:"
          name="dietType"
        >
          <Select placeholder="Please Select your diet type" allowClear>
            {options?.dietTypes &&
              options.dietTypes.map((diet) => (
                <Option value={diet._id} key={"diet -" + diet._id}>
                  {diet.dietType}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Flex>

      <Flex
        vertical={!isRows}
        className={isRows ? "Field-Container-Center" : ""}
      >
        <Form.Item<UserPreferencesType>
          label="Sensitivities"
          name="sensitivities"
        >
          <Select placeholder="Please pick one if you are allergic" allowClear>
            {options?.sensitivities &&
              options.sensitivities.map((sensitivity) => (
                <Option
                  value={sensitivity._id}
                  key={"sensitivity - " + sensitivity._id}
                >
                  {sensitivity.sensitivity}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Flex>

      <Form.Item<UserPreferencesType>
        name="suggestFoods"
        valuePropName="checked"
        wrapperCol={{ offset: 10, span: 16 }}
      >
        <Checkbox className={isRows ? "Checkbox-Row" : ""}>
          Suggest pre-made meals
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button className="User-Preferences-Submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserPreferencesForm;
