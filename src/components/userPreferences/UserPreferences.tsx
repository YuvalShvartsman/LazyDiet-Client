import { Flex } from "antd";
import "./UserPreferences.css";

import UserPreferencesForm from "./userPreferencesForm/UserPreferencesForm";

function UserPreferences() {
  return (
    <Flex className="User-Preferences-Component">
      <UserPreferencesForm />
    </Flex>
  );
}

export default UserPreferences;
