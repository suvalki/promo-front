import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { api } from "@/shared/api/base";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";

const schema = z
  .object({
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string().min(6, "Минимум 6 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const useResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      api.auth.authControllerResetPassword({
        token,
        password: values.password,
      }),
    onSuccess: () => {
      notifications.show({
        title: "Успех",
        message: "Пароль успешно изменен",
        color: "green",
      });
      navigate("/login");
    },
    onError: (error: any) => {
      notifications.show({
        title: "Ошибка",
        message: error.response?.data?.message || "Не удалось изменить пароль",
        color: "red",
      });
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    if (!token) {
      notifications.show({
        title: "Ошибка",
        message: "Токен отсутствует или недействителен",
        color: "red",
      });
      return;
    }
    mutation.mutate(values);
  };

  return {
    form,
    loading: mutation.isPending,
    handleSubmit,
    hasToken: !!token,
  };
};
