import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useUserStore } from "@/entities/user/model/store";
import { api } from "@/shared/api/base";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Некорректный email"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Некорректный формат телефона"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const useSignupForm = () => {
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      api.auth.authControllerSignup(values),
    onSuccess: (data) => {
      setUser(data);
      notifications.show({
        title: "Успех",
        message: "Аккаунт успешно создан",
        color: "green",
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message || "Не удалось зарегистрироваться",
        color: "red",
      });
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    mutation.mutate(values);
  };

  return {
    form,
    loading: mutation.isPending,
    handleSubmit,
  };
};
