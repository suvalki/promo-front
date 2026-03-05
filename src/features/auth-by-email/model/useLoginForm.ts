import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useUserStore } from "@/entities/user/model/store";
import { api } from "@/shared/api/base";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const useLoginForm = () => {
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      api.auth.authControllerLogin(values),
    onSuccess: (data) => {
      setUser(data);
      notifications.show({
        title: "Успех",
        message: "Вы успешно вошли в систему",
        color: "green",
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Не удалось войти",
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
