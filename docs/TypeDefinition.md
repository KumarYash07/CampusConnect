User Interface
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "faculty" | "admin";
  registrationDate: Date;
}

Task Interface
interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  assignedUser?: string;
  createdDate: Date;
}