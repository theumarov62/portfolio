import { api } from "@/api/axios";

type FormData = {
  email: string;
  password: string;
};

const LoginServices = {
  postLogin: (data: FormData) => {
    return api.post("/accounts/login/", data);
  },
};

export { LoginServices };
