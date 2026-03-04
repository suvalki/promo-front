import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { api } from "@/shared/api/base";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Некорректный email"),
});

export const useForgotPasswordForm = () => {
  const [isSent, setIsSent] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      api.auth.authControllerForgotPassword(values),
    onSuccess: () => {
      setIsSent(true);
      notifications.show({
        title: "Успех",
        message: "Инструкции по восстановлению пароля отправлены на почту",
        color: "green",
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Ошибка",
        message: error.response?.data?.message || "Не удалось отправить запрос",
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
    isSent,
  };
};
