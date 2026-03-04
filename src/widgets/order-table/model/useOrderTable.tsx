import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import { orderApi } from "@/entities/order/api";
import type { PaginatedOrderListOutDto } from "@/shared/api/gen/api";
import { Group, ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTag, IconTrash } from "@tabler/icons-react";

import { useModals } from "@/app/hooks/useModals";
import dayjs from "dayjs";

import { useDebouncedValue } from "@mantine/hooks";

type OrderItem = NonNullable<PaginatedOrderListOutDto["data"]>[number];
const columnHelper = createColumnHelper<OrderItem>();

export const useOrderTable = () => {
  const queryClient = useQueryClient();
  const { openUpdateOrder, openApplyPromo, openDeactivateOrder } = useModals();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", page, pageSize, debouncedSearch, sorting, dateRange],
    queryFn: () =>
      orderApi.findOwn({
        page,
        pageSize,
        search: debouncedSearch || null,
        sortBy: sorting[0]?.id,
        sortOrder: (sorting[0]?.desc ? "DESC" : "ASC") as "ASC" | "DESC",
        dateFrom: dateRange[0]
          ? dayjs(dateRange[0]).startOf("day").toISOString()
          : null,
        dateTo: dateRange[1]
          ? dayjs(dateRange[1]).endOf("day").toISOString()
          : null,
      }),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setDateRange(range);
    setPage(1);
  };

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => orderApi.deactivate(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previousData = queryClient.getQueriesData<PaginatedOrderListOutDto>(
        {
          queryKey: ["orders"],
        },
      );
      queryClient.setQueriesData<PaginatedOrderListOutDto>(
        { queryKey: ["orders"] },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((order) => order.id !== id),
          };
        },
      );
      return { previousData };
    },
    onError: (_error, _id, context) => {
      context?.previousData?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
      notifications.show({
        title: "Ошибка",
        message: "Не удалось удалить заказ",
        color: "red",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      notifications.show({
        title: "Успех",
        message: "Заказ успешно удален",
        color: "green",
      });
    },
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("createdAt", {
        header: "Дата",
        cell: (info) => dayjs(info.getValue()).format("DD.MM.YYYY HH:mm"),
      }),
      columnHelper.accessor("userName", {
        header: "Клиент",
      }),
      columnHelper.accessor("userPhone", {
        header: "Телефон",
      }),
      columnHelper.accessor("organicCost", {
        header: "Сумма",
        cell: (info) => `${(info.getValue() ?? 0).toLocaleString()} ₽`,
      }),
      columnHelper.accessor("totalCost", {
        header: "Итого",
        cell: (info) => `${(info.getValue() ?? 0).toLocaleString()} ₽`,
      }),
      columnHelper.accessor("promoCode", {
        header: "Промокод",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.display({
        id: "actions",
        header: "Действия",
        cell: (info) => (
          <Group gap="xs">
            <Tooltip
              label={
                info.row.original.promoId
                  ? "Нельзя редактировать заказ с примененным промокодом"
                  : "Редактировать"
              }
            >
              <ActionIcon
                variant="subtle"
                color="blue"
                onClick={() => openUpdateOrder(info.row.original)}
                disabled={!!info.row.original.promoId}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            {!info.row.original.promoId && (
              <Tooltip label="Применить промокод">
                <ActionIcon
                  variant="subtle"
                  color="violet"
                  onClick={() => openApplyPromo(info.row.original)}
                >
                  <IconTag size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label="Удалить">
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() =>
                  openDeactivateOrder(info.row.original, () =>
                    deactivateMutation.mutate(info.row.original.id),
                  )
                }
                loading={
                  deactivateMutation.isPending &&
                  deactivateMutation.variables === info.row.original.id
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ),
      }),
    ],
    [openUpdateOrder, openApplyPromo, openDeactivateOrder, deactivateMutation],
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: { sorting },
    onSortingChange: (updater) => {
      setSorting(updater);
      setPage(1);
    },
  });

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch: handleSearchChange,
    dateRange,
    setDateRange: handleDateRangeChange,
    data,
    isLoading,
    table,
    columns,
    deactivateMutation,
  };
};
