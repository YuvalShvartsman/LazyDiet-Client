import "./UserPreferencesModal.css";

import { Modal } from "antd";

import UserPreferences from "../userPreferences/UserPreferences";

type UserPreferencesModalType = {
  open: boolean;
  handleClose: () => void;
};

function UserPreferencesModal({ open, handleClose }: UserPreferencesModalType) {
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={handleClose}
      footer={false}
    >
      <UserPreferences handleClose={handleClose} />
    </Modal>
  );
}

export default UserPreferencesModal;
