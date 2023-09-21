import Modal from "antd/lib/modal";

export class AlertManager {
  static error(title: string, message: string, onOk?: () => void) {
    return Modal.error({ content: message, title, onOk });
  }

  static success(title: string, message: string, onOk?: () => void) {
    return Modal.success({ content: message, title, onOk });
  }
}
