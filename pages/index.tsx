import type { NextPage } from "next";
import { UserForm } from "../components/user/forms";

const Home: NextPage = () => {
  return (
    <div className="container">
      <UserForm />
    </div>
  );
};

export default Home;
