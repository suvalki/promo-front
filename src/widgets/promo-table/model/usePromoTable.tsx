import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { promoApi } from "@/entities/promo/api";
import { notifications } from "@mantine/notifications";
import { Badge, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import type { PaginatedPromoStatOutDto } from "@/shared/api/gen/api";
import dayjs from "dayjs";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useModals } from "@/app/hooks/useModals";

import { useDebouncedValue } from "@mantine/hooks";

type PromoItem = NonNullable<PaginatedPromoStatOutDto["data"]>[number];
const columnHelper = createColumnHelper<PromoItem>();

export const usePromoTable = () => {
  const queryClient = useQueryClient();
  const { openUpdatePromo, openDeactivatePromo } = useModals();
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
    queryKey: ["promos", page, pageSize, debouncedSearch, sorting, dateRange],
    queryFn: () =>
      promoApi.findOwn({
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
    mutationFn: (id: string) => promoApi.deactivate(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["promos"] });
      const previousData = queryClient.getQueriesData<PaginatedPromoStatOutDto>(
        {
          queryKey: ["promos"],
        },
      );
      queryClient.setQueriesData<PaginatedPromoStatOutDto>(
        { queryKey: ["promos"] },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((p) =>
              p.id === id ? { ...p, inactiveAt: new Date().toISOString() } : p,
            ),
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
        message: "Не удалось деактивировать промокод",
        color: "red",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      notifications.show({
        title: "Успех",
        message: "Промокод деактивирован",
        color: "green",
      });
    },
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: "Код",
        cell: (info) => <Text fw={700}>{info.getValue()}</Text>,
      }),
      columnHelper.accessor("discount", {
        header: "Скидка",
        cell: (info) => {
          const val = info.getValue() ?? 0;
          return val > 100 ? `${val.toLocaleString()} ₽` : `${val}%`;
        },
      }),
      columnHelper.accessor("usageCount", {
        header: "Использований",
        cell: (info) => {
          const limit = info.row.original.globalLimit;
          return limit === -1
            ? info.getValue()
            : `${info.getValue()} / ${limit}`;
        },
      }),
      columnHelper.accessor("activeFrom", {
        header: "Начало",
        cell: (info) =>
          info.getValue() ? dayjs(info.getValue()).format("DD.MM.YYYY") : "-",
      }),
      columnHelper.accessor("expiredAt", {
        header: "Истекает",
        cell: (info) =>
          info.getValue() ? dayjs(info.getValue()).format("DD.MM.YYYY") : "-",
      }),
      columnHelper.accessor("inactiveAt", {
        header: "Статус",
        cell: (info) =>
          info.getValue() ? (
            <Badge color="red">Неактивен</Badge>
          ) : (
            <Badge color="green">Активен</Badge>
          ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Действия",
        cell: (info) => (
          <Group gap="xs">
            <Tooltip label="Редактировать">
              <ActionIcon
                color="blue"
                variant="subtle"
                onClick={() => openUpdatePromo(info.row.original)}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            {!info.row.original.inactiveAt && (
              <Tooltip label="Деактивировать">
                <ActionIcon
                  color="red"
                  variant="subtle"
                  onClick={() =>
                    openDeactivatePromo(info.row.original, () =>
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
            )}
          </Group>
        ),
      }),
    ],
    [openUpdatePromo, openDeactivatePromo, deactivateMutation],
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
