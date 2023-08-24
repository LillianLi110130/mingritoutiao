import { user_status } from "./localUtils";

export default function authentication() {
  const token = user_status.getUser();
  if (!token) {
    return false;
  } else {
    return true;
  }
}
