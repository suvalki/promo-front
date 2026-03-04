import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@/app/providers/MantineProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { AppRouter } from "@/app/providers/RouterProvider";

export function App() {
  return (
    <QueryProvider>
      <MantineProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </MantineProvider>
    </QueryProvider>
  );
}
